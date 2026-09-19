"use client";

import React from "react";
import Image from "next/image";

export const PromoBanner = () => {
  return (
    <div className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative w-full h-[40vh] md:h-[50vh] rounded-2xl overflow-hidden group">
          <Image
            src="https://images.unsplash.com/photo-1629224316810-9d8805b95e76?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            alt="Promotional Banner"
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center p-6">
            <h3 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-wider mb-2 drop-shadow-lg">
              Buy 4 @800 Only
            </h3>
            <p className="text-[#FFEAEA] text-lg md:text-2xl font-accent mb-6 drop-shadow-md">
              + Free Shipping on all orders
            </p>
            <button className="bg-white text-[#8B263E] px-8 py-3 rounded-full font-bold uppercase tracking-wide transition-colors hover:bg-[#FFEAEA] shadow-lg">
              Claim Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
