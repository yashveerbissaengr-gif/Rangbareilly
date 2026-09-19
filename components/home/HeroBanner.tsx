"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GenZPromoBanner } from "@/components/ui/GenZPromoBanner";

const banners = [
  {
    src: "/banner-2.png",
    alt: "Under ₹199 and ₹299 Collection",
    showButton: false
  },
  {
    src: "/banner-3.png",
    alt: "A Little Surprise Just For You",
    showButton: true,
    buttonLeft: "22%",
    buttonBottom: "18.2%"
  },
  {
    src: "/banner-1.png",
    alt: "Premium Gift for You",
    showButton: true,
    buttonLeft: "24%",
    buttonBottom: "18.2%"
  }
];

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000); // 3 second pause time
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex flex-col bg-[#F5F0EB]">
      <Link href="/products" className="relative w-full block group cursor-pointer overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out w-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={banner.src} className="w-full shrink-0 relative bg-[#F5F0EB]">
              <Image
                src={banner.src}
                alt={banner.alt}
                width={1920}
                height={1080}
                className="w-full h-auto object-contain"
                priority={index === 0}
                unoptimized
              />
              {banner.showButton && (
                <div
                  className="absolute -translate-x-1/2 translate-y-1/2 z-20 w-max"
                  style={{ left: banner.buttonLeft, bottom: banner.buttonBottom }}
                >
                  <span className="text-[#8C6D46] font-serif font-medium text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-widest transition-transform group-hover:scale-105 inline-block drop-shadow-sm">
                    [See All Products]
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {banners.map((banner, index) => (
            <button
              key={banner.src}
              aria-label={`Go to slide ${index + 1}`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentSlide(index);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentSlide ? "bg-black" : "bg-black/30"
                }`}
            />
          ))}
        </div>
      </Link>

      <div className="w-full">
        <GenZPromoBanner />
      </div>
    </div>
  );
};

