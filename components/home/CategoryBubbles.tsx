"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  { name: "Earrings",       href: "/category/earrings",        image: "/category/earrings.png" },
  { name: "Rings",          href: "/category/rings",           image: "/category/rings.jpg" },
  { name: "Necklace",       href: "/category/necklace",        image: "/category/necklace.png" },
  { name: "Bracelets",      href: "/category/bracelets",       image: "/category/bracelets.jpg" },
  { name: "Bag Charms",     href: "/category/bag-charms",      image: "/category/bag-charms.jpg" },
  { name: "Stainless Steel",href: "/category/stainless-steel", image: "/category/stainless-steel.jpg" },
  { name: "Arm Cuffs",      href: "/category/arm-cuffs",       image: "/category/arm-cuffs.png" },
];

export const CategoryBubbles = () => {
  return (
    <section className="py-10 bg-gradient-to-b from-[#fff5f6] to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-6">
          <h2 className="text-lg md:text-xl font-extrabold text-[#1F1215] tracking-wide uppercase">
            Shop by Category
          </h2>
          <div className="mx-auto mt-2 h-[3px] w-12 rounded-full bg-[#E63956]" />
        </div>

        {/* Scrollable Bubbles */}
        <div className="flex gap-5 md:gap-8 overflow-x-auto pb-3 scrollbar-hide snap-x justify-start md:justify-center">
          {categories.map((category, index) => (
            <Link
              href={category.href}
              key={index}
              className="flex flex-col items-center gap-2.5 shrink-0 snap-center group"
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-[rgba(230,57,86,0.15)] group-hover:border-[#E63956] group-hover:shadow-[0_4px_20px_rgba(230,57,86,0.2)] transition-all duration-200 overflow-hidden relative"
              >
                <Image 
                  src={category.image} 
                  alt={category.name} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 768px) 80px, 96px"
                />
              </motion.div>
              <span className="text-[11px] md:text-xs font-bold text-[#7D6B6E] text-center uppercase tracking-wider group-hover:text-[#E63956] transition-colors leading-tight max-w-[72px]">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
