"use client";

import React from "react";
import Image from "next/image";
import { GiftSleeveOption } from "@/lib/product-palmonas";

interface ProductGiftSleeveProps {
  giftSleeve: GiftSleeveOption;
  isSelected: boolean;
  onToggle: (selected: boolean) => void;
}

export function ProductGiftSleeve({
  giftSleeve,
  isSelected,
  onToggle,
}: ProductGiftSleeveProps) {
  return (
    <div className="my-5">
      <h4 className="text-sm font-bold text-gray-900 mb-2">
        {giftSleeve.title}
      </h4>

      <label
        className={`flex items-center gap-3.5 p-3 rounded-2xl border transition-all cursor-pointer select-none ${
          isSelected
            ? "border-[#E63956] bg-[#FFF5F7] shadow-xs"
            : "border-gray-200 bg-white hover:border-gray-300"
        }`}
      >
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onToggle(e.target.checked)}
          className="w-4 h-4 rounded text-[#E63956] focus:ring-[#E63956] border-gray-300 transition cursor-pointer"
        />

        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-100 border border-gray-200/60">
          <Image
            src={giftSleeve.imageUrl}
            alt={giftSleeve.label}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>

        <div className="flex-grow">
          <span className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug">
            {giftSleeve.label}
          </span>
          <p className="text-[11px] text-gray-500 mt-0.5">
            Includes custom satin ribbon & celebratory message sleeve
          </p>
        </div>
      </label>
    </div>
  );
}
