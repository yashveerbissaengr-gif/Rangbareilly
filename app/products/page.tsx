import React from "react";
import { getProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/product/ProductCard";

export const metadata = {
  title: "All Products - Rangbareilly",
  description: "Browse all our beautiful jewelry pieces, necklace, earrings, rings, and more.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-outfit font-bold text-gray-900 mb-4">
            All Products
          </h1>
          <p className="text-gray-600 font-inter text-lg">
            Discover our complete collection of everyday elegance.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
