"use client";

import React, { useState } from "react";
import Image from "next/image";

import { useCart } from "@/lib/context/CartContext";
import { Product } from "@/types";
import { Heart } from "lucide-react";

export const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Calculate discount
  const discount = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-3xl p-3 border border-[rgba(230,57,86,0.08)] hover:-translate-y-2 hover:shadow-2xl transition duration-300 flex flex-col justify-between">
      <div className="relative aspect-square w-full rounded-2xl bg-gray-50 overflow-hidden group">
        {/* Pills */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.isBestSeller && (
            <span className="bg-white/80 backdrop-blur-md text-[#E63956] text-[11px] font-extrabold px-3 py-1 rounded-full border border-[#E63956]/20 shadow-sm">
              Bestseller 🔥
            </span>
          )}
          <span className="bg-white/80 backdrop-blur-md text-[#E63956] text-[11px] font-extrabold px-3 py-1 rounded-full border border-[#E63956]/20 shadow-sm">
            Anti-Tarnish ✨
          </span>
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted); }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center border border-gray-100 shadow-sm hover:scale-110 transition-transform"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${isWishlisted ? "fill-[#E63956] text-[#E63956]" : "text-gray-400 hover:text-[#E63956]"}`} 
          />
        </button>

        <Image
          src={product.images[0]?.url || "/placeholder.svg"}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="pt-3 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-bold text-sm text-[#1F1215] line-clamp-1">
            {product.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="text-sm font-extrabold text-[#1F1215]">
              ₹{product.price.toLocaleString()}
            </span>
            {product.compareAtPrice && (
              <>
                <span className="text-xs text-[#7D6B6E] line-through font-medium">
                  ₹{product.compareAtPrice.toLocaleString()}
                </span>
                {discount > 0 && (
                  <span className="text-[10px] font-extrabold text-[#E63956] bg-[#E63956]/10 px-1.5 py-0.5 rounded-md">
                    {discount}% OFF
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        <button
          onClick={() => {
            if (product.variants[0]?.stock !== 0) {
              addToCart(product);
            }
          }}
          disabled={product.variants[0]?.stock === 0}
          className={`w-full mt-3 font-extrabold text-[13px] py-3 rounded-full transition-colors shadow-sm flex items-center justify-center gap-1 ${
            product.variants[0]?.stock === 0 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-[#1F1215] hover:bg-[#E63956] text-white hover:shadow-[0_5px_15px_rgba(230,57,86,0.3)]'
          }`}
        >
          {product.variants[0]?.stock === 0 ? "OUT OF STOCK" : "Add To Cart 🛒"}
        </button>
      </div>
    </div>
  );
};
