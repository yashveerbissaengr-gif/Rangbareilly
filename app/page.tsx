import { HeroBanner } from "@/components/home/HeroBanner";
import { CategoryBubbles } from "@/components/home/CategoryBubbles";
import { TopSellingSection } from "@/components/home/TopSellingSection";
import { ProductSection } from "@/components/home/ProductSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { InstagramReels } from "@/components/home/InstagramReels";
import { Footer } from "@/components/layout/Footer";
import { getProducts } from "@/lib/shopify";

export default async function Home() {
  const allProducts = await getProducts();
  
  const under199 = allProducts.filter(p => p.price <= 199).slice(0, 4);
  const under299 = allProducts.filter(p => p.price > 199 && p.price <= 299).slice(0, 4);
  const under399 = allProducts.filter(p => p.price > 299 && p.price <= 399).slice(0, 4);
  const under499 = allProducts.filter(p => p.price > 399 && p.price <= 499).slice(0, 4);

  const topSelling = [
    allProducts.find(p => p.title?.toLowerCase().includes("arm cuff") || p.tags?.includes("arm-cuffs")),
    allProducts.find(p => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return p.title?.toLowerCase().includes("watch") || (p as any).productType?.toLowerCase() === "watch";
    })
  ].filter(Boolean); // removes undefined

  return (
    <>
      <HeroBanner />
      <CategoryBubbles />
      
      {topSelling.length > 0 && (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <TopSellingSection products={topSelling as any} />
      )}
      
      <InstagramReels />
      
      {/* UNDER 499 */}
      <ProductSection 
        title="UNDER 499" 
        products={under499.length > 0 ? under499 : allProducts.slice(0, 4)} 
        viewAllLink="/under-499" 
      />

      {/* UNDER 399 */}
      <ProductSection 
        title="UNDER 399" 
        products={under399.length > 0 ? under399 : allProducts.slice(0, 4)} 
        viewAllLink="/under-399" 
      />

      {/* UNDER 299 */}
      <ProductSection 
        title="UNDER 299" 
        products={under299.length > 0 ? under299 : allProducts.slice(0, 4)} 
        viewAllLink="/under-299" 
      />

      {/* UNDER 199 */}
      <ProductSection 
        title="UNDER 199" 
        products={under199.length > 0 ? under199 : allProducts.slice(0, 4)} 
        viewAllLink="/under-199" 
      />

      <ReviewsSection />
      <Footer />
    </>
  );
}
