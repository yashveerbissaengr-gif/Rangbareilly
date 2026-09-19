"use client";

import React from "react";
import { m as motion } from "framer-motion";

const announcements = [
  "EASY RETURN",
  "SUMMER SALE IS LIVE - UPTO 70% OFF",
  "FREE SHIPPING ABOVE INR 599",
  "FREE GIFT ON ORDER ABOVE INR 699",
  "COD AVAILABLE"
];

export const TopBar = () => {
  return (
    <div className="w-full bg-[#FFEAEA] text-[#8B263E] text-xs font-semibold py-2 overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-block"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        {announcements.map((text, i) => (
          <span key={text} className="mx-8">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
