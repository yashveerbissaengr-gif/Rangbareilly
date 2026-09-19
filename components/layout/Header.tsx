"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, Heart, ShoppingBag, Menu } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { MobileMenuSidebar } from "@/components/layout/MobileMenuSidebar";

export const Header = () => {
  const { cart, setIsCartOpen } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-[rgba(230,57,86,0.08)] shadow-sm">
        <div className="w-full px-3 md:px-6 py-3 flex items-center gap-4">

          {/* ☰ Hamburger — far left, standalone */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open navigation menu"
            className="shrink-0 text-[#1F1215] p-1 hover:text-[#E63956] transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo + Name */}
          <Link href="/" className="shrink-0">
            <div className="flex items-center gap-1.5 group">
              <div className="relative h-11 w-11 md:h-12 md:w-12 flex items-center">
                <Image
                  src="/logo.png"
                  alt="Rangbareilly Logo"
                  fill
                  sizes="(max-width: 768px) 48px, 48px"
                  className="object-contain mix-blend-multiply"
                  priority
                />
              </div>
              <span className="font-extrabold text-sm md:text-base tracking-widest text-[#E63956] group-hover:text-[#c42d47] transition-colors uppercase">
                RANGBAREILLY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation — fills center */}
          <nav className="hidden lg:flex items-center gap-1 text-[13px] font-bold text-[#1F1215] flex-1 justify-center">
            <Link href="/under-499" className="px-4 py-2 rounded-full hover:bg-[#E63956]/10 hover:text-[#E63956] transition-colors">UNDER 499</Link>
            <Link href="/under-399" className="px-4 py-2 rounded-full hover:bg-[#E63956]/10 hover:text-[#E63956] transition-colors">UNDER 399</Link>
            <Link href="/under-299" className="px-4 py-2 rounded-full hover:bg-[#E63956]/10 hover:text-[#E63956] transition-colors">UNDER 299</Link>
            <Link href="/under-199" className="px-4 py-2 rounded-full hover:bg-[#E63956]/10 hover:text-[#E63956] transition-colors">UNDER 199</Link>
            <div className="h-4 w-px bg-gray-200 mx-2" />
            <Link href="/category/rings" className="px-3 py-2 rounded-full hover:bg-[#E63956]/10 hover:text-[#E63956] transition-colors text-[#7D6B6E]">Rings</Link>
            <Link href="/category/bag-charms" className="px-3 py-2 rounded-full hover:bg-[#E63956]/10 hover:text-[#E63956] transition-colors text-[#7D6B6E]">Bag Charms</Link>
            <Link href="/category/stainless-steel" className="px-3 py-2 rounded-full hover:bg-[#E63956]/10 hover:text-[#E63956] transition-colors text-[#7D6B6E]">Stainless Steel</Link>
            <Link href="/category/earrings" className="px-3 py-2 rounded-full hover:bg-[#E63956]/10 hover:text-[#E63956] transition-colors text-[#7D6B6E]">Earrings</Link>
            <Link href="/category/bracelets" className="px-3 py-2 rounded-full hover:bg-[#E63956]/10 hover:text-[#E63956] transition-colors text-[#7D6B6E]">Bracelets</Link>
            <Link href="/category/necklace" className="px-3 py-2 rounded-full hover:bg-[#E63956]/10 hover:text-[#E63956] transition-colors text-[#7D6B6E]">Necklace</Link>
            <Link href="/category/arm-cuffs" className="px-3 py-2 rounded-full hover:bg-[#E63956]/10 hover:text-[#E63956] transition-colors text-[#7D6B6E]">Arm Cuffs</Link>
          </nav>

          {/* Icons — pushed to far right */}
          <div className="flex items-center gap-3 text-[#1F1215] ml-auto">
            <button aria-label="Search" className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-[rgba(230,57,86,0.1)] hover:border-[#E63956]/30 hover:bg-[#E63956]/5 hover:text-[#E63956] transition active:scale-95">
              <Search className="w-4 h-4" />
            </button>
            <Link href="/account/login" className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-[rgba(230,57,86,0.1)] hover:border-[#E63956]/30 hover:bg-[#E63956]/5 hover:text-[#E63956] transition active:scale-95">
              <User className="w-4 h-4" />
            </Link>
            <button aria-label="Wishlist" className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-[rgba(230,57,86,0.1)] hover:border-[#E63956]/30 hover:bg-[#E63956]/5 hover:text-[#E63956] transition active:scale-95">
              <Heart className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-[rgba(230,57,86,0.1)] hover:border-[#E63956]/30 hover:bg-[#E63956]/5 hover:text-[#E63956] transition active:scale-95"
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

      {/* Mobile Sidebar */}
      <MobileMenuSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
};
