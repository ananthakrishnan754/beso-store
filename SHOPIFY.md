# Shopify Integration — BESO Store

Status: **account authenticated** (krishnananantha754@gmail.com, own account for
client transfer later). Store creation pending passkey enrollment (one manual
click in the browser) — then API credentials unlock everything below.

## Accounts / ownership
- Shopify account: `krishnananantha754@gmail.com` (made for this project; will
  be transferred to the client after build).
- Dev store name candidates: `beso-furniture-dev`, `beso-store-v2-dev`.

## The 3 credentials needed (created after the store exists)
1. **Admin API** — for `scripts/shopify-import.mjs` (bulk product import).
   Create → Settings → Apps and sales channels → Develop apps → Install app →
   Admin API access token. Scopes: `read_products write_products
   read_product_images write_product_images read_inventory write_inventory`.
2. **Storefront API** — for the Next.js frontend (catalog fetch, cart, checkout).
   Storefront access token (public; added to `.env.local`).
3. **Razorpay/Shopify Payments** — checkout; needs client bank details (deferred).

## Import script (ready)
```bash
cd /home/ananthakrishnan/oc/beso-store
SHOPIFY_SHOP=...    # e.g. beso-furniture-dev.myshopify.com
SHOPIFY_TOKEN=...   # Admin API access token
node scripts/shopify-import.mjs                 # all 79 products
node scripts/shopify-import.mjs --dry-run       # preview only
node scripts/shopify-import.mjs --only beso-crown-executive-chair
```

Maps `src/data/products.json` → Shopify products/variants/tags/metafields.
Media upload uses staged uploads (wired in a later pass; local files in
`public/assets/images/products/*`).

## Next.js → Storefront wiring (after store exists)
- Add `SHOPIFY_STOREFRONT_URL` + `SHOPIFY_STOREFRONT_TOKEN` to `.env.local`.
- Swap `src/data/products.json` usages for Storefront API calls in the API
  layer (`src/lib/shopify.ts`) — keep JSON as the offline/SSG fallback.
- Cart/checkout: use `cartCreate`/`cartLinesAdd` mutations and redirect to
  Shopify checkout.

## Architecture reference
Authoritative plan: `tech-stack-flow.html` (Shopify = source of truth; Next.js
API routes = middleware → Zoho Books + Shiprocket).