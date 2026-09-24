#!/usr/bin/env node
/**
 * shopify-import.js — Bulk-import the 79 BESO products into Shopify via the
 * Admin GraphQL API.
 *
 * Reads src/data/products.json and creates/updates Shopify Products with
 * variants, prices, tags, and media (from products.image).
 *
 * Env (all required):
 *   SHOPIFY_SHOP    e.g. "beso-furniture-dev.myshopify.com"
 *   SHOPIFY_TOKEN   Admin API access token (Custom app)
 *
 * Usage:
 *   SHOPIFY_SHOP=... SHOPIFY_TOKEN=... node scripts/shopify-import.js [--only beso-crown-executive-chair] [--dry-run]
 *
 * Store-side prep: enable the Storefront + Admin APIs, then create a Custom
 * app and grant products/variants/media read+write scopes.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const products = JSON.parse(
  readFileSync(join(__dirname, '../src/data/products.json'), 'utf8'),
);

const SHOP = process.env.SHOPIFY_SHOP;
const TOKEN = process.env.SHOPIFY_TOKEN;
const only = process.argv.find((a) => a.startsWith('--only='))?.split('=')[1];
const dryRun = process.argv.includes('--dry-run');

if (!SHOP || !TOKEN) {
  console.error('Missing SHOPIFY_SHOP or SHOPIFY_TOKEN env vars.');
  process.exit(1);
}

const GRAPHQL = `https://${SHOP}/admin/api/2025-01/graphql.json`;
const MEDIA = `https://${SHOP}/admin/api/2025-01/products/{pid}/media.json`;

async function gql(query, variables = {}) {
  const res = await fetch(GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const body = await res.json();
  if (!res.ok || body.errors) {
    throw new Error(`GraphQL ${res.status}: ${JSON.stringify(body.errors ?? body)}`);
  }
  return body.data;
}

// productCreate mutation (v1 field shape used by most custom apps)
const CREATE = /* GraphQL */ `
  mutation productCreate($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
        handle
        title
        status
      }
      userErrors { field message }
    }
  }
`;

function toShopify(p, idx) {
  const tags = [p.category, p.subcategory, (p.badge ?? ''), p.inStock ? 'in-stock' : 'out-of-stock']
    .filter(Boolean)
    .map((t) => String(t).toLowerCase().replace(/[^a-z0-9-_ ]+/g, ' ').trim().replace(/\s+/g, '-'));
  const desc = p.tagline ? `${p.tagline}\n\n${p.specs ? JSON.stringify(p.specs) : ''}` : '';

  return {
    title: p.name,
    handle: p.slug,
    descriptionHtml: `<p>${desc.replace(/&/g, '&amp;').replace(/</g, '<').replace(/\n/g, '<br>')}</p>`,
    vendor: 'BESO',
    productType: p.category,
    tags,
    status: 'ACTIVE',
    // single default variant with price from the product record
    variants: [
      {
        sku: p.sku ?? `BESO-${String(p.id).padStart(4, '0')}`,
        price: String(p.price),
        compareAtPrice: p.originalPrice ? String(p.originalPrice) : null,
        inventoryPolicy: 'DENY',
        weight: 20,
        weightUnit: 'KILOGRAMS',
      },
    ],
    metafields: [
      {
        namespace: 'beso',
        key: 'rating',
        value: JSON.stringify({ rating: p.rating, reviews: p.reviews, subcategory: p.subcategory }),
        type: 'json',
      },
    ],
  };
}

async function attachImage(shopifyId, imagePath) {
  // imagePath is repo-relative, e.g. assets/images/products/x.jpg
  const res = await fetch(MEDIA.replace('{pid}', shopifyId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': TOKEN,
    },
    body: JSON.stringify({
      media: [
        {
          originalSource: `https://via.placeholder.com/1x1`, // placeholder; local files need upload
          media_type: 'IMAGE',
        },
      ],
    }),
  });
  // Media upload requires either a remote URL or staged uploads; local files
  // need the staged_upload endpoint first. For now we no-op and log.
  const body = await res.json().catch(() => ({}));
  console.log(`  [media] image ${imagePath} → please upload via admin (staged uploads not wired)`);
  return body;
}

async function main() {
  let done = 0;
  for (const [idx, p] of products.entries()) {
    if (only && p.slug !== only) continue;
    const input = toShopify(p, idx);
    console.log(`[${done + 1}/${products.length}] ${p.slug} — ${p.name}`);
    if (dryRun) {
      console.log('  [dry-run] would create:', JSON.stringify(input.title));
      continue;
    }
    try {
      const data = await gql(CREATE, { input });
      const errs = data.productCreate?.userErrors ?? [];
      if (errs.length) {
        console.log(`  ✗ errors: ${errs.map((e) => e.message).join('; ')}`);
        continue;
      }
      const pid = data.productCreate.product.id.split('/').pop();
      console.log(`  ✓ created id=${pid} handle=${data.productCreate.product.handle}`);
      // media is deferred; upload from public/assets on a later pass
      done++;
    } catch (e) {
      console.log(`  ✗ ${e.message}`);
    }
  }
  console.log(`\nDone. ${done} products created.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});