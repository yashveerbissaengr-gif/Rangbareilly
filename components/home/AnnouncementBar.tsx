import React from "react";

import { cn } from "@/lib/utils";

export function AnnouncementBar({ theme = "core" }: { theme?: "core" | "loud" }) {
  const isLoud = theme === "loud";
  const bgClass = isLoud ? "bg-[#C9A227]" : "bg-rangbareilly-dark";
  const textClass = isLoud ? "text-[#2B2622]" : "text-rangbareilly-background";

  return (
    <div className={cn("w-full py-2.5 px-4 text-center z-50 flex items-center justify-center space-x-2", bgClass)}>
      <p className={cn("text-xs font-sans tracking-widest uppercase font-light", textClass)}>
        Complimentary shipping on all orders over ₹2000.
      </p>
    </div>
  );
}
