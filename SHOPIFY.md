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
## ✅ LIVE STATUS (2026-09) — store online, catalog imported on OUR account

Store: **beso-furniture-dev.myshopify.com** (plan: Basic App Development / free dev)
App: **BESO Catalog Sync** (Dev Dashboard id 428438257665, Client ID `f50129b58ac29ab8fa75607e670cbd60`)
Auth: OAuth installed — Admin API token in `.env.local` (`SHOPIFY_ADMIN_TOKEN`, `shpat_...`).

**Imported:** all 79 products (+ variants priced, ACTIVE). **Images:** all 79 attached (via REST
`/products/{id}/images.json` from `https://beso-store-v2.vercel.app/assets/...`).
Verified via Admin GraphQL (products=79, with-image=79).

### MIGRATION to the client's account (when they hand over Shopify credentials)
1. Client creates/logs into their Shopify store; add us as collaborator (Staff), or
   transfer ownership (Settings → Users → Transfer ownership) after handover.
2. Recreate the app or authorize our app on their store → new `SHOPIFY_ADMIN_TOKEN`.
3. Re-run the import against their store with the new token:
   ```
   SHOPIFY_SHOP=<client-shop>.myshopify.com SHOPIFY_TOKEN=<new-token> node scripts/shopify-import.mjs
   SHOPIFY_SHOP=<client-shop> SHOPIFY_TOKEN=<new-token> node scripts/shopify-import.mjs --media
   ```
4. Swap `.env.local` values; redeploy. Product data lives in Shopify (source of truth);
   `src/data/products.json` is the offline SSG fallback and matches the import.

### API surface
- `GET /api/shopify-products` → returns product list from Shopify Admin GraphQL,
  falling back to `products.json` when no token / network error.

## ✅ GO-LIVE CHECKLIST (paid merchant plan — unlocks checkout/payments)

The current store is on free **Basic App Development** — it can hold the catalog but
**cannot process checkouts/payments** (`/cart` and `/checkout` are behind a password
wall and payment/fulfillment APIs need merchant approval). When the client provides
their live paid Shopify store, complete these in order:

### 1. Make the store shoppable
- Upgrade to a paid plan (Basic ₹2,899/mo or higher) OR use the client's store.
- Remove the password wall: Settings → Store details → Online store → **Remove password**.

### 2. Payments — Razorpay
- Shopify App Store → **Razorpay** app → install → connect Razorpay merchant account.
- Settings → Payments → set **Razorpay** as the primary payment provider
  (activate card/UPI/netbanking). Shopify Payments works too if preferred.

### 3. Storefront API token (headless checkout from this Next.js site)
Dev Dashboard or Store admin → enable **Storefront API** → create a **Storefront access
token** with read of product listings + cart/checkout write. Then set in `.env.local`:
```
SHOPIFY_STOREFRONT_URL=https://<shop>.myshopify.com/api/2025-01/graphql.json
SHOPIFY_STOREFRONT_TOKEN=<token>
```
Once set, `GET /api/shopify-checkout { sku, quantity }` returns a real
`checkoutUrl` and the **Order Now** button routes through Shopify checkout
(Razorpay at the till) instead of the WhatsApp fallback.

### 4. Zoho (CRM + ERP / invoicing + inventory)
- **Zoho CRM** (leads/opportunities from `Explore`/WhatsApp enquires): map the
  Shopify webhook `customers/create` + `orders/create` → Zoho CRM.
- **Zoho Inventory / Books**: install the **Zoho Inventory–Shopify** connector
  (app in both stores) → sync SKUs/stock between Shopify and Zoho Inventory;
  Zoho Books for GST invoices on order webhook.

### 5. Order tracking (inside Shopify + customer comms)
- Shopify **native**: Orders → details per order → **Mark as fulfilled** → add
  tracking number + carrier → Shopify emails/countdown to the customer
  (Settings → Notifications → order status events).
- **Athena/Shiprocket** "Shopify tracking integration": ships + tracking from
  India carriers, pushes tracking to Shopify so customers see it on the order page.
- Set default carrier + packing slips in Settings → Shipping & delivery.

### 6. Re-derive tokens + re-run import on the client store
```
SHOPIFY_SHOP=<client-shop>.myshopify.com SHOPIFY_TOKEN=<new-admin-token> node scripts/shopify-import.mjs
SHOPIFY_SHOP=... SHOPIFY_TOKEN=... node scripts/shopify-import.mjs --media --skus
```
Swap `.env.local`, redeploy to Vercel. Products/orders then all run from Shopify.

### Buttons (current state)
- **Order Now** → `POST /api/shopify-checkout` → Shopify checkout URL (live on paid
  store); WhatsApp fallback while dev store is password-walled. ✅ wired
- Enquire/Ask a question → WhatsApp (correct — those are enquiries, not orders).
- Add to Compare / See it in Your Room / Explore / Reviews → in-app, working.
