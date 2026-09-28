#!/usr/bin/env node
/**
 * shopify-import.mjs — Bulk-import the BESO products into Shopify (Admin GraphQL).
 *
 * Two-step create: productCreate (no variants), then productVariantsBulkCreate,
 * then staged media upload from public/assets/images/products/*.
 *
 * Env (all required):
 *   SHOPIFY_SHOP    e.g. "beso-furniture-dev.myshopify.com"
 *   SHOPIFY_TOKEN   Admin API access token (from OAuth install)
 *
 * Usage:
 *   SHOPIFY_SHOP=... SHOPIFY_TOKEN=... node scripts/shopify-import.mjs [--only slug] [--dry-run]
 *   SHOPIFY_SHOP=... SHOPIFY_TOKEN=... node scripts/shopify-import.mjs --media   (attach images to existing)
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import products from '../src/data/products.json' with { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(__dirname, '../public');

const SHOP = process.env.SHOPIFY_SHOP;
const TOKEN = process.env.SHOPIFY_TOKEN;
const only = process.argv.find((a) => a.startsWith('--only='))?.split('=')[1];
const dryRun = process.argv.includes('--dry-run');
const justMedia = process.argv.includes('--media');

if (!SHOP || !TOKEN) {
  console.error('Missing SHOPIFY_SHOP or SHOPIFY_TOKEN env vars.');
  process.exit(1);
}

const GRAPHQL = `https://${SHOP}/admin/api/2025-01/graphql.json`;

async function gql(query, variables = {}) {
  const res = await fetch(GRAPHQL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': TOKEN },
    body: JSON.stringify({ query, variables }),
  });
  const body = await res.json();
  if (!res.ok || body.errors) {
    throw new Error(`GraphQL ${res.status}: ${JSON.stringify(body.errors ?? body)}`);
  }
  return body.data;
}

const CREATE = /* GraphQL */ `
  mutation productCreate($input: ProductInput!) {
    productCreate(input: $input) {
      product { id handle title status }
      userErrors { field message }
    }
  }
`;

const VARIANTS = /* GraphQL */ `
  mutation productVariantsBulkCreate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
    productVariantsBulkCreate(productId: $productId, variants: $variants) {
      productVariants { id sku price }
      userErrors { field message }
    }
  }
`;

const CREATE_TOKEN = /* GraphQL */ `
  mutation mediaCreateToken {
    mediaCreateToken { token }
  }
`;

const ASSIGN_MEDIA = /* GraphQL */ `
  mutation productSet($media: [CreateMediaInput!]!, $productId: ID!, $mediaOwnerId: ID) {
    productSet(media: $media, productId: $productId, mediaOwnerId: $mediaOwnerId) {
      product { id title }
      mediaUserErrors { field message }
    }
  }
`;

function toProduct(p) {
  const tags = [p.category, p.subcategory, p.badge ?? '', p.inStock ? 'in-stock' : 'out-of-stock']
    .filter(Boolean).map((t) => String(t).toLowerCase().replace(/[^a-z0-9-_ ]+/g, ' ').trim().replace(/\s+/g, '-'));
  const specs = p.specs ? Object.entries(p.specs).map(([k, v]) => `<li><b>${k}</b>: ${v}</li>`).join('') : '';
  const desc = p.tagline ? `<p>${p.tagline}</p>` : '';
  const html = `${desc}${specs ? `<ul>${specs}</ul>` : ''}`;
  return {
    title: p.name,
    handle: p.slug,
    descriptionHtml: html,
    vendor: 'BESO',
    productType: p.category,
    tags,
    status: 'DRAFT',
  };
}

function toVariant(p) {
  return [{
    price: String(p.price),
    compareAtPrice: p.originalPrice ? String(p.originalPrice) : null,
    inventoryPolicy: 'DENY',
    taxable: true,
  }];
}

async function attachImageREST(productId, p) {
  const local = join(ASSETS, p.image);
  if (!existsSync(local)) return null;
  const pid = String(productId).includes('gid://') ? String(productId).split('/').pop() : String(productId);
  const src = `https://beso-store-v2.vercel.app/${p.image}`;
  const res = await fetch(`https://${SHOP}/admin/api/2025-01/products/${pid}/images.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': TOKEN },
    body: JSON.stringify({ image: { src } }),
  });
  if (!res.ok) { const b = await res.json().catch(() => ({})); console.log('   [media]', JSON.stringify(b.errors || b).slice(0, 120)); return null; }
  const b = await res.json();
  return b?.image?.src ?? null;
}

async function stagedUpload(product, p) {
  return attachImageREST(product.id, p);
}

async function main() {
  let done = 0;
  for (const p of products) {
    if (only && p.slug !== only) continue;
    const product = toProduct(p);
    if (process.argv.includes('--variants')) {
      // Existing product: find by handle, update first variant price, publish
      const q = await gql(`query($h:String!){ productByHandle(handle:$h){ id status variants(first:1){ nodes{ id price } } } }`, { h: p.slug });
      const prod = q.productByHandle;
      if (!prod) { console.warn(`   ! not found: ${p.slug}`); continue; }
      const vid = prod.variants?.nodes?.[0]?.id;
      if (vid) {
        const upd = await gql(`mutation productVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) { productVariantsBulkUpdate(productId: $productId, variants: $variants) { productVariants { id price } userErrors { field message } } }`, { productId: prod.id, variants: [{ id: vid, price: String(p.price), compareAtPrice: p.originalPrice ? String(p.originalPrice) : null, inventoryPolicy: 'DENY' }] });
        const uerrs = upd.productVariantsBulkUpdate?.userErrors ?? [];
        if (uerrs.length) console.log(`   ! ${p.slug} variant: ${uerrs.map((e) => e.message).join('; ')}`);
      } else {
        try { await gql(VARIANTS, { productId: prod.id, variants: [{ price: String(p.price), compareAtPrice: p.originalPrice ? String(p.originalPrice) : null, inventoryPolicy: 'DENY', taxable: true }] }); } catch (e) { console.log(`   ! ${p.slug} variant-create: ${e.message.slice(0, 50)}`); }
      }
      await gql(`mutation($id:ID!){ productUpdate(input:{ id: $id, status: ACTIVE }){ product{ id status } userErrors{ field message } } }`, { id: prod.id });
      console.log(`   ✓ ${p.slug} variant+active`);
      done++;
      continue;
    }
    if (!justMedia) {
      console.log(`[${done + 1}/${products.length}] ${p.slug} — ${p.name}`);
      if (dryRun) { console.log('   [dry-run]', product.title); done++; continue; }
      try {
        const data = await gql(CREATE, { input: product });
        const errs = data.productCreate?.userErrors ?? [];
        if (errs.length) { console.log(`   ✗ ${errs.map((e) => e.message).join('; ')}`); continue; }
        const prod = data.productCreate.product;
        const pid = prod.id.split('/').pop();
        // variants
        const v = await gql(VARIANTS, { productId: prod.id, variants: toVariant(p) });
        const verrs = v.productVariantsBulkCreate?.userErrors ?? [];
        if (verrs.length) console.log(`   ! variant: ${verrs.map((e) => e.message).join('; ')}`);
        // media (only when --media flag set)
        if (justMedia) {
          try { const img = await stagedUpload(prod, p); if (img) console.log('   ✓ image'); }
          catch (e) { console.log('   [media]', e.message.slice(0, 60)); }
        }
        console.log(`   ✓ id=${pid} handle=${prod.handle}`);
        done++;
      } catch (e) { console.log(`   ✗ ${e.message.slice(0,120)}`); }
    } else {
      // existing product — find by handle then attach media
      const q = await gql(`query($h: String!){ productByHandle(handle: $h){ id } }`, { h: p.slug });
      const prod = q.productByHandle;
      if (prod) { try { const img = await attachImageREST(prod.id, p); console.log(`${p.slug} ${img ? '✓ image' : '·media'}`); } catch (e) { console.log(`${p.slug} ✗ ${e.message.slice(0, 60)}`); } }
      await new Promise((r) => setTimeout(r, 900)); // calm rate-limit bursts
    }
  }
  console.log(`\nDone. ${done} products created.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
