"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import { Text } from "../ui/Typography";

const placeholders = [
  { id: 1, title: "Product Name", price: "Rs. 1,299", originalPrice: "Rs. 4,999" },
  { id: 2, title: "Product Name", price: "Rs. 1,499", originalPrice: "Rs. 2,999" },
  { id: 3, title: "Product Name", price: "Rs. 1,499", originalPrice: "Rs. 5,999" },
  { id: 4, title: "Product Name", price: "Rs. 1,299", originalPrice: "Rs. 1,899" },
  { id: 5, title: "Product Name", price: "Rs. 1,299", originalPrice: "Rs. 4,799" },
];

export function LovedByCustomers({ theme = "core" }: { theme?: "core" | "loud" }) {
  const isLoud = theme === "loud";
  const textColor = isLoud ? "text-rangbareilly-background" : "text-rangbareilly-dark";
  const mutedTextColor = isLoud ? "text-rangbareilly-background/60" : "text-rangbareilly-dark/60";
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-12">
          <h2 className={cn("font-serif font-bold text-4xl md:text-5xl uppercase tracking-tight mb-4", textColor)}>
            Loved By Customers
          </h2>
          <Text className={cn("text-lg", mutedTextColor)}>
            Shop with confidence — exactly as you see it.
          </Text>
        </div>

        {/* Horizontal scrollable container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {placeholders.map((item) => (
            <div 
              key={item.id} 
              className="relative flex-none w-[260px] md:w-[300px] h-[460px] md:h-[530px] rounded-xl overflow-hidden snap-center bg-black/10 dark:bg-white/10"
            >
              {/* Video Placeholder (Blank) */}
              <div className="absolute inset-0 w-full h-full object-cover bg-gray-200 dark:bg-gray-800" />
              
              {/* Product Card Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-3 flex items-center gap-3 shadow-lg">
                <div className="w-12 h-12 bg-gray-100 rounded object-cover flex-none" />
                <div className="flex-1 min-w-0 flex items-center">
                  <h3 className="text-xs font-semibold text-gray-900 truncate">{item.title}</h3>
                </div>
                <button 
                  type="button"
                  aria-label="Add to cart"
                  className={cn(
                  "flex-none w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                  isLoud ? "bg-[#C9A227] text-white hover:bg-[#A98217]" : "bg-rangbareilly-dark text-white hover:bg-rangbareilly-primary"
                )}>
                  <ShoppingBag size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
