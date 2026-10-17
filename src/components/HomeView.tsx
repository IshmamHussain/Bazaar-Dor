"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { AllProductsList } from "@/components/AllProductsList";
import { useLanguage } from "@/lib/LanguageContext";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

export function HomeView({ products }: { products: Product[] }) {
  const { t, formatDate } = useLanguage();

  const risers = [...products]
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = [...products]
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  return (
    <div className="flex flex-col gap-16">
      <section className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 mt-4 shadow-sm">
        <div className="max-w-xl">
          <div className="inline-block bg-green-50/80 text-green-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-green-100">
            {formatDate(new Date())}
          </div>
          <h1 className="text-4xl md:text-[2.75rem] font-bold text-gray-900 leading-[1.2] mb-6 tracking-tight">
            {t.heroTitle}
          </h1>
          <p className="text-gray-500 text-[1.05rem] leading-relaxed mb-8">
            {t.heroDescription}
          </p>
          <Link href="#all-products" className="btn-primary inline-block">
            {t.heroCta}
          </Link>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-72 h-72">
            <Image
              src="/bazar-hero.png"
              alt="Bazar basket"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2.5 mb-6">
          <span className="text-[#D92D20] text-sm sm:text-base leading-none select-none">▲</span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1D271F]">{t.risersTitle}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6">
          {risers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2.5 mb-6">
          <span className="text-[#05893E] text-sm sm:text-base leading-none select-none">▼</span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1D271F]">{t.fallersTitle}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6">
          {fallers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <AllProductsList initialProducts={products} />
    </div>
  );
}
