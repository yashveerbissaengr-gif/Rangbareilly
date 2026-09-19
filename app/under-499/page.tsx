import { getProducts } from "@/lib/shopify/index";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Under 499 | Rangbareilly",
  description: "Shop beautiful artificial jewelry under ₹499.",
};

export default async function Under499Page() {
  const allProducts = await getProducts();
  const products = allProducts.filter(p => p.price > 399 && p.price <= 499);

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <h1 className="text-4xl font-accent text-center text-gray-800 mb-12">Under 499</h1>
      <ProductGrid 
        products={products} 
        emptyMessage="No products found between ₹399 and ₹499." 
      />
    </div>
  );
}
