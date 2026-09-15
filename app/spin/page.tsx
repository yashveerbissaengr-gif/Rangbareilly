import { Suspense } from "react";
import type { Metadata } from "next";
import { SpinWheelPageClient } from "./SpinWheelPageClient";

export const metadata: Metadata = {
  title: "Your Lucky Spin | Rang Bareilly",
  description:
    "Spin the wheel and win an exclusive discount on your Rang Bareilly order!",
};

interface SpinPageProps {
  searchParams: Promise<{ order?: string }>;
}

/**
 * /spin?order=<shopifyOrderNumber>
 *
 * Server component — reads the Shopify order number from the URL search
 * params and passes it to the client spin wheel.
 *
 * The order number drives the rigged prize engine:
 *   - Orders #30000, #60000, #90000 … → FREE ORDER
 *   - All other orders → 80% chance of 10% OFF, 20% chance of 15% OFF
 */
export default async function SpinPage({ searchParams }: SpinPageProps) {
  const params = await searchParams;
  const rawOrder = params.order ?? "0";
  const orderNumber = Math.max(0, parseInt(rawOrder, 10) || 0);

  return (
    <section
      className="min-h-[calc(100vh-theme(spacing.28))] flex flex-col items-center justify-center px-4 py-16"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(230,57,86,0.12) 0%, transparent 60%), var(--color-rangbareilly-background)",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="text-center mb-10 max-w-md">
        <p
          className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
          style={{ color: "#E63956" }}
        >
          🎉 Order Confirmed
        </p>
        <h1
          className="text-4xl font-black tracking-tight leading-none mb-4"
          style={{ color: "#1F1215", fontFamily: "var(--font-outfit)" }}
        >
          You&apos;ve Unlocked a
          <br />
          <span style={{ color: "#E63956" }}>Lucky Spin!</span>
        </h1>
        <p
          className="text-base font-medium leading-relaxed"
          style={{ color: "#7D6B6E", fontFamily: "var(--font-outfit)" }}
        >
          Spin the wheel to reveal your exclusive discount. One spin per order
          — good luck! 🍀
        </p>

        {/* Order badge */}
        {orderNumber > 0 && (
          <div
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full text-xs font-bold"
            style={{
              backgroundColor: "#FFEAEA",
              border: "1px solid rgba(230,57,86,0.25)",
              color: "#7D6B6E",
            }}
          >
            <span aria-hidden="true">🛍️</span>
            Order #{orderNumber.toLocaleString("en-IN")}
          </div>
        )}
      </div>

      {/* ── Spin Wheel ─────────────────────────────────────────────────── */}
      <Suspense
        fallback={
          <div
            className="w-[420px] h-[420px] rounded-full animate-pulse"
            style={{ backgroundColor: "#FFEAEA" }}
            aria-label="Loading spin wheel…"
          />
        }
      >
        <SpinWheelPageClient orderNumber={orderNumber} />
      </Suspense>

      {/* ── Footer note ────────────────────────────────────────────────── */}
      <p
        className="mt-10 text-[10px] text-center max-w-xs leading-relaxed"
        style={{ color: "#C4A0A8" }}
      >
        Discounts are applied via coupon code at checkout. Single use only.
        Rang Bareilly reserves the right to modify or withdraw this promotion
        at any time.
      </p>
    </section>
  );
}
