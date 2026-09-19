import type { Metadata } from "next";
import { Outfit, Caveat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/context/CartContext";
import { SiteShell } from "@/components/layout/SiteShell";
import { LazyMotion, domAnimation } from "framer-motion";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rangbareilly | Artificial Jewelry Online",
  description: "High-converting e-commerce store for Rangbareilly.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${caveat.variable} antialiased min-h-screen flex flex-col bg-rangbareilly-background`}>
        <LazyMotion features={domAnimation}>
          <CartProvider>
            <SiteShell />
            <main className="flex-grow">{children}</main>
          </CartProvider>
        </LazyMotion>
      </body>
    </html>
  );
}
