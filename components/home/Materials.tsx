"use client";

import React from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { Heading, Text } from "../ui/Typography";

import { cn } from "@/lib/utils";

export function Materials({ theme = "core" }: { theme?: "core" | "loud" }) {
  const isLoud = theme === "loud";
  const bgClass = isLoud ? "bg-[#1A1715]" : "bg-[#F5F2EA]";
  const textClass = isLoud ? "text-rangbareilly-background" : "text-rangbareilly-dark";
  const mutedTextClass = isLoud ? "text-rangbareilly-background/80" : "text-rangbareilly-dark/80";

  return (
    <section className={cn("py-24 px-6 md:px-12 lg:px-24", bgClass)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <m.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1 relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none"
        >
          <Image
            src={isLoud 
              ? "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=1000&auto=format&fit=crop" // Can replace with a louder image later
              : "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=1000&auto=format&fit=crop"}
            alt="Jewelry Craftsmanship"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </m.div>
        
        <m.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="order-1 lg:order-2 flex flex-col justify-center max-w-xl mx-auto lg:mx-0"
        >
          <Heading as="h2" className={cn("text-3xl md:text-5xl mb-8", textClass)}>
            {isLoud ? "Unapologetically Bold" : "Crafted for the Everyday"}
          </Heading>
          <div className="space-y-6">
            <Text className={cn("text-lg", mutedTextClass)}>
              {isLoud 
                ? "We believe that statement jewelry should be seen. Our loud pieces are cast in solid 14k gold and sterling silver, designed to capture attention and reflect your inner fire."
                : "We believe that luxury shouldn't be reserved for special occasions. Our pieces are cast in solid 14k gold and sterling silver, designed to live on your skin from morning to midnight."}
            </Text>
            <Text className={cn("text-lg", mutedTextClass)}>
              Every curve, every clasp, and every polish is meticulously scrutinized to ensure that what you wear feels as natural as it looks. 
            </Text>
          </div>
        </m.div>
      </div>
    </section>
  );
}
