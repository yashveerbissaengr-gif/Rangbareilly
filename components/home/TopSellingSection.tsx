import React from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { Product } from "@/types";

interface TopSellingSectionProps {
  products: Product[];
}

export const TopSellingSection = ({ products }: TopSellingSectionProps) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-tight mb-2 relative inline-block">
            TOP SELLING PRODUCTS
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-[#FF6B6C] rounded-full"></span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
