"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ProductVariant, CartItem, ProductImage } from "@/types";
import { shopifyFetch } from "@/lib/shopify/client";
import { getCartQuery } from "@/lib/shopify/queries";
import { createCartMutation, addToCartMutation, updateCartMutation, removeFromCartMutation } from "@/lib/shopify/mutations";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, delta: number) => Promise<void>;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartTotal: number;
  totalItems: number;
  checkoutUrl: string | null;
  isCartLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper to map Shopify Cart to our CartItem[]
function mapShopifyCart(shopifyCart: any): CartItem[] {
  if (!shopifyCart?.lines?.edges) return [];
  
  return shopifyCart.lines.edges.map((edge: any) => {
    const node = edge.node;
    const variant = node.merchandise;
    const product = variant.product;

    const frontendProduct: Product = {
      id: product.id,
      slug: product.handle,
      title: product.title,
      description: "",
      material: "",
      care: "",
      shipping: "",
      returns: "",
      price: node.quantity > 0 ? parseFloat(node.cost.totalAmount.amount) / node.quantity : parseFloat(variant.product.priceRange?.minVariantPrice?.amount || "0"), 
      collection: "",
      images: product.featuredImage ? [{ url: product.featuredImage.url, alt: product.featuredImage.altText || product.title, isPrimary: true }] : [],
      variants: [],
      rating: 5,
      reviewCount: 0,
      tags: [],
    };

    const frontendVariant: ProductVariant = {
      id: variant.id,
      name: variant.title,
      sku: "",
      priceDelta: 0,
      stock: 100
    };

    return {
      lineId: node.id,
      product: frontendProduct,
      selectedVariant: frontendVariant,
      quantity: node.quantity
    };
  }).filter((item: CartItem) => item.quantity > 0);
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isCartLoading, setIsCartLoading] = useState(true);

  // Sync with local storage and fetch actual cart from Shopify
  useEffect(() => {
    const initializeCart = async () => {
      const savedCartId = localStorage.getItem('shopify_cart_id');
      if (savedCartId) {
        setCartId(savedCartId);
        try {
          const { body } = await shopifyFetch<any>({
            query: getCartQuery,
            variables: { cartId: savedCartId },
            cache: 'no-store',
          });
          if (body.data?.cart) {
            setCart(mapShopifyCart(body.data.cart));
            setCheckoutUrl(body.data.cart.checkoutUrl);
          } else {
            localStorage.removeItem('shopify_cart_id');
            setCartId(null);
          }
        } catch (e) {
          console.error('Failed to fetch Shopify cart', e);
        }
      }
      setIsCartLoading(false);
    };
    
    initializeCart();
  }, []);

  const addToCart = async (product: Product, variant?: ProductVariant) => {
    setIsCartOpen(true);
    setIsCartLoading(true);
    
    // Optimistic UI Update
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedVariant?.id === variant?.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedVariant?.id === variant?.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, selectedVariant: variant as ProductVariant, quantity: 1 }];
    });

    const variantId = variant?.id || product.variants[0]?.id || product.id; // Fallback for simple products

    try {
      if (!cartId) {
        const { body } = await shopifyFetch<any>({
          query: createCartMutation,
          variables: { lineItems: [{ merchandiseId: variantId, quantity: 1 }] }
        });
        const newCart = body.data?.cartCreate?.cart;
        if (newCart) {
          setCartId(newCart.id);
          localStorage.setItem('shopify_cart_id', newCart.id);
          setCart(mapShopifyCart(newCart));
          setCheckoutUrl(newCart.checkoutUrl);
        }
      } else {
        const { body } = await shopifyFetch<any>({
          query: addToCartMutation,
          variables: { cartId, lines: [{ merchandiseId: variantId, quantity: 1 }] }
        });
        if (body.data?.cartLinesAdd?.cart) {
          setCart(mapShopifyCart(body.data.cartLinesAdd.cart));
          setCheckoutUrl(body.data.cartLinesAdd.cart.checkoutUrl);
        }
      }
    } catch (e) {
      console.error("Failed to add to Shopify cart", e);
    } finally {
      setIsCartLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    const itemToRemove = cart.find(item => item.product.id === productId);
    if (!itemToRemove?.lineId || !cartId) return;

    // Optimistic
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    setIsCartLoading(true);

    try {
      const { body } = await shopifyFetch<any>({
        query: removeFromCartMutation,
        variables: { cartId, lineIds: [itemToRemove.lineId] }
      });
      if (body.data?.cartLinesRemove?.cart) {
        setCart(mapShopifyCart(body.data.cartLinesRemove.cart));
        setCheckoutUrl(body.data.cartLinesRemove.cart.checkoutUrl);
      }
    } catch (e) {
      console.error("Failed to remove from Shopify cart", e);
    } finally {
      setIsCartLoading(false);
    }
  };

  const updateQuantity = async (productId: string, delta: number) => {
    const itemToUpdate = cart.find(item => item.product.id === productId);
    if (!itemToUpdate?.lineId || !cartId) return;

    const newQty = itemToUpdate.quantity + delta;

    // Optimistic
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[]
    );
    
    if (newQty <= 0) {
      await removeFromCart(productId);
      return;
    }

    setIsCartLoading(true);
    try {
      const { body } = await shopifyFetch<any>({
        query: updateCartMutation,
        variables: { cartId, lines: [{ id: itemToUpdate.lineId, quantity: newQty }] }
      });
      if (body.data?.cartLinesUpdate?.cart) {
        setCart(mapShopifyCart(body.data.cartLinesUpdate.cart));
        setCheckoutUrl(body.data.cartLinesUpdate.cart.checkoutUrl);
      }
    } catch (e) {
      console.error("Failed to update Shopify cart", e);
    } finally {
      setIsCartLoading(false);
    }
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price + (item.selectedVariant?.priceDelta || 0)) * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        totalItems,
        checkoutUrl,
        isCartLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
