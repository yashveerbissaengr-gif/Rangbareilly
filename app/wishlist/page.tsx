"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { useWishlist } from "@/lib/context/WishlistContext";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <section className="container mx-auto min-h-screen px-4 py-12 pb-24">
      <div className="mb-8 flex items-center justify-center gap-2">
        <Heart className="h-6 w-6 text-[#E63956]" />
        <h1 className="text-3xl font-bold text-[#1F1215]">My Wishlist</h1>
      </div>
      {wishlist.length ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {wishlist.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="mx-auto flex max-w-md flex-col items-center py-16 text-center">
          <Heart className="mb-4 h-10 w-10 text-[#E63956]/40" />
          <h2 className="text-lg font-bold text-[#1F1215]">Your wishlist is empty</h2>
          <p className="mt-2 text-sm text-[#7D6B6E]">Save pieces you love and they will show up here.</p>
          <Link href="/collections/all" className="mt-6 rounded-full bg-[#1F1215] px-5 py-3 text-sm font-bold text-white hover:bg-[#E63956]">
            Browse collections
          </Link>
        </div>
      )}
    </section>
  );
}