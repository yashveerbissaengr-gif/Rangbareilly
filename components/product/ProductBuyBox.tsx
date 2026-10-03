"use client";

import React, { useState } from "react";
import { Product, ProductVariant } from "@/types";
import { ProductPalmonasSettings } from "@/lib/product-palmonas";
import { useCart } from "@/lib/context/CartContext";
import { ProductHighlightBadges } from "./ProductHighlightBadges";
import { ProductDealsBox } from "./ProductDealsBox";
import { ProductGiftSleeve } from "./ProductGiftSleeve";
import { ProductPincodeChecker } from "./ProductPincodeChecker";
import { ProductAccordions } from "./ProductAccordions";
import { ProductTrustBadges } from "./ProductTrustBadges";
import { 
  Star, 
  Zap, 
  CheckCircle2, 
  ShoppingBag, 
  Heart, 
  Minus, 
  Plus, 
  ShieldCheck,
  Share2
} from "lucide-react";

interface ProductBuyBoxProps {
  product: Product;
  settings: ProductPalmonasSettings;
}

export function ProductBuyBox({ product, settings }: ProductBuyBoxProps) {
  const { addToCart, checkoutUrl } = useCart();

  // Variant selection from real Shopify data
  const hasVariants = product.variants && product.variants.length > 1;
  const initialVariant = product.variants?.[0];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(initialVariant);

  const [quantity, setQuantity] = useState(1);
  const [hasGiftSleeve, setHasGiftSleeve] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [shareFeedback, setShareFeedback] = useState(false);

  // Price calculations based on selected variant
  const basePrice = selectedVariant?.price || (product.price > 0 ? product.price : 499);
  const sleeveExtra = hasGiftSleeve ? settings.giftSleeve?.price || 0 : 0;
  const activePrice = basePrice + sleeveExtra;
  const totalItemPrice = activePrice * quantity;

  // Handle Add to Cart
  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      const variantToUse: ProductVariant = selectedVariant || {
        id: product.id,
        name: "Default",
        sku: settings.sku,
        priceDelta: 0,
        price: activePrice,
        stock: 100,
      };

      for (let i = 0; i < quantity; i++) {
        await addToCart(product, variantToUse);
      }
    } catch (e) {
      console.error("Add to cart error:", e);
    } finally {
      setIsAdding(false);
    }
  };

  // Handle Buy It Now
  const handleBuyNow = async () => {
    await handleAddToCart();
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2000);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* 1. Price, MRP & Review Star Block */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-baseline gap-3">
          <span className="text-gray-400 line-through text-base sm:text-lg font-medium">
            MRP ₹ {settings.calculatedMrp.toLocaleString()}
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            ₹ {activePrice.toLocaleString()}
          </span>
          {settings.discountPercent > 0 && (
            <span className="text-xs font-extrabold text-[#E63956] bg-[#E63956]/10 px-2 py-0.5 rounded-md">
              {settings.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Reviews Pill */}
        <a
          href="#reviews-section"
          className="flex items-center gap-1.5 text-xs text-gray-700 hover:text-black transition-colors"
        >
          <div className="flex text-gray-900">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current text-gray-900" />
            ))}
          </div>
          <span className="font-semibold text-gray-500">
            ({settings.reviewCount})
          </span>
        </a>
      </div>

      {/* Sub-label */}
      <span className="text-[11px] text-gray-500 mt-1">
        Inclusive of all taxes
      </span>

      {/* 2. Product Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A1A1A] mt-3 mb-1 tracking-tight leading-tight">
        {product.title}
      </h1>

      {/* 3. Highlight Badges / Feature Pills */}
      <ProductHighlightBadges badges={settings.highlightBadges} />

      {/* 4. Social Proof Urgency Banner */}
      <div className="my-2 inline-flex items-center gap-2">
        <span className="flex items-center gap-1 text-xs font-bold text-[#E65100] bg-[#FFF3E0] px-3 py-1.5 rounded-full border border-[#FFE0B2]">
          <Zap className="w-3.5 h-3.5 fill-current text-[#E65100]" />
          <span><strong className="font-extrabold">{settings.recentSales7Days.toLocaleString()}</strong> quantity sold in last 7 days</span>
        </span>
      </div>

      {/* 5. SKU */}
      <div className="text-[11px] text-gray-500 mt-1 font-mono uppercase tracking-wider">
        SKU: {settings.sku}
      </div>

      {/* 6. Deals Card (Offer ending soon, STACK4, view all) */}
      {settings.deal?.couponCode && <ProductDealsBox deal={settings.deal} />}

      {/* 7. Stock Status */}
      <div className="flex items-center gap-2 my-2 text-xs font-bold text-emerald-800">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
        <span>In stock - ready to ship</span>
      </div>

      {/* 8. Add a gift sleeve Upsell */}
      {settings.giftSleeve?.title && (
        <ProductGiftSleeve
          giftSleeve={settings.giftSleeve}
          isSelected={hasGiftSleeve}
          onToggle={setHasGiftSleeve}
        />
      )}

      {/* 9. Variant Selector from Shopify Data */}
      {hasVariants && (
        <div className="my-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
              VARIANT: <span className="text-black font-extrabold">{selectedVariant?.name}</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {product.variants!.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => setSelectedVariant(variant)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  selectedVariant?.id === variant.id
                    ? "border-black bg-black text-white shadow-xs"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 11. Quantity and Action Buttons */}
      <div className="my-5 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center border border-gray-300 rounded-full bg-white px-2 py-1 shrink-0">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-bold text-gray-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex-grow py-3.5 px-6 rounded-full bg-[#1F1215] hover:bg-[#341F23] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isAdding ? "Adding to Cart..." : `ADD TO CART • ₹${totalItemPrice.toLocaleString()}`}</span>
          </button>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="w-12 h-12 rounded-full border border-gray-200 hover:border-gray-300 bg-white flex items-center justify-center text-gray-600 transition-colors shrink-0 shadow-2xs hover:scale-105"
            aria-label="Add to wishlist"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isWishlisted
                  ? "fill-[#E63956] text-[#E63956]"
                  : "text-gray-400 hover:text-[#E63956]"
              }`}
            />
          </button>
        </div>

        {/* Buy It Now (Instant Checkout) */}
        <button
          type="button"
          onClick={handleBuyNow}
          className="w-full py-3.5 px-6 rounded-full bg-[#E63956] hover:bg-[#cf2f49] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>BUY IT NOW (⚡ FAST CHECKOUT)</span>
        </button>

        {/* Share Link */}
        <div className="flex items-center justify-center mt-1">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors py-1 px-3"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{shareFeedback ? "Link Copied! ✓" : "Share this piece"}</span>
          </button>
        </div>
      </div>

      {/* 12. Pincode Delivery Estimator */}
      <ProductPincodeChecker />

      {/* 13. Accordions (Description, Specification, Supplier Information, Returns) */}
      <ProductAccordions
        descriptionHtml={settings.descriptionHtml}
        specs={settings.specs}
        supplierInfo={settings.supplierInfo}
        returnsInfo={settings.returnsInfo}
      />

      {/* 14. Value Proposition / Trust Guarantees (Warm Beige Box) */}
      <ProductTrustBadges finishLabel={selectedVariant?.name || "Premium"} />
    </div>
  );
}
