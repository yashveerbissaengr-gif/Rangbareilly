"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const reels = [
  {
    url: "https://www.instagram.com/rangbareilly/reel/DZj2LkzPNsi/",
    embedUrl: "https://www.instagram.com/p/DZj2LkzPNsi/embed/",
    id: "DZj2LkzPNsi",
  },
  {
    url: "https://www.instagram.com/rangbareilly/reel/DbibT9ONeOf/",
    embedUrl: "https://www.instagram.com/p/DbibT9ONeOf/embed/",
    id: "DbibT9ONeOf",
  },
  {
    url: "https://www.instagram.com/rangbareilly/reel/DamnT3bvfOY/",
    embedUrl: "https://www.instagram.com/p/DamnT3bvfOY/embed/",
    id: "DamnT3bvfOY",
  },
  {
    url: "https://www.instagram.com/rangbareilly/reel/DbKxYOePaQu/",
    embedUrl: "https://www.instagram.com/p/DbKxYOePaQu/embed/",
    id: "DbKxYOePaQu",
  },
  {
    url: "https://www.instagram.com/rangbareilly/reel/DaSUQzlPUev/",
    embedUrl: "https://www.instagram.com/p/DaSUQzlPUev/embed/",
    id: "DaSUQzlPUev",
  },
];

export const InstagramReels = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  const handleLoad = (id: string) => {
    setLoaded((prev) => ({ ...prev, [id]: true }));
  };

  // Auto-scroll on mobile (subtle nudge to show more reels)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      el.scrollBy({ left: 60, behavior: "smooth" });
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-4">


        {/* Reels Scroll Row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide snap-x justify-center md:justify-start"
          style={{ scrollBehavior: "smooth" }}
        >
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="shrink-0 snap-center relative rounded-2xl overflow-hidden shadow-md bg-black group"
              style={{ width: "220px", height: "390px" }}
            >
              {/* Skeleton loader */}
              {!loaded[reel.id] && (
                <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                  <div className="w-8 h-8 rounded-full border-2 border-[#E63956] border-t-transparent animate-spin" />
                </div>
              )}

              {/* 
                Avoid huge scaling to keep the native play button small.
                We use negative margins to crop out the Instagram header (which has the follow button) and footer.
              */}
              <div className="absolute w-full h-full transform transition-transform duration-300 group-hover:scale-[1.03]">
                <iframe
                  src={`${reel.embedUrl}?hidecaption=true`}
                  frameBorder="0"
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  className="absolute max-w-none transition-opacity duration-300"
                  style={{
                    width: "320px",
                    height: "600px",
                    top: "-60px",
                    left: "-50px",
                    opacity: loaded[reel.id] ? 1 : 0
                  }}
                  onLoad={() => handleLoad(reel.id)}
                  title={`Instagram Reel`}
                />
              </div>

              {/* Custom Overlay - pointer-events-none allows clicks to pass through to the iframe to play the video! */}
              <div 
                className="absolute inset-0 z-20 flex flex-col justify-between p-4 pointer-events-none transition-opacity duration-300 group-hover:bg-black/10"
              >
                {/* Custom Badge with Logo - pointer-events-auto so the logo can still be clicked to visit the profile */}
                <a 
                  href={reel.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full pl-1.5 pr-3 py-1.5 w-max pointer-events-auto hover:bg-white transition-colors shadow-sm"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-white flex items-center justify-center">
                    <Image width={600} height={800} src="/logo.png" alt="Rangbareilly" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-bold text-gray-900">@rangbareilly</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
