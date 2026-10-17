"use client";

import { useLanguage } from "@/lib/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="font-medium text-gray-700">
            {t.footerLine1}
          </div>
          <div className="italic">
            {t.footerLine2}
          </div>
        </div>
      </div>
    </footer>
  );
}
