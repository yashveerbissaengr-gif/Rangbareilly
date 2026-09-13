import { getProducts } from "@/lib/shopify/index";
import { ProductCard } from "@/components/product/ProductCard";
import { GenZPromoBanner } from "@/components/ui/GenZPromoBanner";
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
      
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-xl">No products found under ₹299.</p>
        </div>
      )}
    </div>
  );
}
