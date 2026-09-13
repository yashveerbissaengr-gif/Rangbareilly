"use client";

import React, { useState } from "react";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  { id: 1, name: "Priya S.", rating: 5, text: "The quality of the viral hand stack is amazing! Looks exactly like the pictures." },
  { id: 2, name: "Anjali K.", rating: 5, text: "Fast shipping and the packaging was so cute. Highly recommend the earrings." },
  { id: 3, name: "Riya M.", rating: 4, text: "Beautiful designs. Will definitely be buying more from Rangbareilly." }
];

const faqs = [
  { question: "How can I track my order?", answer: "Once your order is shipped, you will receive an email with the tracking link. You can also track it from the 'Track Order' section in the menu." },
  { question: "Do you offer refunds or exchanges?", answer: "Yes, we offer a 7-day return and exchange policy for unworn items in their original packaging." },
  { question: "Is COD (Cash on Delivery) available?", answer: "Yes, we offer Cash on Delivery across most pin codes in India." },
  { question: "How long does shipping take?", answer: "Standard shipping usually takes 7-10 business days." }
];

export const ReviewsSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-16 bg-[#FAFAFA]">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Reviews */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-tight mb-2">
              Loved By Thousands
            </h2>
            <div className="flex justify-center items-center gap-1 text-[#FF6B6C]">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <span className="text-gray-600 text-sm ml-2 font-medium">4.9/5 Average Rating</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-3 text-[#FF6B6C]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4 text-sm">&quot;{review.text}&quot;</p>
                <p className="font-bold text-gray-900 text-sm">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-4 text-gray-600 text-sm"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
