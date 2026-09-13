import { HeroBanner } from "@/components/home/HeroBanner";
import { GenZPromoBanner } from "@/components/ui/GenZPromoBanner";
import { ProductSection } from "@/components/home/ProductSection";
import { PromoBanner } from "@/components/home/PromoBanner";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { Footer } from "@/components/layout/Footer";
import { getProducts, getCollection } from "@/lib/shopify";

export default async function Home() {
  const allProducts = await getProducts();
  
  const under299 = allProducts.filter(p => p.price <= 299).slice(0, 4);
  const under399 = allProducts.filter(p => p.price > 299 && p.price <= 399).slice(0, 4);
  const under499 = allProducts.filter(p => p.price > 399 && p.price <= 499).slice(0, 4);

  return (
    <>
      <HeroBanner />
      <GenZPromoBanner />
      
      {/* UNDER 299 */}
      <ProductSection 
        title="UNDER 299" 
        products={under299.length > 0 ? under299 : allProducts.slice(0, 4)} 
        viewAllLink="/under-299" 
      />

      <PromoBanner />

      {/* UNDER 399 */}
      <ProductSection 
        title="UNDER 399" 
        products={under399.length > 0 ? under399 : allProducts.slice(0, 4)} 
        viewAllLink="/under-399" 
      />

      {/* UNDER 499 */}
      <ProductSection 
        title="UNDER 499" 
        products={under499.length > 0 ? under499 : allProducts.slice(0, 4)} 
        viewAllLink="/under-499" 
      />

      <ReviewsSection />
      <Footer />
    </>
  );
}
