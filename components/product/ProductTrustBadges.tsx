"use client";

import React from "react";
import { Truck, ShieldCheck, Crown, RotateCcw, RefreshCw, Banknote } from "lucide-react";

interface ProductTrustBadgesProps {
  finishLabel?: string;
}

export function ProductTrustBadges({ finishLabel = "18K Gold Tone Plated" }: ProductTrustBadgesProps) {
  return (
    <div className="w-full my-8 rounded-2xl bg-[#F6F2EC] border border-[#E9E3D9] overflow-hidden">
      {/* Top Row: 3 Value Props */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 p-5 sm:p-7 text-center">
        {/* Free Shipping */}
        <div className="flex flex-col items-center justify-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-gray-800 shadow-2xs">
            <Truck className="w-5 h-5 stroke-[1.75]" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight">
            Free Shipping
          </span>
        </div>

        {/* Skin Safe Jewellery */}
        <div className="flex flex-col items-center justify-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-gray-800 shadow-2xs">
            <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight">
            Skin Safe Jewellery
          </span>
        </div>

        {/* Plating Guarantee */}
        <div className="flex flex-col items-center justify-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-gray-800 shadow-2xs">
            <Crown className="w-5 h-5 stroke-[1.75]" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight">
            {finishLabel}
          </span>
        </div>
      </div>

      {/* Bottom Sub-Bar: 3 Guarantees */}
      <div className="grid grid-cols-3 border-t border-[#E5DEC7]/80 bg-[#EFE9DF]/50 py-3 sm:py-3.5 text-center divide-x divide-[#E5DEC7]/80">
        {/* 2 Days Return */}
        <div className="flex items-center justify-center gap-1.5 px-2">
          <RotateCcw className="w-3.5 h-3.5 text-gray-600 shrink-0" />
          <span className="text-[11px] sm:text-xs font-semibold text-gray-800">
            2 Days Return
          </span>
        </div>

        {/* 10 Days Exchange */}
        <div className="flex items-center justify-center gap-1.5 px-2">
          <RefreshCw className="w-3.5 h-3.5 text-gray-600 shrink-0" />
          <span className="text-[11px] sm:text-xs font-semibold text-gray-800">
            10 Days Exchange
          </span>
        </div>

        {/* Cash On Delivery */}
        <div className="flex items-center justify-center gap-1.5 px-2">
          <Banknote className="w-3.5 h-3.5 text-gray-600 shrink-0" />
          <span className="text-[11px] sm:text-xs font-semibold text-gray-800">
            Cash On Delivery
          </span>
        </div>
      </div>
    </div>
  );
}
