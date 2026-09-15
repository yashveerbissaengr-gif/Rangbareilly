"use client";

import { useRef, useEffect, useState } from "react";
import { m } from "framer-motion";
import type { SpinResult } from "./types";

interface SpinResultModalProps {
  result: SpinResult;
  onClose: () => void;
}

/** Number of confetti particles */
const PARTICLE_COUNT = 60;

/** Generates a random confetti particle style */
function randomParticle(i: number): React.CSSProperties {
  const colors = [
    "#E63956",
    "#FFD700",
    "#FFEAEA",
    "#FF4D4D",
    "#1F1215",
    "#FF9EB5",
    "#FFF0A0",
  ];
  const size = Math.random() * 10 + 6;
  return {
    position: "fixed",
    top: `${Math.random() * 40}%`,
    left: `${Math.random() * 100}%`,
    width: size,
    height: size,
    borderRadius: Math.random() > 0.5 ? "50%" : "2px",
    backgroundColor: colors[i % colors.length],
    opacity: 0,
    // Staggered fall animation via CSS custom properties
    ["--tx" as string]: `${(Math.random() - 0.5) * 300}px`,
    ["--ty" as string]: `${Math.random() * 80 + 60}vh`,
    ["--rot" as string]: `${Math.random() * 720}deg`,
    animation: `confetti-fall ${1.5 + Math.random() * 2}s ease-out ${
      Math.random() * 0.8
    }s forwards`,
  };
}

export function SpinResultModal({ result, onClose }: SpinResultModalProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLSpanElement>(null);

  const isFree = result.isFreeOrder;
  const discountPct = Math.round(result.segment.discount * 100);

  const headline = isFree
    ? "🎉 YOUR ORDER IS FREE!"
    : `🎊 YOU WON ${discountPct}% OFF!`;

  const subline = isFree
    ? "Congratulations! This entire order is on us."
    : `Apply the coupon below at checkout on your next order.`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(result.couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback for older browsers
      if (codeRef.current) {
        const range = document.createRange();
        range.selectNodeContents(codeRef.current);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
      }
    }
  }

  return (
    <>
      {/* ── Confetti particles ──────────────────────────────────────────── */}
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <div key={i} style={randomParticle(i)} aria-hidden="true" />
      ))}

      {/* ── Backdrop ────────────────────────────────────────────────────── */}
      <m.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(31,18,21,0.75)", backdropFilter: "blur(6px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label="Spin result"
      >
        {/* ── Modal card ────────────────────────────────────────────────── */}
        <m.div
          className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #1F1215 0%, #3A0A14 100%)",
            border: "1.5px solid rgba(230,57,86,0.4)",
          }}
          initial={{ scale: 0.75, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative top gradient bar */}
          <div
            className="h-2 w-full"
            style={{
              background: "linear-gradient(90deg, #E63956 0%, #FFD700 50%, #E63956 100%)",
            }}
          />

          <div className="px-8 py-8 flex flex-col items-center gap-5 text-center">
            {/* Prize icon */}
            <m.div
              className="text-6xl select-none"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.15 }}
              aria-hidden="true"
            >
              {isFree ? "🆓" : discountPct >= 50 ? "💥" : discountPct >= 20 ? "🎁" : "🏷️"}
            </m.div>

            {/* Headline */}
            <m.h2
              className="text-2xl font-black tracking-tight leading-tight"
              style={{ color: "#FFEAEA", fontFamily: "var(--font-outfit)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {headline}
            </m.h2>

            {/* Subline */}
            <p
              className="text-sm font-medium"
              style={{ color: "#C4A0A8", fontFamily: "var(--font-outfit)" }}
            >
              {subline}
            </p>

            {/* Coupon code box */}
            <m.div
              className="w-full rounded-xl p-px"
              style={{
                background: "linear-gradient(135deg, #E63956, #FFD700)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div
                className="rounded-xl px-5 py-4 flex items-center justify-between gap-3"
                style={{ backgroundColor: "#2E1018" }}
              >
                <span
                  ref={codeRef}
                  id="coupon-code-display"
                  className="font-mono text-lg font-black tracking-[0.15em] select-all"
                  style={{ color: "#FFD700" }}
                >
                  {result.couponCode}
                </span>

                <button
                  id="copy-coupon-button"
                  onClick={handleCopy}
                  className="shrink-0 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200"
                  style={{
                    backgroundColor: copied ? "#10B981" : "#E63956",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-outfit)",
                  }}
                  aria-label="Copy coupon code"
                >
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              </div>
            </m.div>

            {/* T&Cs note */}
            <p
              className="text-[10px] leading-relaxed"
              style={{ color: "#7D6B6E", fontFamily: "var(--font-outfit)" }}
            >
              {isFree
                ? "Free order coupon valid for this order only. One per customer."
                : "Single-use coupon. Valid for 7 days. Cannot be combined with other offers."}
            </p>

            {/* Close button */}
            <m.button
              id="close-spin-result-button"
              onClick={onClose}
              className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300"
              style={{
                backgroundColor: "#E63956",
                color: "#FFFFFF",
                fontFamily: "var(--font-outfit)",
              }}
              whileHover={{ scale: 1.02, backgroundColor: "#C0002A" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {isFree ? "Claim My Free Order 🎉" : "Start Shopping 🛍️"}
            </m.button>
          </div>
        </m.div>
      </m.div>

      {/* Confetti keyframes */}
      <style>{`
        @keyframes confetti-fall {
          0%   { opacity: 1; transform: translate(0, 0) rotate(0deg); }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) rotate(var(--rot)); }
        }
      `}</style>
    </>
  );
}
