"use client";

import React, { forwardRef } from "react";
import { m, HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "solid" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "none";
  theme?: "core" | "loud";
  children: React.ReactNode;
}

const baseStyles =
  "inline-flex items-center justify-center font-sans tracking-widest uppercase transition-colors duration-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

const sizes = {
  sm: "px-6 py-3 text-[10px]",
  md: "px-10 py-4 text-xs",
  lg: "px-12 py-5 text-sm",
  none: "p-0",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", size = "md", theme = "core", children, ...props }, ref) => {
    const isLoud = theme === "loud";

    const variants = {
      solid: isLoud ? "bg-rangbareilly-background text-rangbareilly-dark hover:bg-[#C9A227] hover:text-white" : "bg-rangbareilly-dark text-rangbareilly-background hover:bg-rangbareilly-primary",
      outline: isLoud
        ? "border border-rangbareilly-background text-rangbareilly-background hover:bg-rangbareilly-background hover:text-rangbareilly-dark"
        : "border border-rangbareilly-dark text-rangbareilly-dark hover:bg-rangbareilly-dark hover:text-rangbareilly-background",
      ghost: isLoud ? "text-rangbareilly-background hover:text-[#C9A227]" : "text-rangbareilly-dark hover:text-rangbareilly-primary",
      link: isLoud ? "text-rangbareilly-background underline underline-offset-4 hover:text-[#C9A227] decoration-1" : "text-rangbareilly-dark underline underline-offset-4 hover:text-rangbareilly-primary decoration-1",
    };

    return (
      <m.button
        ref={ref}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </m.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
