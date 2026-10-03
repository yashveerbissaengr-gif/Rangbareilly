"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductImage } from "@/types";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ProductGalleryProps {
  images: ProductImage[];
  title: string;
  badgeLabel?: string;
}

export function ProductGallery({
  images,
  title,
  badgeLabel,
}: ProductGalleryProps) {
  // If fewer than 2 images, create interactive zoom/detail angle view
  const displayImages: Array<{ url: string; alt: string; label?: string }> =
    images.length > 1
      ? images
      : [
          {
            url: images[0]?.url || "/dummy-products/ring-1.jpg",
            alt: `${title} - Front View`,
            label: "Front Angle",
          },
          {
            url: images[0]?.url || "/dummy-products/ring-1.jpg",
            alt: `${title} - Detail Close Up`,
            label: "Macro Detail",
          },
        ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="w-full flex flex-col gap-4 sticky top-24">
      {/* Main Showcase Image Container */}
      <div
        className="relative w-full aspect-square rounded-2xl md:rounded-3xl bg-gray-50 overflow-hidden border border-gray-100 group select-none cursor-crosshair"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Top-left Ribbon / Badge */}
        {badgeLabel && (
          <div className="absolute top-3 left-0 z-20">
            <span className="bg-[#8B1A1A] text-white text-[11px] font-extrabold px-3 py-1 rounded-r-full shadow-md tracking-wider uppercase">
              {badgeLabel}
            </span>
          </div>
        )}

        {/* Zoom Hint Icon */}
        <div className="absolute top-3 right-3 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-xs p-1.5 rounded-full shadow-xs">
          <ZoomIn className="w-4 h-4 text-gray-700" />
        </div>

        {/* Main Image with Zoom effect */}
        <div className="relative w-full h-full">
          <Image
            src={displayImages[activeIndex]?.url || "/dummy-products/ring-1.jpg"}
            alt={displayImages[activeIndex]?.alt || title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-contain transition-transform duration-200 ${
              isZoomed ? "scale-130" : "scale-100"
            }`}
            style={
              isZoomed
                ? {
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                  }
                : undefined
            }
          />
        </div>

        {/* Left Arrow Navigation */}
        {displayImages.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous Image"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right Arrow Navigation */}
        {displayImages.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next Image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Mobile dots indicator */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5 md:hidden pointer-events-none">
            {displayImages.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeIndex ? "w-6 bg-[#E63956]" : "w-1.5 bg-black/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                activeIndex === idx
                  ? "border-[#E63956] shadow-sm ring-1 ring-[#E63956]/20 scale-102"
                  : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
