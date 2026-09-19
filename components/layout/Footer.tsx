"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);
  const policiesRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (policiesRef.current && !policiesRef.current.contains(event.target as Node)) {
        setIsPoliciesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <footer className="bg-white pt-16 pb-24 md:pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand & Newsletter */}
          <div className="md:col-span-2">
            <div className="relative h-16 w-48 mb-6">
              <Image 
                src="/logo.png" 
                alt="Rangbareilly Logo" 
                fill
                sizes="(max-width: 768px) 192px, 192px"
                className="object-contain object-left mix-blend-multiply" 
              />
            </div>
            <p className="text-gray-600 mb-6 max-w-sm">
              Subscribe to our newsletter and be the first to know about new collections and exclusive offers.
            </p>
            <form className="flex gap-2 max-w-md">
              <input 
                type="email" 
                aria-label="Email address"
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B6C] focus:ring-1 focus:ring-[#FF6B6C]"
                required
              />
              <button 
                type="submit" 
                className="bg-[#8B263E] text-white px-6 py-3 rounded-xl font-bold uppercase text-sm hover:bg-opacity-90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-600 hover:text-[#FF6B6C]">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-[#FF6B6C]">Contact Us</Link></li>
              <li><Link href="/track-order" className="text-gray-600 hover:text-[#FF6B6C]">Track Order</Link></li>
              <li><Link href="/faqs" className="text-gray-600 hover:text-[#FF6B6C]">FAQs</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 flex flex-col items-center justify-center gap-4 text-gray-500 text-sm">
          <p className="text-center">&copy; {new Date().getFullYear()} Rangbareilly. All rights reserved.</p>
          
          <div className="relative flex justify-center" ref={policiesRef}>
            <button 
              onClick={() => setIsPoliciesOpen(!isPoliciesOpen)}
              className="hover:text-[#FF6B6C] transition-colors"
            >
              Terms and Policies
            </button>
            
            {isPoliciesOpen && (
              <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 py-3 min-w-[200px] z-50">
                <ul className="flex flex-col">
                  <li>
                    <Link href="/privacy-policy" className="block px-6 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-gray-900 text-center">Privacy policy</Link>
                  </li>
                  <li>
                    <Link href="/terms" className="block px-6 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-gray-900 text-center">Terms of service</Link>
                  </li>
                  <li>
                    <Link href="/refund-policy" className="block px-6 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-gray-900 text-center">Refund policy</Link>
                  </li>
                  <li>
                    <Link href="/shipping-policy" className="block px-6 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-gray-900 text-center">Shipping policy</Link>
                  </li>
                </ul>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-gray-100 rotate-45 shadow-[4px_4px_4px_rgba(0,0,0,0.02)]"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
