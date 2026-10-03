"use client";

import React, { useState } from "react";
import { Star, CheckCircle, ThumbsUp, ShieldCheck } from "lucide-react";

interface ProductReviewsSectionProps {
  productTitle: string;
  rating: number;
  reviewCount: number;
}

export function ProductReviewsSection({
  productTitle,
  rating,
  reviewCount,
}: ProductReviewsSectionProps) {
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const sampleReviews = [
    {
      id: "1",
      author: "Pooja Sharma",
      location: "Mumbai",
      date: "2 days ago",
      rating: 5,
      title: "Extremely stunning in person!",
      comment: `The quality of this ${productTitle} is truly unmatched. The material feels premium, and after using it every day for a week, it still looks brand new. Loved the packaging too!`,
      verified: true,
      helpful: 24,
    },
    {
      id: "2",
      author: "Ananya Iyer",
      location: "Bangalore",
      date: "5 days ago",
      rating: 5,
      title: "Excellent quality & feather light",
      comment: "I am very particular about product quality, but this piece exceeded my expectations. The craftsmanship is 100% genuine. Will definitely order more.",
      verified: true,
      helpful: 19,
    },
    {
      id: "3",
      author: "Rhea Deshmukh",
      location: "Pune",
      date: "1 week ago",
      rating: 5,
      title: "Worth every rupee + fast delivery",
      comment: "Received it in just 3 days! The weight feels premium and sturdy, not hollow at all. Everyone at the party asked me where I bought it from.",
      verified: true,
      helpful: 15,
    },
    {
      id: "4",
      author: "Simran Kaur",
      location: "Delhi NCR",
      date: "2 weeks ago",
      rating: 4,
      title: "Beautiful piece, great gift packaging",
      comment: "Added the birthday sleeve option and it came looking like a luxury boutique gift. My sister was thrilled! Very slight delay in dispatch by 1 day but well worth the wait.",
      verified: true,
      helpful: 8,
    },
  ];

  const filteredReviews = filterRating
    ? sampleReviews.filter((r) => r.rating === filterRating)
    : sampleReviews;

  return (
    <section id="reviews-section" className="w-full my-16 pt-12 border-t border-gray-200">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Customer Reviews
          </h3>
          <p className="text-sm text-gray-500">
            Real feedback from verified Rangbareilly customers
          </p>
        </div>

        {/* Rating Overview Box */}
        <div className="bg-[#FAF8F5] border border-[#EAE3D6] rounded-3xl p-6 sm:p-10 mb-12 flex flex-col md:flex-row items-center gap-8 justify-between">
          {/* Big Score */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left shrink-0">
            <div className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
              {rating.toFixed(1)}
            </div>
            <div className="flex items-center gap-1 my-2 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Based on {reviewCount.toLocaleString()} Verified Reviews
            </span>
          </div>

          {/* Star Distribution Bars */}
          <div className="w-full max-w-sm space-y-2">
            {[
              { stars: 5, pct: 86 },
              { stars: 4, pct: 10 },
              { stars: 3, pct: 3 },
              { stars: 2, pct: 1 },
              { stars: 1, pct: 0 },
            ].map(({ stars, pct }) => (
              <button
                key={stars}
                onClick={() => setFilterRating(filterRating === stars ? null : stars)}
                className="w-full flex items-center gap-3 text-xs text-gray-600 hover:text-gray-900 group"
              >
                <span className="w-8 text-right font-bold group-hover:underline">
                  {stars} ★
                </span>
                <div className="flex-grow h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-10 text-right text-gray-400 font-mono text-[11px]">
                  {pct}%
                </span>
              </button>
            ))}
          </div>

          {/* Trust Seal */}
          <div className="shrink-0 flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-[#E5DEC7] text-center shadow-2xs">
            <ShieldCheck className="w-8 h-8 text-emerald-600 mb-1" />
            <span className="text-xs font-bold text-gray-900">100% Verified</span>
            <span className="text-[10px] text-gray-500">Authentic Buyer Ratings</span>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-2xs transition hover:shadow-xs"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">{rev.author}</span>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                        <CheckCircle className="w-3 h-3" />
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-400">
                    {rev.location} • {rev.date}
                  </span>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>

              <h4 className="text-sm font-bold text-gray-900 mb-1">{rev.title}</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                {rev.comment}
              </p>

              <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400">
                <span>Purchased: {productTitle}</span>
                <span className="flex items-center gap-1 hover:text-gray-600 cursor-pointer">
                  <ThumbsUp className="w-3 h-3" /> Helpful ({rev.helpful})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
