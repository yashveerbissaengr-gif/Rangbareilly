import React from 'react';
import Link from 'next/link';

export function GenZPromoBanner() {
  return (
    <Link href="/under-299" className="block w-full overflow-hidden bg-[#1A0F11] text-[#FF4D4D] py-3 border-y-2 border-[#E63956] transform hover:scale-[1.01] transition-transform duration-300">
      <div className="whitespace-nowrap animate-marquee flex items-center space-x-8 font-black text-xl uppercase tracking-widest">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="flex items-center drop-shadow-[0_0_10px_rgba(255,77,77,0.4)]">
            <span className="text-2xl mr-4">🔥</span>
            ANY 3 FOR ₹699
            <span className="text-2xl ml-4 text-white">✨</span>
            <span className="text-white ml-8">GRAB RN</span>
          </span>
        ))}
      </div>
    </Link>
  );
}
