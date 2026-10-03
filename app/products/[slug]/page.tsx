import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, getProducts } from "@/lib/shopify";
import { getProductPalmonasSettings } from "@/lib/product-palmonas";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductBuyBox } from "@/components/product/ProductBuyBox";
import { ProductReviewsSection } from "@/components/product/ProductReviewsSection";
import { ProductSection } from "@/components/home/ProductSection";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  let product = await getProduct(resolvedParams.slug);

  if (!product) {
    const all = await getProducts();
    product = all.find(
      (p) =>
        p.slug === resolvedParams.slug ||
        p.slug.toLowerCase() === resolvedParams.slug.toLowerCase()
    );
  }

  if (!product) {
    return { title: "Product Not Found | Rangbareilly" };
  }

  return {
    title: `${product.title} - Anti-Tarnish Jewellery | Rangbareilly`,
    description: `Shop ${product.title} at Rangbareilly. Premium anti-tarnish, skin-safe handcrafted jewellery with free shipping & COD pan-India.`,
    openGraph: {
      title: `${product.title} | Rangbareilly`,
      description: `Buy ${product.title} online. Anti-tarnish, hypoallergenic finish with 10-day exchange.`,
      images: product.images[0]?.url ? [{ url: product.images[0].url }] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  let product = await getProduct(slug);

  if (!product) {
    const all = await getProducts();
    product = all.find(
      (p) =>
        p.slug === slug ||
        p.slug.toLowerCase() === slug.toLowerCase() ||
        p.id === slug
    );
  }

  if (!product) {
    return notFound();
  }

  // Generate specialized settings tailored to this specific product type
  const settings = getProductPalmonasSettings(product);

  // Fetch related products
  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product!.id)
    .slice(0, 4);

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="border-b border-gray-100 bg-[#FCFBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <ol className="flex items-center gap-1.5 text-xs text-gray-500 overflow-x-auto whitespace-nowrap">
            <li>
              <Link href="/" className="hover:text-gray-900 transition-colors">
                Home
              </Link>
            </li>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <li>
              <Link href="/products" className="hover:text-gray-900 transition-colors">
                All Products
              </Link>
            </li>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <li>
              <span className="text-gray-600 font-medium">
                {settings.categoryLabel}
              </span>
            </li>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <li aria-current="page">
              <span className="text-gray-900 font-bold truncate max-w-[200px] sm:max-w-xs block">
                {product.title}
              </span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Product Section: Palmonas 2-Column Split */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-grow w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Image Gallery (5 cols on large screens) */}
          <div className="lg:col-span-6 w-full">
            <ProductGallery
              images={product.images}
              title={product.title}
              badgeLabel={
                settings.discountPercent > 0
                  ? `Flat ₹${product.price.toLocaleString()}`
                  : "Bestseller"
              }
            />
          </div>

          {/* Right Column: Buy Box, Urgency, Deals, Accordions, Trust (6 cols) */}
          <div className="lg:col-span-6 w-full">
            <ProductBuyBox product={product} settings={settings} />
          </div>
        </div>

        {/* Customer Reviews Section */}
        <ProductReviewsSection
          productTitle={product.title}
          rating={settings.rating}
          reviewCount={settings.reviewCount}
        />

        {/* You May Also Like Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-100">
            <ProductSection
              title="You May Also Like"
              products={relatedProducts}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
