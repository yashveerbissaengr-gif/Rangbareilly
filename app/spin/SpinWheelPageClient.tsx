"use client";

import { SpinWheel } from "@/components/spin/SpinWheel";

interface SpinWheelPageClientProps {
  orderNumber: number;
}

/**
 * Thin client boundary wrapper so the server page can pass `orderNumber`
 * down to the interactive SpinWheel component.
 */
export function SpinWheelPageClient({ orderNumber }: SpinWheelPageClientProps) {
  return <SpinWheel orderNumber={orderNumber} />;
}
