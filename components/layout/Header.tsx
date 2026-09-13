"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, Heart, ShoppingBag, Menu, Sparkles } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";

export const Header = () => {
  const { cart, setIsCartOpen } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-[rgba(230,57,86,0.08)] shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <button className="md:hidden text-[#1F1215]">
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/">
            <div className="relative flex items-center gap-1 group">
              <div className="relative h-10 w-28 md:h-12 md:w-32 flex items-center">
                <Image 
                  src="/logo.png" 
                  alt="Rangbareilly Logo" 
                  fill
                  className="object-contain object-left mix-blend-multiply" 
                  priority 
                />
              </div>
              <Sparkles className="w-4 h-4 text-[#E63956] opacity-80 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-[13px] font-bold text-[#1F1215]">
          <Link href="/under-199" className="px-4 py-2 rounded-full hover:bg-[#E63956]/10 hover:text-[#E63956] transition-all">UNDER 199</Link>
          <Link href="/under-299" className="px-4 py-2 rounded-full hover:bg-[#E63956]/10 hover:text-[#E63956] transition-all">UNDER 299</Link>
          <Link href="/under-399" className="px-4 py-2 rounded-full hover:bg-[#E63956]/10 hover:text-[#E63956] transition-all">UNDER 399</Link>
          
          <div className="h-4 w-px bg-gray-200 mx-2"></div>
          
          <Link href="/category/rings" className="px-3 py-2 rounded-full hover:bg-[#E63956]/10 hover:text-[#E63956] transition-all text-[#7D6B6E]">Rings</Link>
          <Link href="/category/bag-charms" className="px-3 py-2 rounded-full hover:bg-[#E63956]/10 hover:text-[#E63956] transition-all text-[#7D6B6E]">Bag Charms</Link>
          <Link href="/category/stainless-steel" className="px-3 py-2 rounded-full hover:bg-[#E63956]/10 hover:text-[#E63956] transition-all text-[#7D6B6E]">Stainless Steel</Link>
          <Link href="/category/earrings" className="px-3 py-2 rounded-full hover:bg-[#E63956]/10 hover:text-[#E63956] transition-all text-[#7D6B6E]">Earrings</Link>
          <Link href="/category/bracelets" className="px-3 py-2 rounded-full hover:bg-[#E63956]/10 hover:text-[#E63956] transition-all text-[#7D6B6E]">Bracelets</Link>
          <Link href="/category/necklaces" className="px-3 py-2 rounded-full hover:bg-[#E63956]/10 hover:text-[#E63956] transition-all text-[#7D6B6E]">Necklace (Chains)</Link>
          <Link href="/category/hand-cuffs" className="px-3 py-2 rounded-full hover:bg-[#E63956]/10 hover:text-[#E63956] transition-all text-[#7D6B6E]">Hand Cuffs</Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-3 text-[#1F1215]">
          <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-[rgba(230,57,86,0.1)] hover:border-[#E63956]/30 hover:bg-[#E63956]/5 hover:text-[#E63956] transition-all active:scale-95">
            <Search className="w-4 h-4" />
          </button>
          <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-[rgba(230,57,86,0.1)] hover:border-[#E63956]/30 hover:bg-[#E63956]/5 hover:text-[#E63956] transition-all active:scale-95">
            <User className="w-4 h-4" />
          </button>
          <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-[rgba(230,57,86,0.1)] hover:border-[#E63956]/30 hover:bg-[#E63956]/5 hover:text-[#E63956] transition-all active:scale-95">
            <Heart className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-[rgba(230,57,86,0.1)] hover:border-[#E63956]/30 hover:bg-[#E63956]/5 hover:text-[#E63956] transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#E63956] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-[0_0_10px_rgba(230,57,86,0.4)]">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
