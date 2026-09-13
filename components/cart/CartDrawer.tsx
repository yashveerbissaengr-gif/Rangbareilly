"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/lib/context/CartContext";

export const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal, checkoutUrl, isCartLoading } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Gamified Rewards Indicator */}
            <div className="pt-6 pb-8 px-4 bg-[#FAFAFA] border-b border-gray-100 relative overflow-hidden">
              {(() => {
                const tiers = [
                  { id: 1, amount: 600, label: "Free Shipping\non ₹600!", reward: "Free Shipping" },
                  { id: 2, amount: 699, label: "Free Gift\non ₹699!", reward: "Free Gift" },
                  { id: 3, amount: 1199, label: "Premium Gift\n₹1199!", reward: "Premium Gift" },
                ];
                
                let progressPercentage = 0;
                if (cartTotal < 600) {
                  progressPercentage = (cartTotal / 600) * 33.33;
                } else if (cartTotal >= 600 && cartTotal < 699) {
                  progressPercentage = 33.33 + ((cartTotal - 600) / (699 - 600)) * 33.33;
                } else if (cartTotal >= 699 && cartTotal < 1199) {
                  progressPercentage = 66.66 + ((cartTotal - 699) / (1199 - 699)) * 33.33;
                } else {
                  progressPercentage = 100;
                }

                const nextTier = tiers.find(t => cartTotal < t.amount);
                
                return (
                  <div className="flex flex-col items-center w-full max-w-md mx-auto">
                    {/* Top Text */}
                    <div className="text-center font-medium text-[#2C3E50] text-[15px] mb-8">
                      {nextTier ? (
                        <>Add <span className="font-extrabold">₹{nextTier.amount - cartTotal}</span> more to get <span className="font-extrabold">{nextTier.reward}</span> on this order</>
                      ) : (
                        <span className="text-[#E63956] font-extrabold">🎉 You have unlocked all rewards!</span>
                      )}
                    </div>
                    
                    {/* Progress Bar Container */}
                    <div className="relative w-full px-6">
                      {/* Background Track */}
                      <div className="absolute top-1/2 left-6 right-6 h-3 bg-[#D6DAD3] -translate-y-1/2 rounded-full" />
                      
                      {/* Filled Track */}
                      <motion.div 
                        className="absolute top-1/2 left-6 h-3 bg-[#FF8A9B] -translate-y-1/2 rounded-full z-10"
                        initial={{ width: 0 }}
                        animate={{ width: `calc(${progressPercentage}% - 3rem)` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                      
                      {/* Timeline Markers */}
                      <div className="relative z-20 flex justify-between w-full">
                        {tiers.map((tier, index) => {
                          const isReached = cartTotal >= tier.amount;
                          return (
                            <div key={tier.id} className="flex flex-col items-center w-1/3 relative">
                              {/* Circle Marker */}
                              <motion.div 
                                className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm z-20 bg-[#D6DAD3] text-[#2C3E50]"
                                animate={isReached ? { scale: [1, 1.15, 1] } : {}}
                                transition={{ duration: 0.4 }}
                              >
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    {index === 0 && (
                                      <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11M14 9h4l4 4v4c0 .6-.4 1-1 1h-2M6 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                    )}
                                    {index === 1 && (
                                      <polyline points="20 12 20 22 4 22 4 12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                                    )}
                                    {index === 2 && (
                                      <path d="M12 2l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" />
                                    )}
                                  </svg>
                              </motion.div>
                              
                              {/* Label */}
                              <div className="absolute top-14 text-center w-full">
                                <span className="text-[13px] font-medium text-[#2C3E50] whitespace-pre-line leading-relaxed">
                                  {tier.label}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {/* Spacer for labels */}
                    <div className="h-16"></div>
                  </div>
                );
              })()}
            </div>
            
            {/* Gen Z Promo Banner */}
            <div className="w-full bg-[#1A0F11] text-[#FF4D4D] py-2 overflow-hidden border-y-2 border-[#E63956]">
              <div className="whitespace-nowrap animate-marquee flex items-center space-x-8 font-black text-xs uppercase tracking-widest">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="flex items-center drop-shadow-[0_0_10px_rgba(255,77,77,0.4)]">
                    <span className="text-lg mr-2">🔥</span>
                    ANY 3 FOR ₹699
                    <span className="text-lg ml-2 text-white">✨</span>
                    <span className="text-white ml-6">GRAB RN</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Cart Items */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isCartLoading ? 'opacity-50' : ''}`}>
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                  <ShoppingBagIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white shrink-0">
                      <Image 
                        src={item.product.images[0]?.url || "/placeholder.svg"} 
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-sm text-gray-900 line-clamp-1">{item.product.title}</h3>
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-gray-400 hover:text-red-500 disabled:opacity-50"
                            disabled={isCartLoading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{item.product.collection}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                          <button 
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="p-1 hover:bg-gray-100 rounded-l-lg transition-colors disabled:opacity-50"
                            disabled={isCartLoading}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="p-1 hover:bg-gray-100 rounded-r-lg transition-colors disabled:opacity-50"
                            disabled={isCartLoading}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-bold text-sm">₹{item.product.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-gray-100 bg-white">
                <div className="flex justify-between mb-4 text-gray-900 font-bold">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <a 
                  href={checkoutUrl || "#"}
                  className={`block text-center w-full bg-[#FF6B6C] hover:bg-[#ff5254] text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm uppercase tracking-wide ${(!checkoutUrl || isCartLoading) ? "opacity-50 pointer-events-none" : ""}`}
                >
                  {isCartLoading ? "Updating..." : "Checkout"}
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Dummy component just for the empty state
const ShoppingBagIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);
