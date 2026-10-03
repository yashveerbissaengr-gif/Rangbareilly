import { Product, ProductVariant, ProductImage } from '@/types';
import { shopifyFetch } from './client';
import { getProductsQuery, getProductQuery } from './queries';

const defaultProps = {
  description: "Experience the perfect blend of elegance and style with this beautiful piece from our collection. Crafted with precision to complement your everyday look and special occasions.",
  material: "Premium Quality Alloy",
  care: "Keep away from moisture and perfumes. Store in a dry place.",
  shipping: "Ships in 2-3 business days.",
  returns: "7-day return policy available.",
  rating: 5,
  reviewCount: 42,
  tags: ["core"],
};

function mapShopifyProductToFrontend(shopifyProduct: any): Product {
  const images: ProductImage[] = shopifyProduct.images?.edges?.map((edge: any, index: number) => ({
    url: edge.node.url,
    alt: edge.node.altText || shopifyProduct.title,
    isPrimary: index === 0
  })) || [];

  if (shopifyProduct.featuredImage && images.length === 0) {
    images.push({
      url: shopifyProduct.featuredImage.url,
      alt: shopifyProduct.featuredImage.altText || shopifyProduct.title,
      isPrimary: true
    });
  }

  const variants: ProductVariant[] = shopifyProduct.variants?.edges?.map((edge: any) => ({
    id: edge.node.id,
    name: edge.node.title,
    sku: edge.node.sku || '',
    priceDelta: 0,
    price: parseFloat(edge.node.price?.amount || "0"),
    stock: edge.node.availableForSale ? 100 : 0
  })) || [];

  const basePrice = parseFloat(shopifyProduct.priceRange?.minVariantPrice?.amount || "0");
  const compareAtPrice = shopifyProduct.variants?.edges?.[0]?.node?.compareAtPrice ? parseFloat(shopifyProduct.variants.edges[0].node.compareAtPrice.amount) : undefined;

  variants.forEach(v => {
    v.priceDelta = (v as any).price - basePrice;
  });

  return {
    ...defaultProps,
    id: shopifyProduct.id,
    slug: shopifyProduct.handle,
    title: shopifyProduct.title,
    description: shopifyProduct.description || defaultProps.description,
    descriptionHtml: shopifyProduct.descriptionHtml,
    price: basePrice,
    compareAtPrice: compareAtPrice,
    collection: "All",
    productType: shopifyProduct.productType || "",
    images: images.length > 0 ? images : [{ url: "/dummy-products/ring-1.jpg", alt: "Placeholder", isPrimary: true }],
    variants: variants,
    tags: shopifyProduct.tags || [],
    isBestSeller: shopifyProduct.tags?.includes('best-seller') || false,
    isNewArrival: shopifyProduct.tags?.includes('new') || false,
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const { body } = await shopifyFetch<any>({
      query: getProductsQuery,
      variables: { first: 50 },
    });
    
    if (!body.data?.products?.edges) return [];
    
    return body.data.products.edges.map((edge: any) => mapShopifyProductToFrontend(edge.node));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  try {
    const { body } = await shopifyFetch<any>({
      query: getProductQuery,
      variables: { handle: slug },
    });
    
    if (!body.data?.product) return undefined;
    
    return mapShopifyProductToFrontend(body.data.product);
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return undefined;
  }
}

export async function getCollection(handle: string): Promise<Product[]> {
  const query = `
    query getCollectionProducts($handle: String!) {
      collection(handle: $handle) {
        products(first: 50) {
          edges {
            node {
              id
              handle
              availableForSale
              title
              description
              priceRange {
                maxVariantPrice { amount currencyCode }
                minVariantPrice { amount currencyCode }
              }
              variants(first: 250) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    price { amount currencyCode }
                    compareAtPrice { amount currencyCode }
                  }
                }
              }
              images(first: 20) {
                edges {
                  node { url altText }
                }
              }
              tags
            }
          }
        }
      }
    }
  `;
  
  try {
    const { body } = await shopifyFetch<any>({
      query,
      variables: { handle },
    });
    
    if (!body.data?.collection?.products?.edges) return [];
    
    return body.data.collection.products.edges.map((edge: any) => mapShopifyProductToFrontend(edge.node));
  } catch (error) {
    console.error("Error fetching collection:", error);
    return [];
  }
}
