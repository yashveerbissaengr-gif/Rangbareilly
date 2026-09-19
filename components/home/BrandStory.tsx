"use client";

import React from "react";
import { m } from "framer-motion";
import { Heading } from "../ui/Typography";

import { cn } from "@/lib/utils";

export function BrandStory({ theme = "core" }: { theme?: "core" | "loud" }) {
  const isLoud = theme === "loud";
  const bgClass = isLoud ? "bg-[#2B2622]" : "bg-rangbareilly-background";
  const textClass = isLoud ? "text-rangbareilly-background" : "text-rangbareilly-dark";
  const accentClass = isLoud ? "text-[#C9A227]" : "text-rangbareilly-primary";

  return (
    <section className={cn("flex items-center justify-center min-h-[70vh] px-6 py-32", bgClass)}>
      <m.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl text-center"
      >
        <Heading as="h2" className={cn("text-3xl md:text-5xl lg:text-6xl leading-[1.2]", textClass)}>
          {isLoud ? (
            <>
              Jewelry designed to turn heads. <br />
              <span className={cn("italic", accentClass)}>Not for blending in.</span>
            </>
          ) : (
            <>
              Jewelry designed for the quiet moments. <br />
              <span className={cn("italic", accentClass)}>Not just the grand occasions.</span>
            </>
          )}
        </Heading>
      </m.div>
    </section>
  );
}
