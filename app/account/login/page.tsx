"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed. Please try again.");
      } else {
        router.push("/account");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff0f2] via-white to-[#fff5f0] px-4 py-12">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-[0_8px_60px_rgba(230,57,86,0.1)] border border-[rgba(230,57,86,0.08)] px-8 py-10">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative h-16 w-16 mb-3">
              <Image src="/logo.png" alt="Rangbareilly" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain mix-blend-multiply" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#1F1215] tracking-tight">Welcome back</h1>
            <p className="text-sm text-[#7D6B6E] mt-1">Sign in to your Rangbareilly account</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-[#1F1215] mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7D6B6E]" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[rgba(230,57,86,0.2)] bg-[#fafafa] text-[#1F1215] text-sm placeholder:text-[#bbb] focus:outline-none focus:border-[#E63956] focus:ring-2 focus:ring-[#E63956]/10 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-bold text-[#1F1215] uppercase tracking-wide">
                  Password
                </label>
                <Link href="/account/forgot-password" className="text-xs text-[#E63956] hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7D6B6E]" />
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-[rgba(230,57,86,0.2)] bg-[#fafafa] text-[#1F1215] text-sm placeholder:text-[#bbb] focus:outline-none focus:border-[#E63956] focus:ring-2 focus:ring-[#E63956]/10 transition"
                />
                <button
                  type="button"
                  aria-label={showPass ? "Hide password" : "Show password"}
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7D6B6E] hover:text-[#E63956] transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#E63956] to-[#FF4D4D] text-white font-extrabold text-sm uppercase tracking-wide shadow-[0_6px_20px_rgba(230,57,86,0.35)] hover:shadow-[0_8px_28px_rgba(230,57,86,0.5)] hover:-translate-y-0.5 active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-[#7D6B6E]">OR</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-[#7D6B6E]">
            Don&apos;t have an account?{" "}
            <Link href="/account/signup" className="text-[#E63956] font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </div>

        {/* Back to shop */}
        <p className="text-center mt-5 text-xs text-[#7D6B6E]">
          <Link href="/" className="hover:text-[#E63956] transition-colors">
            ← Back to Shopping
          </Link>
        </p>
      </div>
    </div>
  );
}
