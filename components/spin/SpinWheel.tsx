"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  WHEEL_SEGMENTS,
  determineResult,
  calculateTargetRotation,
  drawWheel,
} from "./wheelLogic";
import type { SpinResult } from "./types";
import { SpinResultModal } from "./SpinResultModal";

interface SpinWheelProps {
  /** Shopify order number. Order #30000, #60000, … triggers the free-order prize. */
  orderNumber: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const CANVAS_SIZE = 420; // px — intrinsic canvas resolution
const RADIUS = 195; // px — slightly inset for border/glow room
const SPIN_DURATION_MS = 5_500; // ms — total animation time
const SPIN_EASING = "cubic-bezier(0.17, 0.67, 0.12, 0.99)"; // ease-out with slight overshoot feel

// Needle height as a fraction of canvas size (drawn as a fixed overlay)
const NEEDLE_HEIGHT = CANVAS_SIZE * 0.12;
const NEEDLE_WIDTH = CANVAS_SIZE * 0.06;

export function SpinWheel({ orderNumber }: SpinWheelProps) {
  const wheelRef = useRef<HTMLCanvasElement>(null);
  const needleRef = useRef<HTMLCanvasElement>(null);

  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const currentRotation = useRef(0);
  const [result, setResult] = useState<SpinResult | null>(null);
  const [showModal, setShowModal] = useState(false);

  // ── Draw wheel on mount and whenever canvas is ready ──────────────────────
  useEffect(() => {
    const canvas = wheelRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cx = CANVAS_SIZE / 2;
    const cy = CANVAS_SIZE / 2;
    drawWheel(ctx, cx, cy, RADIUS);
  }, []);

  // ── Draw needle (fixed overlay, independent canvas) ───────────────────────
  useEffect(() => {
    const canvas = needleRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    const cx = CANVAS_SIZE / 2;
    const tipY = CANVAS_SIZE / 2 - RADIUS + 4; // sits just inside wheel edge at top

    // Shadow
    ctx.shadowColor = "rgba(0,0,0,0.4)";
    ctx.shadowBlur = 8;

    // Triangle needle
    ctx.beginPath();
    ctx.moveTo(cx, tipY);
    ctx.lineTo(cx - NEEDLE_WIDTH / 2, tipY + NEEDLE_HEIGHT);
    ctx.lineTo(cx + NEEDLE_WIDTH / 2, tipY + NEEDLE_HEIGHT);
    ctx.closePath();
    ctx.fillStyle = "#E63956";
    ctx.fill();
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.shadowColor = "transparent";

    // Small circle at needle base
    ctx.beginPath();
    ctx.arc(cx, tipY + NEEDLE_HEIGHT, NEEDLE_WIDTH * 0.55, 0, Math.PI * 2);
    ctx.fillStyle = "#E63956";
    ctx.fill();
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, []);

  // ── Spin handler ──────────────────────────────────────────────────────────
  const handleSpin = useCallback(() => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);

    // 1. Determine the result FIRST (rigged engine, before animation)
    const spinResult = determineResult(orderNumber);

    // 2. Calculate exact rotation needed
    const targetRotation = calculateTargetRotation(
      spinResult.segment,
      currentRotation.current
    );

    // 3. Apply CSS transform transition to wheel canvas
    const wheelCanvas = wheelRef.current;
    if (wheelCanvas) {
      wheelCanvas.style.transition = `transform ${SPIN_DURATION_MS}ms ${SPIN_EASING}`;
      wheelCanvas.style.transform = `rotate(${targetRotation}deg)`;
    }

    // 4. After animation completes, show result
    const timer = setTimeout(() => {
      currentRotation.current = targetRotation;
      setResult(spinResult);
      setIsSpinning(false);
      setHasSpun(true);

      // Brief pause before showing modal (let player see where needle landed)
      setTimeout(() => setShowModal(true), 600);
    }, SPIN_DURATION_MS + 100);

    return () => clearTimeout(timer);
  }, [isSpinning, hasSpun, orderNumber]);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* ── Wheel Container ─────────────────────────────────────────────── */}
      <m.div
        className="relative select-none"
        style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Outer decorative glow ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(230,57,86,0.15) 0%, transparent 70%)",
            boxShadow:
              "0 0 60px rgba(230,57,86,0.25), 0 0 120px rgba(230,57,86,0.1)",
          }}
        />

        {/* Wheel canvas — this element gets the CSS rotation applied */}
        <canvas
          ref={wheelRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="absolute inset-0 rounded-full"
          style={{
            transformOrigin: "center center",
          }}
          aria-label="Spin wheel"
        />

        {/* Decorative outer border ring */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: "6px solid #E63956",
            boxShadow: "inset 0 0 20px rgba(230,57,86,0.3)",
          }}
        />

        {/* Needle canvas — fixed, never rotates */}
        <canvas
          ref={needleRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />

        {/* Pulsing ring while spinning */}
        <AnimatePresence>
          {isSpinning && (
            <m.div
              className="absolute inset-0 rounded-full pointer-events-none"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0, 0.6, 0], scale: [1, 1.05, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
              style={{ border: "4px solid #E63956" }}
            />
          )}
        </AnimatePresence>
      </m.div>

      {/* ── Spin Button ─────────────────────────────────────────────────── */}
      <m.button
        id="spin-wheel-button"
        onClick={handleSpin}
        disabled={isSpinning || hasSpun}
        className={[
          "relative px-14 py-5 text-sm font-sans font-bold tracking-widest uppercase",
          "rounded-full transition duration-300",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E63956]",
          isSpinning || hasSpun
            ? "bg-[#7D6B6E] text-white cursor-not-allowed opacity-60"
            : "bg-[#E63956] text-white hover:bg-[#C0002A] active:scale-95",
        ].join(" ")}
        whileHover={!isSpinning && !hasSpun ? { scale: 1.04 } : {}}
        whileTap={!isSpinning && !hasSpun ? { scale: 0.97 } : {}}
        transition={{ duration: 0.2 }}
        aria-label="Spin the lucky wheel"
      >
        {/* Shimmer highlight */}
        {!isSpinning && !hasSpun && (
          <span
            className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <span
              className="absolute top-0 left-[-75%] w-1/2 h-full bg-white opacity-20 rotate-12"
              style={{
                animation: "shimmer 2.5s ease-in-out infinite",
              }}
            />
          </span>
        )}
        {isSpinning ? "Spinning…" : hasSpun ? "Spun! 🎉" : "🎡 Spin Now!"}
      </m.button>

      {/* ── Segment Legend ───────────────────────────────────────────────── */}
      <m.div
        className="grid grid-cols-3 gap-2 max-w-xs w-full px-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        aria-label="Wheel prize legend"
      >
        {WHEEL_SEGMENTS.map((seg) => (
          <div
            key={seg.id}
            className="flex items-center gap-1.5 text-xs font-sans"
            title={`${seg.label} — ${(
              (seg.endDeg - seg.startDeg) /
              3.6
            ).toFixed(0)}% of wheel`}
          >
            <span
              className="w-3 h-3 rounded-full shrink-0 border border-white/30"
              style={{ backgroundColor: seg.color }}
              aria-hidden="true"
            />
            <span className="text-[#1F1215] font-semibold truncate">
              {seg.label}
            </span>
          </div>
        ))}
      </m.div>

      {/* ── Result Modal ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showModal && result && (
          <SpinResultModal
            result={result}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Shimmer keyframes */}
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(0) rotate(12deg); }
          50%  { transform: translateX(400%) rotate(12deg); }
          100% { transform: translateX(400%) rotate(12deg); }
        }
      `}</style>
    </div>
  );
}
