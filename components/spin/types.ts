/**
 * Represents a single segment on the visual spin wheel.
 * startDeg and endDeg are measured clockwise from 12-o'clock (top).
 */
export interface SpinSegment {
  /** Unique identifier for this segment */
  id: string;
  /** Display label on the wheel */
  label: string;
  /** Start angle in degrees (0 = 12 o'clock, clockwise) */
  startDeg: number;
  /** End angle in degrees */
  endDeg: number;
  /** Primary fill color for this segment */
  color: string;
  /** Text color for this segment */
  textColor: string;
  /** Discount fraction (0.10 = 10% off, 1.0 = 100% free) */
  discount: number;
  /** Whether this result can actually be awarded by the rigged engine */
  awardable: boolean;
}

/** The determined outcome of a spin */
export interface SpinResult {
  /** The winning segment */
  segment: SpinSegment;
  /** The coupon code to show the customer */
  couponCode: string;
  /** Order number this result is for */
  orderNumber: number;
  /** Whether this is a free-order win */
  isFreeOrder: boolean;
}
