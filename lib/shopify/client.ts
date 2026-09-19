const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const publicToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_PUBLISHABLE_KEY;
const privateToken = process.env.SHOPIFY_PRIVATE_STOREFRONT_TOKEN;
const version = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2024-01';

type ShopifyFetchParams = {
  query: string;
  variables?: Record<string, any>;
  cache?: RequestCache;
  tags?: string[];
  isPrivate?: boolean;
};

export async function shopifyFetch<T>({
  query,
  variables,
  cache = 'force-cache',
  tags,
  isPrivate = false,
}: ShopifyFetchParams): Promise<{ status: number; body: T } | never> {
  const endpoint = `https://${domain}/api/${version}/graphql.json`;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (isPrivate) {
    if (!privateToken) {
      throw new Error('Private Storefront API token is missing');
    }
    headers['Shopify-Storefront-Private-Token'] = privateToken;
  } else {
    if (!publicToken) {
      throw new Error('Public Storefront API token is missing');
    }
    headers['X-Shopify-Storefront-Access-Token'] = publicToken;
  }

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      ...(tags && { next: { tags } }),
    });

    if (!result.ok) {
      throw new Error(`Shopify API error: ${result.status}`);
    }

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (error) {
    console.error('Error fetching Shopify API:', error);
    throw {
      error,
      query,
    };
  }
}
