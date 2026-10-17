"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import {
  Language,
  Translations,
  translations,
  productTranslations,
  categoryTranslations,
  marketTranslations,
  divisionTranslations,
} from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  translateProduct: (productOrSlugOrName: { slug?: string; nameBn?: string } | string) => string;
  translateCategory: (categorySlugOrName?: string) => string;
  translateUnit: (unit?: string, perPrefix?: boolean) => string;
  translateMarket: (market?: string) => string;
  translateDivision: (division?: string) => string;
  formatPrice: (amount: number) => string;
  formatNumber: (amount: number) => string;
  formatPercent: (pct: number) => string;
  formatDate: (date?: Date) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLanguage = "bn",
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  useEffect(() => {
    // Check localStorage or cookie on mount to keep in sync
    const saved = localStorage.getItem("bazardor_lang") as Language | null;
    if (saved && (saved === "bn" || saved === "en") && saved !== language) {
      setLanguageState(saved);
      document.cookie = `bazardor_lang=${saved}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = saved;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("bazardor_lang", lang);
      document.cookie = `bazardor_lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = lang;
      if (typeof document !== "undefined") {
        document.title = lang === "en" ? "Bazar Dor | Daily Market Prices" : "Bazar Dor | বাজার দর";
      }
    } catch {
      // Ignore storage errors in restricted environments
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "bn" ? "en" : "bn");
  };

  const t = useMemo(() => translations[language], [language]);

  const translateProduct = (
    productOrSlugOrName: { slug?: string; nameBn?: string } | string
  ): string => {
    let slug = "";
    let nameBn = "";

    if (typeof productOrSlugOrName === "string") {
      nameBn = productOrSlugOrName;
      slug = productOrSlugOrName.toLowerCase();
    } else if (productOrSlugOrName) {
      slug = productOrSlugOrName.slug || "";
      nameBn = productOrSlugOrName.nameBn || "";
    }

    if (language === "bn") {
      return nameBn || slug;
    }

    // English mode
    if (slug && productTranslations[slug]) {
      return productTranslations[slug];
    }
    if (nameBn && productTranslations[nameBn]) {
      return productTranslations[nameBn];
    }

    // Fallback: clean up slug if available
    if (slug) {
      return slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }

    return nameBn;
  };

  const translateCategory = (categorySlugOrName?: string): string => {
    if (!categorySlugOrName) return "";
    const entry = categoryTranslations[categorySlugOrName];
    if (entry) {
      return language === "en" ? entry.en : entry.bn;
    }
    return categorySlugOrName;
  };

  const translateUnit = (unit?: string, perPrefix: boolean = true): string => {
    const u = (unit || "").toLowerCase();
    const isEn = language === "en";

    if (u === "kg") {
      return perPrefix ? (isEn ? "Per kg" : "প্রতি কেজি") : isEn ? "kg" : "কেজি";
    }
    if (u === "litre" || u === "liter") {
      return perPrefix ? (isEn ? "Per litre" : "প্রতি লিটার") : isEn ? "litre" : "লিটার";
    }
    if (u === "dozen") {
      return perPrefix ? (isEn ? "Per dozen" : "প্রতি ডজন") : isEn ? "dozen" : "ডজন";
    }
    return perPrefix ? (isEn ? "Per piece" : "প্রতি পিস") : isEn ? "pc" : "পিস";
  };

  const translateMarket = (market?: string): string => {
    if (!market) return "";
    if (language === "bn") return market;
    return marketTranslations[market] || market;
  };

  const translateDivision = (division?: string): string => {
    if (!division) return "";
    if (language === "bn") return division;
    return divisionTranslations[division] || division;
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString(language === "en" ? "en-US" : "bn-BD");
  };

  const formatPrice = (amount: number): string => {
    const formatted = formatNumber(amount);
    return language === "en" ? `${formatted} Tk` : `${formatted} টাকা`;
  };

  const formatPercent = (pct: number): string => {
    const formatted = Math.abs(pct).toLocaleString(language === "en" ? "en-US" : "bn-BD");
    return `${formatted}%`;
  };

  const formatDate = (date: Date = new Date()): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString(language === "en" ? "en-US" : "bn-BD", options);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        translateProduct,
        translateCategory,
        translateUnit,
        translateMarket,
        translateDivision,
        formatPrice,
        formatNumber,
        formatPercent,
        formatDate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
