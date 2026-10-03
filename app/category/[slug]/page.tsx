import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollection, getProducts } from "@/lib/shopify";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Footer } from "@/components/layout/Footer";
import {
  CATEGORIES,
  filterByCategory,
  normalizeCategorySlug,
} from "@/lib/product-filters";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const canonical = normalizeCategorySlug(slug);
  const meta = canonical ? CATEGORIES[canonical] : null;
  const title = meta ? `${meta.title} | Rangbareilly` : "Shop | Rangbareilly";
  return {
    title,
    description: meta?.description ?? "Shop artificial jewellery online at Rangbareilly.",
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const canonical = normalizeCategorySlug(slug);

  if (!canonical || !CATEGORIES[canonical]) {
    return notFound();
  }

  const meta = CATEGORIES[canonical];

  // 1) Try real Shopify collection first (if merchant created one)
  let collectionProducts: Awaited<ReturnType<typeof getCollection>> = [];
  try {
    collectionProducts = await getCollection(canonical);
  } catch {
    collectionProducts = [];
  }

  // 2) Keyword match across all products (title / tags / productType) — same as homepage logic
  const allProducts = await getProducts();
  const { filtered } = filterByCategory(allProducts, canonical);

  const matched = collectionProducts.length > 0 ? collectionProducts : filtered;

  // 3) Fallback to all products so the page never looks broken/empty
  //    (same pattern homepage uses: `x.length > 0 ? x : allProducts.slice(0, 4)`)
  const products = matched.length > 0 ? matched : allProducts;

  return (
    <>
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <h1 className="text-4xl font-accent text-center text-gray-800 mb-3 capitalize">
          {meta.title}
        </h1>
        <p className="text-center text-gray-500 max-w-xl mx-auto mb-4">
          {meta.description}
        </p>
        <p className="text-center text-xs font-bold uppercase tracking-widest text-[#E63956] mb-10">
          {products.length} product{products.length === 1 ? "" : "s"}
        </p>
        <ProductGrid
          products={products}
          emptyMessage={`No products found in ${meta.title}.`}
        />
      </div>
      <Footer />
    </>
  );
}
