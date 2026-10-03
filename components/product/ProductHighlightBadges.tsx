"use client";

import React from "react";
import { HighlightBadge } from "@/lib/product-palmonas";
import { 
  Sparkles, 
  ShieldCheck, 
  Crown, 
  Droplets, 
  Clock, 
  Feather, 
  Gem, 
  Sliders, 
  Palette, 
  HeartHandshake 
} from "lucide-react";

interface ProductHighlightBadgesProps {
  badges: HighlightBadge[];
}

export function ProductHighlightBadges({ badges }: ProductHighlightBadgesProps) {
  const getIcon = (iconName: HighlightBadge["iconName"]) => {
    switch (iconName) {
      case "anti-tarnish":
        return <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />;
      case "skin-safe":
        return <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />;
      case "gold-plated":
        return <Crown className="w-3.5 h-3.5 text-[#B45309]" />;
      case "silver-finish":
        return <Gem className="w-3.5 h-3.5 text-[#4B5563]" />;
      case "feather-light":
        return <Feather className="w-3.5 h-3.5 text-[#7C3AED]" />;
      case "quartz":
        return <Clock className="w-3.5 h-3.5 text-[#2563EB]" />;
      case "water-resistant":
        return <Droplets className="w-3.5 h-3.5 text-[#0284C7]" />;
      case "handcrafted":
      case "mirror-work":
        return <Palette className="w-3.5 h-3.5 text-[#DC2626]" />;
      case "adjustable":
        return <Sliders className="w-3.5 h-3.5 text-[#4F46E5]" />;
      default:
        return <HeartHandshake className="w-3.5 h-3.5 text-[#E63956]" />;
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 my-4">
      {badges.map((b) => (
        <div
          key={b.id}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E9E4DC] text-[11px] sm:text-xs font-semibold text-[#443834] transition hover:bg-[#F3EFE8]"
        >
          {getIcon(b.iconName)}
          <span>{b.label}</span>
        </div>
      ))}
    </div>
  );
}
