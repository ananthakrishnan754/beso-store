import { NextResponse } from 'next/server';
import products from '@/data/products.json';
import { NextRequest } from 'next/server';

const SHOP = process.env.SHOPIFY_SHOP || 'beso-furniture-dev.myshopify.com';
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

const QUERY = /* GraphQL */ `
  query($cursor: String) {
    products(first: 100, after: $cursor) {
      pageInfo { hasNextPage endCursor }
      edges {
        node {
          id
          handle
          title
          description
          status
          images(first: 1) { nodes { url altText } }
          variants(first: 1) { nodes { price compareAtPrice } }
          metafields(namespace: "beso", first: 5) { edges { node { key value } } }
        }
      }
    }
  }
`;

function toLocal(p: any) {
  const mf = ((p.metafields?.edges || []).reduce((a: Record<string, any>, e: any) => ((a[e.node.key] = JSON.parse(e.node.value || '{}')), a), {}));
  const v = p.variants?.nodes?.[0];
  return {
    id: 0,
    slug: p.handle,
    name: p.title,
    category: 'office',
    subcategory: mf.subcategory || 'office',
    price: Number(v?.price || 0),
    originalPrice: v?.compareAtPrice ? Number(v?.compareAtPrice) : undefined,
    badge: '',
    image: p.images?.nodes?.[0]?.url || '',
    tagline: p.description?.split('\n')[0] || '',
    rating: mf.rating || 4.5,
    reviews: mf.reviews || 0,
    inStock: p.status === 'ACTIVE',
  };
}

export async function GET(req: NextRequest) {
  // If no Admin token configured, fall back to bundled JSON (offline/dev).
  if (!TOKEN) {
    return NextResponse.json(products);
  }
  try {
    let all: any[] = [];
    let cursor: string | null = null;
    do {
      const resp = await fetch(`https://${SHOP}/admin/api/2025-01/graphql.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': TOKEN },
        body: JSON.stringify({ query: QUERY, variables: { cursor } }),
      });
      const body: any = await resp.json();
      const { products: data } = body.data || { products: {} };
      all = all.concat(data?.edges?.map((e: any) => toLocal(e.node)) || []);
      cursor = data?.pageInfo?.hasNextPage ? data.pageInfo.endCursor : null;
    } while (cursor);
    return NextResponse.json(all);
  } catch (e: any) {
    // Network/API failure → graceful fallback to bundled data.
    console.error('[shopify-products] fallback:', e.message);
    return NextResponse.json(products);
  }
}