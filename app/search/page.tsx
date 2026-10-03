import type { Metadata } from "next";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SearchForm } from "@/components/search/SearchForm";
import { getProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Search Products | Rangbareilly",
  description: "Search the Rangbareilly jewelry collection.",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string | string[] }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = (Array.isArray(params.q) ? params.q[0] : params.q)?.trim() ?? "";
  const products = query ? await getProducts(query) : [];

  return (
    <section className="min-h-screen bg-[#FAF9F6] px-4 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-[#1F1215] md:text-4xl">
          Search
        </h1>

        <SearchForm initialQuery={query} />

        {query ? (
          <>
            <p className="mb-6 text-sm text-[#7D6B6E]">
              {products.length} {products.length === 1 ? "result" : "results"} for “{query}”
            </p>
            <ProductGrid
              products={products}
              emptyMessage={`No products found for “${query}”. Try another search.`}
            />
          </>
        ) : (
          <p className="text-center text-[#7D6B6E]">Enter a product name or keyword to search.</p>
        )}
      </div>
    </section>
  );
}