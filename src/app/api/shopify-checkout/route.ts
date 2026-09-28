import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const SHOP = process.env.SHOPIFY_SHOP || 'beso-furniture-dev.myshopify.com';
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const STOREFRONT_URL = process.env.SHOPIFY_STOREFRONT_URL || '';
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || '';

/**
 * POST /api/shopify-checkout  { sku, quantity }
 * Resolves a product SKU to its Shopify variant ID and creates a Storefront
 * cart, returning { checkoutUrl, variantId }. Uses Storefront GraphQL when a
 * Storefront token is configured; otherwise resolves via Admin API and returns
 * the variant id (checkout falls back client-side until a Storefront token is
 * set on the paid store).
 */
export async function POST(req: NextRequest) {
  let body: any = {};
  try { body = await req.json(); } catch { /* ignore */ }
  const { sku, quantity = 1 } = body;
  if (!sku) return NextResponse.json({ error: 'sku required' }, { status: 400 });

  // 1) Resolve the variant id via Admin GraphQL (works with our token).
  let variantId: string | null = null;
  if (TOKEN) {
    const q = /* GraphQL */ `
      query {
        productVariants(first: 1, query: "sku:${String(sku).replace(/"/g, '')}") {
          nodes { id }
        }
      }
    `;
    try {
      const res = await fetch(`https://${SHOP}/admin/api/2025-01/graphql.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': TOKEN },
        body: JSON.stringify({ query: q }),
      });
      const d = await res.json();
      if (d.errors) console.error('[shopify-checkout] variant query errors:', JSON.stringify(d.errors));
      variantId = d?.data?.productVariants?.nodes?.[0]?.id ?? null;
    } catch (e) { console.error('[shopify-checkout] variant fallback:', (e as Error).message); variantId = null; }
  }

  // 2) If Storefront token ready, create the cart + checkout URL.
  if (STOREFRONT_URL && STOREFRONT_TOKEN && variantId) {
    const cartQ = /* GraphQL */ `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart { checkoutUrl }
        }
      }
    `;
    try {
      const res = await fetch(STOREFRONT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN },
        body: JSON.stringify({ query: cartQ, variables: { input: { lines: [{ merchandiseId: variantId, quantity }] } } }),
      });
      const d = await res.json();
      const checkoutUrl = d?.data?.cartCreate?.cart?.checkoutUrl;
      if (checkoutUrl) return NextResponse.json({ checkoutUrl, variantId });
    } catch { /* fall through */ }
  }

  return NextResponse.json({ checkoutUrl: null, variantId });
}