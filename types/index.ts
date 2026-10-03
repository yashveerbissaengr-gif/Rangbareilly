export interface ProductVariant {
  id: string;
  name: string; // e.g., "18k Yellow Gold", "Silver"
  sku: string;
  priceDelta: number;
  stock: number;
}

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  material: string;
  care: string;
  shipping: string;
  returns: string;
  price: number;
  compareAtPrice?: number;
  collection: string;
  images: ProductImage[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  tags: string[];
  productType?: string;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  lineId?: string;
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
}
