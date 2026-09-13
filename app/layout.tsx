import type { Metadata } from "next";
import { Outfit, Caveat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { MobileFooterNav } from "@/components/layout/MobileFooterNav";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
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
            <TopBar />
            <Header />
            <main className="flex-grow">{children}</main>
            <MobileFooterNav />
            <CartDrawer />
            <WhatsAppButton />
          </CartProvider>
        </LazyMotion>
      </body>
    </html>
  );
}
