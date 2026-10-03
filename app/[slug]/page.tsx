import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCollection, getProducts, getProduct } from "@/lib/shopify";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Footer } from "@/components/layout/Footer";
import {
  CATEGORIES,
  filterByCategory,
  filterByPrice,
  normalizeCategorySlug,
  normalizePriceSlug,
} from "@/lib/product-filters";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = normalizeCategorySlug(slug);
  if (category && CATEGORIES[category]) {
    return {
      title: `${CATEGORIES[category].title} | Rangbareilly`,
      description: CATEGORIES[category].description,
    };
  }
  const price = normalizePriceSlug(slug);
  if (price !== null) {
    return {
      title: `Under ${price} | Rangbareilly`,
      description: `Shop beautiful artificial jewelry under ₹${price}.`,
    };
  }
  if (slug.toLowerCase() === "all" || slug.toLowerCase() === "all-products" || slug.toLowerCase() === "shop") {
    return {
      title: "All Products | Rangbareilly",
      description: "Browse all our beautiful jewelry pieces.",
    };
  }
  const product = await getProduct(slug);
  if (product) {
    return {
      title: `${product.title} | Rangbareilly`,
      description: `Shop ${product.title} at Rangbareilly.`,
    };
  }
  return { title: `${slug.replace(/-/g, " ")} | Rangbareilly` };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  /* ---- Category aliases: /rings /earrings /bracelets /necklace /bagcharms /stainlessstell /armcuffs ... ---- */
  const category = normalizeCategorySlug(slug);
  if (category && CATEGORIES[category]) {
    const meta = CATEGORIES[category];

    let collectionProducts: Awaited<ReturnType<typeof getCollection>> = [];
    try {
      collectionProducts = await getCollection(category);
    } catch {
      collectionProducts = [];
    }

    const allProducts = await getProducts();
    const { filtered } = filterByCategory(allProducts, category);
    const matched = collectionProducts.length > 0 ? collectionProducts : filtered;
    const products = matched.length > 0 ? matched : allProducts;

    return (
      <>
        <div className="container mx-auto px-4 py-16 min-h-screen">
          <h1 className="text-4xl font-accent text-center text-gray-800 mb-3 capitalize">
            {meta.title}
          </h1>
          <p className="text-center text-gray-500 max-w-xl mx-auto mb-4">{meta.description}</p>
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#E63956] mb-10">
            {products.length} product{products.length === 1 ? "" : "s"}
          </p>
          <ProductGrid products={products} emptyMessage={`No products found in ${meta.title}.`} />
        </div>
        <Footer />
      </>
    );
  }

  /* ---- Price aliases: /under199 /under299 /under399 /under499 (no dash) ---- */
  const price = normalizePriceSlug(slug);
  if (price !== null) {
    const allProducts = await getProducts();
    const matched = filterByPrice(allProducts, price);
    const products = matched.length > 0 ? matched : allProducts.slice(0, 8);

    return (
      <>
        <div className="container mx-auto px-4 py-16 min-h-screen">
          <h1 className="text-4xl font-accent text-center text-gray-800 mb-3">
            Under {price}
          </h1>
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#E63956] mb-10">
            {products.length} product{products.length === 1 ? "" : "s"}
          </p>
          <ProductGrid products={products} emptyMessage={`No products found under ₹${price}.`} />
        </div>
        <Footer />
      </>
    );
  }

  /* ---- /all ---- */
  if (slug.toLowerCase() === "all" || slug.toLowerCase() === "all-products" || slug.toLowerCase() === "shop") {
    const products = await getProducts();
    return (
      <>
        <div className="container mx-auto px-4 py-16 min-h-screen">
          <h1 className="text-4xl font-accent text-center text-gray-800 mb-3">All Products</h1>
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#E63956] mb-10">
            {products.length} product{products.length === 1 ? "" : "s"}
          </p>
          <ProductGrid products={products} emptyMessage="No products found." />
        </div>
        <Footer />
      </>
    );
  }

  /* ---- Product handle fallback: redirect to /products/${slug} ---- */
  const product = await getProduct(slug);
  if (product) {
    redirect(`/products/${slug}`);
  }
  const allProducts = await getProducts();
  const matchedProduct = allProducts.find(
    (p) =>
      p.slug === slug ||
      p.slug.toLowerCase() === slug.toLowerCase() ||
      p.id === slug
  );
  if (matchedProduct) {
    redirect(`/products/${matchedProduct.slug}`);
  }

  /* ---- Unknown slug: keep old placeholder ---- */
  return (
    <div className="container mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl font-accent text-[#FF6B6C] capitalize mb-6">
        {slug.replace(/-/g, " ")}
      </h1>
      <p className="text-gray-600 max-w-lg mb-8">
        This page is a placeholder for the static frontend. In a full production application, this would contain the necessary content or forms.
      </p>
      <Link href="/" className="bg-[#8B263E] text-white px-8 py-3 rounded-full font-bold uppercase tracking-wide hover:bg-opacity-90 transition-colors">
        Return Home
      </Link>
    </div>
  );
}
