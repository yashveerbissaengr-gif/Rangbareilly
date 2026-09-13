import { getProducts } from "@/lib/shopify/index";
import { ProductCard } from "@/components/product/ProductCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Under 399 | Rangbareilly",
  description: "Shop beautiful artificial jewelry under ₹399.",
};

export default async function Under399Page() {
  const allProducts = await getProducts();
  const products = allProducts.filter(p => p.price > 299 && p.price <= 399);

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <h1 className="text-4xl font-accent text-center text-gray-800 mb-12">Under 399</h1>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-xl">No products found between ₹299 and ₹399.</p>
        </div>
      )}
    </div>
  );
}
