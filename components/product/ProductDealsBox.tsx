"use client";

import React, { useState } from "react";
import { ProductDeal } from "@/lib/product-palmonas";
import { Percent, Copy, Check, Sparkles, X } from "lucide-react";

interface ProductDealsBoxProps {
  deal: ProductDeal;
}

export function ProductDealsBox({ deal }: ProductDealsBoxProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <div className="my-5 rounded-2xl bg-[#F7F9FC] border border-[#E3E8F0] p-4 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-5 h-5 rounded-full bg-[#4F46E5] text-white flex items-center justify-center text-[10px] font-bold">
          <Percent className="w-3 h-3" />
        </span>
        <h4 className="text-sm font-bold text-gray-900 tracking-wide">Deals</h4>
      </div>

      {/* Main Deal Card */}
      <div className="bg-white rounded-xl border border-gray-200/80 p-3.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
        {/* Offer ending soon tag */}
        <div className="absolute -top-2.5 left-3">
          <span className="bg-[#8B1A1A] text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-sm uppercase tracking-wider shadow-xs flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            {deal.tag}
          </span>
        </div>

        {/* Left Side: Offer Info */}
        <div className="pt-2 sm:pt-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-bold text-gray-900">
              Get this for ₹{deal.discountedPrice.toLocaleString()}
            </span>

            {/* Click to Copy Coupon */}
            <button
              type="button"
              onClick={() => handleCopy(deal.couponCode)}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-dashed border-[#10B981] bg-[#ECFDF5] text-[#065F46] font-mono text-xs font-bold hover:bg-[#D1FAE5] transition-colors cursor-pointer"
              title="Click to copy coupon code"
            >
              <span>{deal.couponCode}</span>
              {copiedCode === deal.couponCode ? (
                <Check className="w-3.5 h-3.5 text-[#059669]" />
              ) : (
                <Copy className="w-3 h-3 text-[#10B981]" />
              )}
            </button>
            {copiedCode === deal.couponCode && (
              <span className="text-[11px] font-bold text-[#059669] animate-pulse">Copied!</span>
            )}
          </div>

          <p className="text-xs text-gray-600 mt-1 font-medium">{deal.conditionText}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{deal.subNote}</p>
        </div>

        {/* Right Side: View All button */}
        <div className="shrink-0 flex items-center justify-end sm:border-l sm:border-gray-100 sm:pl-4">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="text-xs font-bold text-gray-800 hover:text-[#E63956] border border-gray-300 rounded-lg px-3 py-1.5 hover:border-gray-400 transition-colors"
          >
            View All
          </button>
        </div>
      </div>

      {/* View All Deals Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#E63956]/10 text-[#E63956] flex items-center justify-center text-xs">
                  %
                </span>
                <h3 className="text-lg font-bold text-gray-900">Available Coupons & Deals</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {deal.allDeals.map((d) => (
                <div key={d.code} className="border border-gray-200 rounded-xl p-3.5 hover:border-gray-300 transition-all bg-gray-50/50">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
                      {d.code}
                    </span>
                    <button
                      onClick={() => handleCopy(d.code)}
                      className="text-xs font-bold text-[#E63956] hover:underline flex items-center gap-1"
                    >
                      {copiedCode === d.code ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <h5 className="text-xs font-bold text-gray-900 mt-2">{d.title}</h5>
                  <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">{d.description}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-5 bg-gray-900 hover:bg-black text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
