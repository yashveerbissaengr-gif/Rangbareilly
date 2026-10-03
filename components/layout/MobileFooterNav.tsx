"use client";

import React from "react";
import Link from "next/link";
import { Home, User, Grid, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";

export const MobileFooterNav = () => {
  const { cart, setIsCartOpen } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 px-4 py-2 flex justify-around items-center">
      <Link href="/" className="flex flex-col items-center text-gray-600 hover:text-[#FF6B6C]">
        <Home className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Home</span>
      </Link>
      <Link href="/account/login" className="flex flex-col items-center text-gray-600 hover:text-[#FF6B6C]">
        <User className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Log in</span>
      </Link>
      <Link href="/collections/all" className="flex flex-col items-center text-gray-600 hover:text-[#FF6B6C]">
        <Grid className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Collections</span>
      </Link>
      <Link href="/wishlist" className="flex flex-col items-center text-gray-600 hover:text-[#FF6B6C]">
        <Heart className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Wishlist</span>
      </Link>
      <button
        onClick={() => setIsCartOpen(true)}
        className="flex flex-col items-center text-gray-600 hover:text-[#FF6B6C] relative"
      >
        <ShoppingBag className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#FF6B6C] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            {totalItems}
          </span>
        )}
        <span className="text-[10px] mt-0.5">Cart</span>
      </button>
    </div>
  );
};
