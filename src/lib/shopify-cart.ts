/**
 * Shopify Storefront cart/checkout client.
 *
 * Requires Shopify (paid plan or enabled checkout) + a Storefront API access
 * token:
 *   SHOPIFY_STOREFRONT_URL   e.g. https://beso-furniture-dev.myshopify.com/api/2025-01/graphql.json
 *   SHOPIFY_STOREFRONT_TOKEN  Storefront API access token
 *
 * If either env var is missing, `isCheckoutEnabled()` returns false and the UI
 * falls back to its legacy path (e.g. WhatsApp enquiry). This keeps the site
 * fully functional during dev and lights up real checkout the moment the
 * client's paid store + token are in place.
 */

const URL = process.env.SHOPIFY_STOREFRONT_URL || '';
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || '';

export function isCheckoutEnabled(): boolean {
  return Boolean(URL && TOKEN);
}

async function storefrontGql<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const body = await res.json();
  if (!res.ok || body.errors) {
    throw new Error(JSON.stringify(body.errors ?? body));
  }
  return body.data as T;
}

/** Create a Shopify cart for one product variant and hand back the checkout URL. */
export async function createCheckoutUrl(
  variantId: string,
  quantity = 1,
): Promise<string> {
  const data = await storefrontGql<{ cartCreate: { cart: { checkoutUrl: string } } }>(
    /* GraphQL */ `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            checkoutUrl
          }
        }
      }
    `,
    {
      input: {
        lines: [{ merchandiseId: variantId, quantity }],
      },
    },
  );
  return data.cartCreate.cart.checkoutUrl;
}

export { URL, TOKEN };