"use client";

import React, { useState } from "react";
import { MapPin, CheckCircle2, Truck, AlertCircle } from "lucide-react";

export function ProductPincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [deliveryDate, setDeliveryDate] = useState("");

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      setStatus("error");
      return;
    }

    // Calculate delivery date 3-4 days ahead
    const date = new Date();
    date.setDate(date.getDate() + 3);
    const options: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric", month: "short" };
    const formatted = date.toLocaleDateString("en-IN", options);

    setDeliveryDate(formatted);
    setStatus("success");
  };

  return (
    <div className="my-5 pt-4 border-t border-gray-100">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-4 h-4 text-gray-700" />
        <span className="text-xs font-bold text-gray-900">Check Delivery & COD Availability</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value.replace(/\D/g, ""));
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="Enter 6-digit Pincode"
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-gray-900 font-medium placeholder:text-gray-400 bg-white"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors shrink-0"
        >
          Check
        </button>
      </form>

      {status === "success" && (
        <div className="mt-2.5 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-100 text-xs text-emerald-800 flex items-start gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          <div className="leading-snug">
            <span className="font-bold">Estimated Delivery by {deliveryDate}</span>
            <p className="text-[11px] text-emerald-700 mt-0.5">
              ✓ Free Express Shipping &nbsp;•&nbsp; ✓ Cash on Delivery Available
            </p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="mt-2 text-[11px] text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Please enter a valid 6-digit Indian pincode.</span>
        </div>
      )}
    </div>
  );
}
