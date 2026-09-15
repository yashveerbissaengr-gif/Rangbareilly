"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2, Check } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const passwordStrength = (p: string) => {
    if (p.length === 0) return 0;
    if (p.length < 6) return 1;
    if (p.length < 8) return 2;
    return /[A-Z]/.test(p) && /[0-9]/.test(p) ? 4 : 3;
  };
  const strength = passwordStrength(form.password);
  const strengthLabels = ["", "Too short", "Weak", "Good", "Strong"];
  const strengthColors = ["", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 5) {
      setError("Password must be at least 5 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed. Please try again.");
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
              <Image src="/logo.png" alt="Rangbareilly" fill className="object-contain mix-blend-multiply" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#1F1215] tracking-tight">Create Account</h1>
            <p className="text-sm text-[#7D6B6E] mt-1">Join Rangbareilly for exclusive deals ✨</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name Row */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-bold text-[#1F1215] mb-1.5 uppercase tracking-wide">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7D6B6E]" />
                  <input
                    type="text" name="firstName" value={form.firstName} onChange={handleChange}
                    required placeholder="Priya"
                    className="w-full pl-9 pr-3 py-3 rounded-xl border border-[rgba(230,57,86,0.2)] bg-[#fafafa] text-[#1F1215] text-sm placeholder:text-[#bbb] focus:outline-none focus:border-[#E63956] focus:ring-2 focus:ring-[#E63956]/10 transition-all"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-[#1F1215] mb-1.5 uppercase tracking-wide">Last Name</label>
                <input
                  type="text" name="lastName" value={form.lastName} onChange={handleChange}
                  required placeholder="Sharma"
                  className="w-full px-3 py-3 rounded-xl border border-[rgba(230,57,86,0.2)] bg-[#fafafa] text-[#1F1215] text-sm placeholder:text-[#bbb] focus:outline-none focus:border-[#E63956] focus:ring-2 focus:ring-[#E63956]/10 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[#1F1215] mb-1.5 uppercase tracking-wide">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7D6B6E]" />
                <input
                  type="email" name="email" value={form.email} onChange={handleChange}
                  required placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[rgba(230,57,86,0.2)] bg-[#fafafa] text-[#1F1215] text-sm placeholder:text-[#bbb] focus:outline-none focus:border-[#E63956] focus:ring-2 focus:ring-[#E63956]/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-[#1F1215] mb-1.5 uppercase tracking-wide">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7D6B6E]" />
                <input
                  type={showPass ? "text" : "password"} name="password" value={form.password} onChange={handleChange}
                  required placeholder="Min. 5 characters"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-[rgba(230,57,86,0.2)] bg-[#fafafa] text-[#1F1215] text-sm placeholder:text-[#bbb] focus:outline-none focus:border-[#E63956] focus:ring-2 focus:ring-[#E63956]/10 transition-all"
                />
                <button type="button" onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7D6B6E] hover:text-[#E63956] transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Strength meter */}
              {form.password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColors[strength] : "bg-gray-100"}`} />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-[#7D6B6E]">{strengthLabels[strength]}</span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-[#1F1215] mb-1.5 uppercase tracking-wide">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7D6B6E]" />
                <input
                  type={showPass ? "text" : "password"} name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                  required placeholder="Re-enter password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-[rgba(230,57,86,0.2)] bg-[#fafafa] text-[#1F1215] text-sm placeholder:text-[#bbb] focus:outline-none focus:border-[#E63956] focus:ring-2 focus:ring-[#E63956]/10 transition-all"
                />
                {form.confirmPassword && (
                  <div className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${form.password === form.confirmPassword ? "text-green-500" : "text-red-400"}`}>
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#E63956] to-[#FF4D4D] text-white font-extrabold text-sm uppercase tracking-wide shadow-[0_6px_20px_rgba(230,57,86,0.35)] hover:shadow-[0_8px_28px_rgba(230,57,86,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-[#7D6B6E]">OR</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <p className="text-center text-sm text-[#7D6B6E]">
            Already have an account?{" "}
            <Link href="/account/login" className="text-[#E63956] font-bold hover:underline">Sign In</Link>
          </p>
        </div>

        <p className="text-center mt-5 text-xs text-[#7D6B6E]">
          <Link href="/" className="hover:text-[#E63956] transition-colors">← Back to Shopping</Link>
        </p>
      </div>
    </div>
  );
}
