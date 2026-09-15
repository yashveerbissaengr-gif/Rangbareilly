/**
 * wheelLogic.ts
 *
 * Pure functions that define the spin wheel's segment layout and the
 * rigged result-selection engine. No React, no side effects.
 *
 * VISUAL vs LOGICAL SEPARATION
 * ============================
 * Visual layout (what the customer sees — ALL EQUAL, fair-looking):
 *   Each of the 6 segments occupies exactly 60° (360° ÷ 6).
 *   Every prize looks equally likely to the customer.
 *
 * Actual (rigged) award probabilities — backend logic only:
 *   80%  → 10% OFF   (normal spins)
 *   20%  → 15% OFF   (normal spins)
 *    0%  → 20% OFF   (never awarded)
 *    0%  → 50% OFF   (never awarded in normal spins)
 *  100%  → FREE      (only when orderNumber % 30_000 === 0)
 *
 * The animation lands on the VISUAL position of the winning segment.
 * Which segment wins is decided by the rigged engine BEFORE animation.
 */

import type { SpinSegment, SpinResult } from "./types";

// ─── Segment Definitions ──────────────────────────────────────────────────────
// Angles measured clockwise from 12-o'clock (top of wheel).
// ALL SEGMENTS ARE VISUALLY EQUAL: 60° each (360° ÷ 6 segments).
// The rigged probabilities live ONLY in determineResult() below.

export const WHEEL_SEGMENTS: SpinSegment[] = [
  {
    id: "10off",
    label: "10% OFF",
    startDeg: 0,
    endDeg: 60,   // equal visual slice (1/6 of wheel)
    color: "#E63956",
    textColor: "#FFFFFF",
    discount: 0.1,
    awardable: true,
  },
  {
    id: "15off",
    label: "15% OFF",
    startDeg: 60,
    endDeg: 120,  // equal visual slice
    color: "#1F1215",
    textColor: "#FFEAEA",
    discount: 0.15,
    awardable: true,
  },
  {
    id: "20off",
    label: "20% OFF",
    startDeg: 120,
    endDeg: 180,  // equal visual slice
    color: "#C0002A",
    textColor: "#FFFFFF",
    discount: 0.2,
    awardable: false,
  },
  {
    id: "50off_a",
    label: "50% OFF",
    startDeg: 180,
    endDeg: 240,  // equal visual slice
    color: "#FFD700",
    textColor: "#1F1215",
    discount: 0.5,
    awardable: false,
  },
  {
    id: "free",
    label: "FREE! 🎉",
    startDeg: 240,
    endDeg: 300,  // equal visual slice
    color: "#FF4D4D",
    textColor: "#FFFFFF",
    discount: 1.0,
    awardable: false,
  },
  {
    id: "50off_b",
    label: "50% OFF",
    startDeg: 300,
    endDeg: 360,  // equal visual slice
    color: "#FFD700",
    textColor: "#1F1215",
    discount: 0.5,
    awardable: false,
  },
];

// ─── Result Determination (Rigged Engine) ────────────────────────────────────

/**
 * Determines the spin result for a given Shopify order number.
 *
 * Rules:
 *  1. If orderNumber is a positive multiple of 30,000 → FREE ORDER.
 *  2. Otherwise 80% chance of 10% OFF, 20% chance of 15% OFF.
 *
 * @param orderNumber - The Shopify order number (integer, e.g. 1001, 30000)
 * @param seed        - Optional deterministic seed (0–1). Defaults to Math.random().
 *                      Use this in tests to get reproducible results.
 */
export function determineResult(
  orderNumber: number,
  seed: number = Math.random()
): SpinResult {
  const isFreeOrderMilestone =
    orderNumber > 0 && Number.isInteger(orderNumber) && orderNumber % 30_000 === 0;

  let winningSegment: SpinSegment;

  if (isFreeOrderMilestone) {
    winningSegment = WHEEL_SEGMENTS.find((s) => s.id === "free")!;
  } else if (seed < 0.8) {
    winningSegment = WHEEL_SEGMENTS.find((s) => s.id === "10off")!;
  } else {
    winningSegment = WHEEL_SEGMENTS.find((s) => s.id === "15off")!;
  }

  const couponCode = buildCouponCode(winningSegment, orderNumber);

  return {
    segment: winningSegment,
    couponCode,
    orderNumber,
    isFreeOrder: winningSegment.id === "free",
  };
}

// ─── Rotation Math ────────────────────────────────────────────────────────────

/**
 * Calculates the total CSS rotation (in degrees) to apply to the wheel
 * canvas so that the needle (fixed at 12-o'clock) lands inside the
 * winning segment.
 *
 * PROOF OF FORMULA
 * ----------------
 * After rotating the wheel clockwise by R°, the original wheel angle that
 * sits under the 12-o'clock needle is:
 *     needle_at = (360 - R % 360) % 360
 *
 * We want needle_at = targetAngle, so:
 *     (360 - R % 360) % 360 = targetAngle
 *     R % 360 = (360 - targetAngle) % 360
 *
 * To land on exactly targetAngle after `extraSpins` full rotations:
 *     R_new = R_current
 *           + (((360 - targetAngle) - R_current % 360) + 360) % 360
 *           + extraSpins * 360
 *
 * Edge case: if the modular residual is 0 we add 360 to guarantee
 * at least one additional full rotation (avoids a no-op tiny spin).
 *
 * @param segment       - The winning segment
 * @param currentRot    - The wheel's current cumulative rotation (degrees)
 * @param extraSpins    - Full extra rotations to add (default 6, looks great)
 * @param angleSeed     - Value 0–1 to pick position within segment. Defaults to Math.random().
 */
export function calculateTargetRotation(
  segment: SpinSegment,
  currentRot: number,
  extraSpins: number = 6,
  angleSeed: number = Math.random()
): number {
  const span = segment.endDeg - segment.startDeg;

  // Keep 15% padding from each edge so needle never sits on a boundary line
  const padding = Math.max(0.3, span * 0.15);
  const safeStart = segment.startDeg + padding;
  const safeEnd = segment.endDeg - padding;

  // Pick a random angle within the safe zone
  const targetAngle = safeStart + angleSeed * (safeEnd - safeStart);

  // Modular arithmetic — how far must we rotate from current position?
  const currentMod = currentRot % 360;
  const desiredMod = (360 - targetAngle) % 360;
  let delta = (desiredMod - currentMod + 360) % 360;

  // Guarantee at least one full extra rotation if delta is tiny
  if (delta < 45) delta += 360;

  return currentRot + extraSpins * 360 + delta;
}

// ─── Coupon Code Builder ──────────────────────────────────────────────────────

function buildCouponCode(segment: SpinSegment, orderNumber: number): string {
  const tag = {
    "10off": "SPIN10",
    "15off": "SPIN15",
    "20off": "SPIN20",
    "50off_a": "SPIN50",
    "50off_b": "SPIN50",
    free: "SPINFREE",
  }[segment.id] ?? "SPIN";

  return `${tag}-${orderNumber}`;
}

// ─── Canvas Drawing Helpers ───────────────────────────────────────────────────

const DEG_TO_RAD = Math.PI / 180;

/**
 * Converts a degree angle measured clockwise from 12-o'clock
 * to a canvas radian angle measured clockwise from 3-o'clock.
 */
export function toCanvasAngle(deg: number): number {
  return (deg - 90) * DEG_TO_RAD;
}

/**
 * Draws the complete spin wheel onto a canvas 2D context.
 *
 * @param ctx    - Canvas 2D rendering context
 * @param cx     - Centre X
 * @param cy     - Centre Y
 * @param radius - Outer radius of the wheel
 */
export function drawWheel(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number
): void {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  WHEEL_SEGMENTS.forEach((seg) => {
    const start = toCanvasAngle(seg.startDeg);
    const end = toCanvasAngle(seg.endDeg);
    const midDeg = (seg.startDeg + seg.endDeg) / 2;
    const mid = toCanvasAngle(midDeg);
    const span = seg.endDeg - seg.startDeg;

    // ── Segment fill ──
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, end);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();

    // ── Segment border ──
    ctx.strokeStyle = "#FFEAEA";
    ctx.lineWidth = 2;
    ctx.stroke();

    // ── Label ─────────────────────────────────────────────────────────────
    // Only draw text if the segment is large enough to be readable
    if (span >= 8) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(mid);

      // Left-half segments (midpoint between 90°–270° clockwise from top):
      // rotating to `mid` makes them "upside-down", so flip 180° to correct.
      // After flipping, positive x is toward the center, negative x toward rim.
      // We check using canvas angle (mid, radians from 3-o'clock, π/2 to 3π/2 = left screen half).
      const normalizedMid = ((mid % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      const isLeft = normalizedMid > Math.PI / 2 && normalizedMid < (3 * Math.PI) / 2;
      if (isLeft) {
        ctx.rotate(Math.PI);
      }

      // Text anchor: textAlign='right' means right edge at xPos, text extends inward.
      // Right-half: xPos = +textRadius (rim), text extends toward center. ✓
      // Left-half (after 180° flip): xPos = -textRadius (rim in flipped space), text extends toward center. ✓
      const textRadius = span >= 30 ? radius * 0.68 : radius * 0.75;
      const xPos = isLeft ? -textRadius : textRadius;
      ctx.textAlign = "right";
      ctx.fillStyle = seg.textColor;

      if (span >= 30) {
        ctx.font = `bold ${Math.min(18, radius * 0.09)}px 'Outfit', sans-serif`;
        const parts = seg.label.split(" ");
        if (parts.length === 2) {
          ctx.fillText(parts[0], xPos, -6);
          ctx.fillText(parts[1], xPos, 13);
        } else {
          ctx.fillText(seg.label, xPos, 4);
        }
      } else {
        ctx.font = `bold ${Math.min(11, radius * 0.06)}px 'Outfit', sans-serif`;
        ctx.fillText(seg.label, xPos, 4);
      }

      ctx.restore();
    }
  });

  // ── Centre hub ────────────────────────────────────────────────────────────
  const hubRadius = radius * 0.1;

  // Outer ring of hub
  ctx.beginPath();
  ctx.arc(cx, cy, hubRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#FFEAEA";
  ctx.fill();
  ctx.strokeStyle = "#E63956";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Inner dot
  ctx.beginPath();
  ctx.arc(cx, cy, hubRadius * 0.45, 0, Math.PI * 2);
  ctx.fillStyle = "#E63956";
  ctx.fill();
}
