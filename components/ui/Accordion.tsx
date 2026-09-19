"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "../../lib/utils";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  theme?: "core" | "loud";
}

export function AccordionItem({ title, children, defaultOpen = false, theme = "core" }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const isLoud = theme === "loud";
  const borderClass = isLoud ? "border-rangbareilly-background/10" : "border-rangbareilly-dark/10";
  const textClass = isLoud ? "text-rangbareilly-background" : "text-rangbareilly-dark";
  const mutedTextClass = isLoud ? "text-rangbareilly-background/80" : "text-rangbareilly-dark/80";
  const hoverClass = isLoud ? "group-hover:text-[#C9A227]" : "group-hover:text-rangbareilly-primary";

  return (
    <div className={cn("border-b", borderClass)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-6 text-left focus:outline-none group"
      >
        <span className={cn("font-serif text-lg tracking-wide transition-colors", textClass, hoverClass)}>
          {title}
        </span>
        <span className={cn("transition-colors", textClass, hoverClass)}>
          {isOpen ? <Minus size={18} strokeWidth={1.5} /> : <Plus size={18} strokeWidth={1.5} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            initial={{ gridTemplateRows: "0fr", opacity: 0 }}
            animate={{ gridTemplateRows: "1fr", opacity: 1 }}
            exit={{ gridTemplateRows: "0fr", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid"
          >
            <div className="overflow-hidden">
              <div className={cn("pb-6 font-sans font-light leading-relaxed", mutedTextClass)}>
                {children}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}


