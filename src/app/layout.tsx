import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Ticker } from "@/components/Ticker";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bazar Dor | বাজার দর",
  description: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="antialiased min-h-screen flex flex-col">
        <Suspense fallback={<div className="h-20 bg-white border-b border-gray-100" />}>
          <Navbar />
        </Suspense>
        <Ticker />
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
