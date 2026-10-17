import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Ticker } from "@/components/Ticker";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/lib/LanguageContext";
import { Language } from "@/lib/translations";

export const metadata: Metadata = {
  title: "Bazar Dor | বাজার দর",
  description: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে। Daily essential market prices at a glance.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("bazardor_lang")?.value;
  const initialLanguage: Language = langCookie === "en" ? "en" : "bn";

  return (
    <html lang={initialLanguage} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <LanguageProvider initialLanguage={initialLanguage}>
          <Suspense fallback={<div className="h-20 bg-white border-b border-gray-100" />}>
            <Navbar />
          </Suspense>
          <Ticker />
          <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
          <Toaster position="bottom-right" />
        </LanguageProvider>
      </body>
    </html>
  );
}
