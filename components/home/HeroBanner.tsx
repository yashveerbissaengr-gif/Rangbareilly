"use client";

import React from "react";
import Image from "next/image";

export const HeroBanner = () => {
  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] bg-[#F9EBEA] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero.jpg"
        alt="Hero Banner"
        fill
        className="object-cover object-center"
        priority
      />
      
      {/* Overlay Content */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
        style={{ background: "radial-gradient(circle, rgba(249,235,234,0.4) 0%, rgba(249,235,234,0.85) 100%)" }}
      >
        <h1 className="font-sans font-extrabold tracking-tight text-5xl md:text-7xl lg:text-8xl text-[#1F1215] drop-shadow-sm mb-4 max-w-4xl">
          Main Character Energy ✨
        </h1>
        <p className="font-sans text-base md:text-lg text-[#7D6B6E] max-w-xl mx-auto font-medium mb-10">
          High-shine, anti-tarnish pieces made for daily drip.
        </p>
        <button className="bg-gradient-to-br from-[#E63956] to-[#FF4D4D] text-white px-10 py-4 rounded-full font-extrabold uppercase tracking-wide text-sm transition-all shadow-[0_10px_25px_rgba(230,57,86,0.4)] hover:shadow-[0_15px_35px_rgba(230,57,86,0.6)] hover:-translate-y-1">
          Shop The Drop
        </button>
      </div>
    </div>
  );
};
