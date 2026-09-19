"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Heading, Text } from "../ui/Typography";

const testimonials = [
  {
    id: 1,
    text: "I've never been someone who wears a lot of jewelry, but the Cloud Studs haven't left my ears since I got them. They're incredibly light and go with literally everything I own.",
    author: "Aditi S.",
  },
  {
    id: 2,
    text: "The Stack Rings are perfect. I love how delicate they look individually, but stacked together they make just enough of a statement. The quality feels much higher than the price suggests.",
    author: "Rohan M.",
  },
  {
    id: 3,
    text: "Finally, a fine jewelry brand that doesn't feel overly traditional. The minimal aesthetic is exactly what I was looking for to wear to work everyday.",
    author: "Priya K.",
  },
  {
    id: 4,
    text: "I bought the Delicate Chain as a gift to myself. It sits perfectly on the collarbone and adds a subtle shine that I've gotten so many compliments on.",
    author: "Meera D.",
  },
  {
    id: 5,
    text: "Beautiful packaging, excellent craftsmanship. It feels like buying from a high-end international boutique. Very impressed with the attention to detail.",
    author: "Nisha V.",
  }
];

import { cn } from "@/lib/utils";

export function Testimonials({ theme = "core" }: { theme?: "core" | "loud" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isLoud = theme === "loud";
  const bgClass = isLoud ? "bg-[#2B2622]" : "bg-rangbareilly-background";
  const textClass = isLoud ? "text-rangbareilly-background" : "text-rangbareilly-dark";
  const mutedTextClass = isLoud ? "text-rangbareilly-background/60" : "text-rangbareilly-dark/60";
  const accentTextClass = isLoud ? "text-[#C9A227]" : "text-rangbareilly-primary";
  const buttonHoverClass = isLoud ? "hover:text-rangbareilly-background" : "hover:text-rangbareilly-dark";

  return (
    <section className={cn("py-32 px-6 text-center flex flex-col items-center", bgClass)}>
      <Heading as="h2" className={cn("text-xl md:text-2xl uppercase tracking-widest mb-16", mutedTextClass)}>
        Words from our community
      </Heading>

      <div className="relative w-full max-w-3xl min-h-[250px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <m.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <Heading as="h3" className={cn("text-2xl md:text-4xl leading-relaxed mb-8", textClass)}>
              &quot;{testimonials[currentIndex].text}&quot;
            </Heading>
            <Text className={cn("tracking-widest uppercase text-sm", accentTextClass)}>
              — {testimonials[currentIndex].author}
            </Text>
          </m.div>
        </AnimatePresence>
      </div>

      <div className="flex space-x-6 mt-12">
        <button 
          type="button"
          onClick={handlePrev}
          className={cn("p-3 transition-colors rounded-full", mutedTextClass, buttonHoverClass)}
          aria-label="Previous testimonial"
        >
          <ChevronLeft strokeWidth={1} size={32} />
        </button>
        <button 
          type="button"
          onClick={handleNext}
          className={cn("p-3 transition-colors rounded-full", mutedTextClass, buttonHoverClass)}
          aria-label="Next testimonial"
        >
          <ChevronRight strokeWidth={1} size={32} />
        </button>
      </div>
    </section>
  );
}
