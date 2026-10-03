import { getCollection, getProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/product/ProductCard";
import { Footer } from "@/components/layout/Footer";
import { filterByCategory, normalizeCategorySlug } from "@/lib/product-filters";

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  let products = slug === "all"
    ? await getProducts()
    : await getCollection(slug);
  
  if (slug === 'hot-selling') {
    const all = await getProducts();
    products = all.filter((p) => p.isBestSeller);
  } else if (slug === "new") {
    const all = await getProducts();
    products = all.slice(0, 10);
  }

  // Fallback: keyword match + all products so collection pages never look empty
  if (products.length === 0) {
    const canonical = normalizeCategorySlug(slug);
    const all = await getProducts();
    if (canonical) {
      const { filtered } = filterByCategory(all, canonical);
      products = filtered.length > 0 ? filtered : all;
    } else if (slug === "all") {
      products = all;
    } else if (products.length === 0) {
      // last resort: show everything rather than an empty page
      const allFallback = all.length > 0 ? all : await getProducts();
      if (allFallback.length > 0) products = allFallback;
    }
  }

  const title = slug === "all"
    ? "All Products"
    : slug.replace(/-/g, " ").toUpperCase();

  return (
    <>
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <h1 className="text-4xl font-accent text-center text-gray-800 mb-12">{title}</h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-xl">No products found in this collection.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
