"use client";

import React from "react";
import Link from "next/link";
import { m as motion, AnimatePresence } from "framer-motion";
import {
  X,
  Home,
  ShoppingBag,
  Gem,
  Tag,
  Info,
  Phone,
  FileText,
  Truck,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/lib/context/CartContext";

interface MobileMenuSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "All Products", icon: Gem },
];

const priceLinks = [
  { href: "/under-499", label: "Under ₹499", icon: Tag },
  { href: "/under-399", label: "Under ₹399", icon: Tag },
  { href: "/under-299", label: "Under ₹299", icon: Tag },
  { href: "/under-199", label: "Under ₹199", icon: Tag },
];

const categoryLinks = [
  { href: "/category/rings", label: "Rings" },
  { href: "/category/earrings", label: "Earrings" },
  { href: "/category/bracelets", label: "Bracelets" },
  { href: "/category/necklace", label: "Necklace" },
  { href: "/category/bag-charms", label: "Bag Charms" },
  { href: "/category/stainless-steel", label: "Stainless Steel" },
  { href: "/category/arm-cuffs", label: "Arm Cuffs" },
];

const infoLinks = [
  { href: "/about", label: "About Us", icon: Info },
  { href: "/contact", label: "Contact", icon: Phone },
  { href: "/privacy-policy", label: "Privacy Policy", icon: FileText },
  { href: "/shipping-policy", label: "Shipping Policy", icon: Truck },
  { href: "/refund-policy", label: "Refund Policy", icon: RefreshCw },
  { href: "/terms", label: "Terms & Conditions", icon: FileText },
];

export const MobileMenuSidebar = ({ isOpen, onClose }: MobileMenuSidebarProps) => {
  const { cart, setIsCartOpen } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCartClick = () => {
    onClose();
    setIsCartOpen(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-black z-50"
          />

          {/* Sidebar Panel */}
          <motion.aside
            key="sidebar-panel"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-[80vw] max-w-xs bg-white z-[60] flex flex-col shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(230,57,86,0.12)] bg-gradient-to-r from-[#E63956]/8 to-transparent">
              <span className="font-bold text-[#1F1215] tracking-wide text-base font-[var(--font-outfit)]">
                Rangbareilly
              </span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 rounded-full hover:bg-[#E63956]/10 text-[#7D6B6E] hover:text-[#E63956] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Quick Action */}
            <button
              onClick={handleCartClick}
              className="mx-4 mt-4 flex items-center justify-between px-4 py-3 rounded-2xl bg-[#E63956] text-white shadow-[0_4px_20px_rgba(230,57,86,0.35)] active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" />
                <span className="font-bold text-sm">My Cart</span>
              </div>
              {totalItems > 0 && (
                <span className="bg-white text-[#E63956] text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItems} items
                </span>
              )}
            </button>

            {/* Main Nav */}
            <div className="px-4 mt-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#7D6B6E] px-2 mb-2">
                Navigate
              </p>
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#E63956]/8 text-[#1F1215] hover:text-[#E63956] transition group"
                >
                  <Icon className="w-4 h-4 text-[#E63956]/70 group-hover:text-[#E63956]" />
                  <span className="font-semibold text-sm">{label}</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-30 group-hover:opacity-70" />
                </Link>
              ))}
            </div>

            {/* Price Categories */}
            <div className="px-4 mt-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#7D6B6E] px-2 mb-2">
                Shop by Price
              </p>
              {priceLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#E63956]/8 text-[#1F1215] hover:text-[#E63956] transition group"
                >
                  <Icon className="w-4 h-4 text-[#E63956]/70 group-hover:text-[#E63956]" />
                  <span className="font-semibold text-sm">{label}</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-30 group-hover:opacity-70" />
                </Link>
              ))}
            </div>

            {/* Categories */}
            <div className="px-4 mt-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#7D6B6E] px-2 mb-2">
                Categories
              </p>
              <div className="flex flex-wrap gap-2 px-2">
                {categoryLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full border border-[rgba(230,57,86,0.2)] text-[#7D6B6E] hover:border-[#E63956] hover:text-[#E63956] hover:bg-[#E63956]/5 transition"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Info Links */}
            <div className="px-4 mt-5 mb-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#7D6B6E] px-2 mb-2">
                Info
              </p>
              {infoLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[#7D6B6E] hover:text-[#1F1215] transition text-sm"
                >
                  <Icon className="w-4 h-4 opacity-60" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-auto px-5 py-4 border-t border-gray-100 text-center">
              <p className="text-[11px] text-[#7D6B6E]">
                ✨ Artificial Jewelry · Rangbareilly, India
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
