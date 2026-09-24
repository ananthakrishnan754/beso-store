/**
 * Shopify Storefront API client for the BESO Next.js storefront.
 *
 * Env:
 *   SHOPIFY_STOREFRONT_URL    e.g. https://beso-furniture-dev.myshopify.com/api/2025-01/graphql.json
 *   SHOPIFY_STOREFRONT_TOKEN   Storefront access token
 */
export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: string;
  compareAtPrice?: string;
  featuredImage?: { url: string; altText?: string };
  images: { url: string; altText?: string }[];
  tags: string[];
  availableForSale: boolean;
  metafields: { key: string; value: string; type: string }[];
};

const URL = process.env.SHOPIFY_STOREFRONT_URL!;
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN!;
const ENABLED = Boolean(URL && TOKEN);

export function shopifyEnabled(): boolean {
  return ENABLED;
}

async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!ENABLED) throw new Error('Shopify Storefront env not configured');
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
    throw new Error(`Storefront ${res.status}: ${JSON.stringify(body.errors ?? body)}`);
  }
  return body.data as T;
}

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductParts on Product {
    id
    handle
    title
    description
    availableForSale
    tags
    priceRange { minVariantPrice { amount currencyCode } compareAtPrice { amount } }
    featuredImage { url altText }
    images(first: 8) { nodes { url altText } }
    metafields(namespace: "beso", first: 10) { key value type }
  }
`;

export async function getProducts(first = 100): Promise<ShopifyProduct[]> {
  const data = await gql<{ products: { nodes: unknown[] } }>(
    `${PRODUCT_FRAGMENT}
     query ($first: Int!) { products(first: $first) { nodes { ...ProductParts } } }`,
    { first },
  );
  return (data.products?.nodes ?? []).map(normalize);
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await gql<{ productByHandle: unknown }>(
    `${PRODUCT_FRAGMENT}
     query ($handle: String!) { productByHandle(handle: $handle) { ...ProductParts } }`,
    { handle },
  );
  return data.productByHandle ? normalize(data.productByHandle) : null;
}

function normalize(raw: any): ShopifyProduct {
  const price = raw.priceRange?.minVariantPrice?.amount;
  const compare = raw.priceRange?.compareAtPrice?.amount;
  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description ?? '',
    price,
    compareAtPrice: compare,
    featuredImage: raw.featuredImage,
    images: raw.images?.nodes ?? [],
    tags: raw.tags ?? [],
    availableForSale: raw.availableForSale ?? true,
    metafields: raw.metafields?.nodes ?? [],
  };
}