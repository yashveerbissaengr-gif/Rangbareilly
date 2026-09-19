import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/lib/shopify';
import Image from 'next/image';
import { AddToCartButton } from './AddToCartButton';
import { ProductSection } from '@/components/home/ProductSection';
import { Footer } from '@/components/layout/Footer';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    return { title: 'Product Not Found | Rangbareilly' };
  }

  return {
    title: `${product.title} | Rangbareilly`,
    description: `Buy ${product.title} at Rangbareilly.`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    return notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-12 flex flex-col md:flex-row gap-12">
          {/* Image */}
          <div className="w-full md:w-1/2 relative aspect-square rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={product.images[0]?.url || "/placeholder.svg"}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <span className="text-sm text-[#FF6B6C] font-semibold tracking-wider uppercase mb-2">
              {product.collection}
            </span>
            <h1 className="text-3xl md:text-4xl font-accent font-medium text-gray-900 mb-4">
              {product.title}
            </h1>
            
            <div className="flex items-end gap-3 mb-8">
              <span className="text-2xl font-bold text-gray-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <span className="text-gray-400 line-through text-lg mb-0.5">
                  ₹{product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Experience the perfect blend of elegance and style with this beautiful piece from our collection. Crafted with precision to complement your everyday look and special occasions.
            </p>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <ProductSection title="You May Also Like" products={relatedProducts} />
      
      <Footer />
    </div>
  );
}
