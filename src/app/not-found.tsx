"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center bg-white p-12 rounded-3xl border border-gray-100 shadow-sm max-w-lg w-full">
        <h1 className="text-9xl mb-4">🛒</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.notFoundTitle}</h2>
        <p className="text-gray-500 mb-8 text-lg">
          {t.notFoundDesc}
        </p>
        <Link href="/" className="btn-primary inline-block text-lg px-8 py-3">
          {t.backToHome}
        </Link>
      </div>
    </div>
  );
}
