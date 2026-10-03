"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types";

interface WishlistContextType {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
const STORAGE_KEY = "rangbareilly_wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let restoredWishlist: Product[] = [];
    let isMounted = true;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          restoredWishlist = parsed.filter((item): item is Product => item && typeof item.id === "string");
        }
      }
    } catch {
      restoredWishlist = [];
    }

    queueMicrotask(() => {
      if (!isMounted) return;
      setWishlist(restoredWishlist);
      setIsInitialized(true);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // Keep the in-memory wishlist usable when browser storage is unavailable.
    }
  }, [wishlist, isInitialized]);

  const toggleWishlist = (product: Product) => {
    setWishlist((current) => current.some((item) => item.id === product.id)
      ? current.filter((item) => item.id !== product.id)
      : [...current, product]);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}