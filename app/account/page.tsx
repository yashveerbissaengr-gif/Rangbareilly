"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingBag, MapPin, Heart, LogOut,
  ChevronRight, Package, Clock, CheckCircle2, Truck, Loader2,
} from "lucide-react";

type Address = {
  id: string; firstName: string; lastName: string;
  address1: string; address2?: string; city: string;
  province: string; zip: string; country: string; phone?: string;
};

type OrderItem = {
  title: string; quantity: number;
  variant?: { image?: { url: string; altText?: string }; price: { amount: string; currencyCode: string } };
};

type Order = {
  id: string; orderNumber: number; processedAt: string;
  financialStatus: string; fulfillmentStatus: string;
  currentTotalPrice: { amount: string; currencyCode: string };
  lineItems: { edges: { node: OrderItem }[] };
};

type Customer = {
  id: string; firstName: string; lastName: string; email: string;
  phone?: string; createdAt: string;
  defaultAddress?: Address;
  addresses: { edges: { node: Address }[] };
  orders: { edges: { node: Order }[] };
};

const statusIcon: Record<string, React.ReactNode> = {
  FULFILLED: <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />,
  IN_PROGRESS: <Truck className="w-3.5 h-3.5 text-blue-500" />,
  UNFULFILLED: <Clock className="w-3.5 h-3.5 text-orange-400" />,
};

const statusLabel: Record<string, string> = {
  FULFILLED: "Delivered",
  IN_PROGRESS: "Shipped",
  UNFULFILLED: "Processing",
};

type Tab = "orders" | "addresses" | "profile";

export default function AccountPage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("orders");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    const controller = new AbortController();

    void fetch("/api/auth/me", { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
        return r.json();
      })
      .then(({ customer }) => {
        if (!isCurrent) return;
        if (!customer) {
          window.location.assign("/account/login");
        } else {
          setCustomer(customer);
        }
      })
      .catch((err) => {
        if (!isCurrent || err.name === 'AbortError') return;
        window.location.assign("/account/login");
      })
      .finally(() => {
        if (isCurrent) setLoading(false);
      });

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff5f6]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#E63956] border-t-transparent animate-spin" />
          <p className="text-sm text-[#7D6B6E]">Loading your account…</p>
        </div>
      </div>
    );
  }

  if (!customer) return null;

  const orders = customer.orders.edges.map((e) => e.node);
  const addresses = customer.addresses.edges.map((e) => e.node);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff0f2] via-white to-white pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#E63956] to-[#FF4D4D] text-white px-4 py-8">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-extrabold border-2 border-white/40">
              {customer.firstName?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-medium opacity-80 uppercase tracking-wider">Welcome back</p>
              <h1 className="text-xl font-extrabold">{customer.firstName} {customer.lastName}</h1>
              <p className="text-xs opacity-70 mt-0.5">{customer.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-3 py-2 rounded-full text-xs font-bold transition"
          >
            {loggingOut ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6 max-w-3xl">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: <ShoppingBag className="w-5 h-5" />, label: "Orders", value: orders.length },
            { icon: <MapPin className="w-5 h-5" />, label: "Addresses", value: addresses.length },
            { icon: <Heart className="w-5 h-5" />, label: "Wishlist", value: "—" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-[rgba(230,57,86,0.07)]">
              <div className="flex justify-center text-[#E63956] mb-1">{stat.icon}</div>
              <p className="text-xl font-extrabold text-[#1F1215]">{stat.value}</p>
              <p className="text-[11px] text-[#7D6B6E] font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-[#f5f0f1] rounded-2xl mb-6">
          {(["orders", "addresses", "profile"] as Tab[]).map((t) => (
            <button
              key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wide rounded-xl transition ${
                tab === t
                  ? "bg-white text-[#E63956] shadow-sm"
                  : "text-[#7D6B6E] hover:text-[#1F1215]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {tab === "orders" && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <Package className="w-12 h-12 text-[#E63956]/30 mx-auto mb-3" />
                <p className="font-bold text-[#1F1215]">No orders yet</p>
                <p className="text-sm text-[#7D6B6E] mt-1">When you place an order, it&apos;ll appear here.</p>
                <Link href="/products"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#E63956] border border-[#E63956]/30 px-4 py-2 rounded-full hover:bg-[#E63956] hover:text-white transition">
                  Shop Now <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              orders.map((order) => {
                const items = order.lineItems.edges.map((e) => e.node);
                const statusKey = order.fulfillmentStatus || "UNFULFILLED";
                return (
                  <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm border border-[rgba(230,57,86,0.07)]">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-extrabold text-[#1F1215] text-sm">Order #{order.orderNumber}</p>
                        <p className="text-[11px] text-[#7D6B6E] mt-0.5">
                          {new Date(order.processedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-full">
                        {statusIcon[statusKey] || <Clock className="w-3.5 h-3.5 text-gray-400" />}
                        <span className="text-[11px] font-bold text-[#1F1215]">
                          {statusLabel[statusKey] || statusKey}
                        </span>
                      </div>
                    </div>
                    {/* Items */}
                    <div className="flex gap-2 flex-wrap mb-3">
                      {items.slice(0, 3).map((item) => (
                        <div key={item.variant?.id || item.title} className="flex items-center gap-2 bg-[#fafafa] rounded-xl px-2 py-1.5 text-xs">
                          {item.variant?.image && (
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0">
                              <Image src={item.variant.image.url} alt={item.variant.image.altText || item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                            </div>
                          )}
                          <span className="text-[#1F1215] font-medium max-w-[120px] truncate">{item.title}</span>
                          <span className="text-[#7D6B6E]">×{item.quantity}</span>
                        </div>
                      ))}
                      {items.length > 3 && <span className="text-xs text-[#7D6B6E] self-center">+{items.length - 3} more</span>}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-[#7D6B6E]">{order.financialStatus}</span>
                      <span className="font-extrabold text-[#E63956] text-sm">
                        ₹{parseFloat(order.currentTotalPrice.amount).toFixed(0)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Addresses Tab */}
        {tab === "addresses" && (
          <div className="space-y-4">
            {addresses.length === 0 ? (
              <div className="text-center py-16">
                <MapPin className="w-12 h-12 text-[#E63956]/30 mx-auto mb-3" />
                <p className="font-bold text-[#1F1215]">No saved addresses</p>
                <p className="text-sm text-[#7D6B6E] mt-1">Your addresses will appear here after your first order.</p>
              </div>
            ) : (
              addresses.map((addr) => (
                <div key={addr.id} className="bg-white rounded-2xl p-5 shadow-sm border border-[rgba(230,57,86,0.07)]">
                  {addr.id === customer.defaultAddress?.id && (
                    <span className="text-[10px] font-extrabold text-[#E63956] uppercase tracking-widest bg-[#E63956]/10 px-2 py-0.5 rounded-full mb-2 inline-block">
                      Default
                    </span>
                  )}
                  <p className="font-bold text-[#1F1215] text-sm">{addr.firstName} {addr.lastName}</p>
                  <p className="text-sm text-[#7D6B6E] mt-1 leading-relaxed">
                    {addr.address1}{addr.address2 ? `, ${addr.address2}` : ""}<br />
                    {addr.city}, {addr.province} {addr.zip}<br />
                    {addr.country}
                  </p>
                  {addr.phone && <p className="text-xs text-[#7D6B6E] mt-1">{addr.phone}</p>}
                </div>
              ))
            )}
          </div>
        )}

        {/* Profile Tab */}
        {tab === "profile" && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[rgba(230,57,86,0.07)] space-y-4">
            {[
              { label: "First Name", value: customer.firstName },
              { label: "Last Name", value: customer.lastName },
              { label: "Email", value: customer.email },
              { label: "Phone", value: customer.phone || "Not added" },
              { label: "Member Since", value: new Date(customer.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) },
            ].map((field) => (
              <div key={field.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <span className="text-xs font-bold text-[#7D6B6E] uppercase tracking-wide">{field.label}</span>
                <span className="text-sm font-semibold text-[#1F1215]">{field.value}</span>
              </div>
            ))}
            <div className="pt-2">
              <a
                href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/account`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#E63956]/30 text-[#E63956] text-sm font-bold hover:bg-[#E63956] hover:text-white transition"
              >
                Edit Profile on Shopify <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
