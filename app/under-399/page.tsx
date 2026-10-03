import { getProducts } from "@/lib/shopify/index";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Footer } from "@/components/layout/Footer";
import { filterByPrice } from "@/lib/product-filters";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Under 399 | Rangbareilly",
  description: "Shop beautiful artificial jewelry under ₹399.",
};

export default async function Under399Page() {
  const allProducts = await getProducts();
  const matched = filterByPrice(allProducts, 399);
  const products = matched.length > 0 ? matched : allProducts.slice(0, 8);

  return (
    <>
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <h1 className="text-4xl font-accent text-center text-gray-800 mb-3">Under 399</h1>
        <p className="text-center text-xs font-bold uppercase tracking-widest text-[#E63956] mb-10">
          {products.length} product{products.length === 1 ? "" : "s"}
        </p>
        <ProductGrid 
          products={products} 
          emptyMessage="No products found under ₹399." 
        />
      </div>
      <Footer />
    </>
  );
}
