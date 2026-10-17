"use client";

import Link from "next/link";
import { cn, getProductIcon } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

export function ProductCard({ product }: { product: Product }) {
  const { t, translateProduct, translateUnit, formatNumber, formatPercent } = useLanguage();
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  
  const unitLabel = translateUnit(product.unit, true);
  const productName = translateProduct(product);
  const icon = getProductIcon(product.slug || product.nameBn, product.categoryIcon);

  return (
    <Link 
      href={`/product/${product.slug}`}
      className="block bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex gap-4 items-start mb-4">
        <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl text-2xl border border-gray-100">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg leading-tight">{productName}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{unitLabel}</p>
        </div>
      </div>
      
      <div className="flex items-end justify-between mt-6">
        <div>
          <p className="text-xs text-gray-400 mb-1">{t.todayPrice}</p>
          <p className="font-bold text-gray-900 text-xl">
            {formatNumber(product.today)} <span className="text-base font-normal">{t.currency}</span>
          </p>
        </div>
        
        <div className={cn(
          "inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg tracking-normal",
          isUp ? "text-red-700 bg-red-50 border border-red-200/60" : isDown ? "text-green-700 bg-green-50 border border-green-200/60" : "text-gray-600 bg-gray-50 border border-gray-200/60"
        )}>
          <span className="text-[10px] leading-none">{isUp ? "▲" : isDown ? "▼" : "—"}</span>
          <span className="font-semibold">{formatPercent(product.change.pct)}</span>
        </div>
      </div>
    </Link>
  );
}
