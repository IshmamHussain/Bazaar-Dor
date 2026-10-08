"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

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
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  
  const unitLabel = product.unit === 'kg' ? 'প্রতি কেজি' 
    : product.unit === 'liter' ? 'প্রতি লিটার' 
    : product.unit === 'dozen' ? 'প্রতি ডজন' 
    : 'প্রতি পিস';

  return (
    <Link 
      href={`/product/${product.slug}`}
      className="block bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex gap-4 items-start mb-4">
        <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl text-2xl border border-gray-100">
          {product.categoryIcon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg leading-tight">{product.nameBn}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{unitLabel}</p>
        </div>
      </div>
      
      <div className="flex items-end justify-between mt-6">
        <div>
          <p className="text-xs text-gray-400 mb-1">আজকের দাম</p>
          <p className="font-bold text-gray-900 text-xl">
            {product.today.toLocaleString('bn-BD')} <span className="text-base font-normal">টাকা</span>
          </p>
        </div>
        
        <div className={cn(
          "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md",
          isUp ? "text-red-600 bg-red-50" : isDown ? "text-green-600 bg-green-50" : "text-gray-500 bg-gray-50"
        )}>
          {isUp ? "▲" : isDown ? "▼" : "—"} {product.change.pct.toLocaleString('bn-BD')}%
        </div>
      </div>
    </Link>
  );
}
