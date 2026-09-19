import { getProducts } from "@/lib/shopify/index";
import { GenZPromoBanner } from "@/components/ui/GenZPromoBanner";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Under 299 | Rangbareilly",
  description: "Shop beautiful artificial jewelry under ₹299.",
};

export default async function Under299Page() {
  const allProducts = await getProducts();
  const products = allProducts.filter(p => p.price <= 299);

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <h1 className="text-4xl font-accent text-center text-gray-800 mb-12">Under 299</h1>
      <GenZPromoBanner />
      <ProductGrid 
        products={products} 
        emptyMessage="No products found under ₹299." 
      />
    </div>
  );
}
