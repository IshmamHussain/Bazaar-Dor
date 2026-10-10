"use client";

import { useEffect, useState } from "react";
import { cn, getProductIcon } from "@/lib/utils";

interface Product {
  id: number;
  slug?: string;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

export function Ticker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        // Take a subset or all for ticker
        setProducts(data.slice(0, 15));
      })
      .catch((err) => console.error(err));
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="w-full bg-white border-b border-gray-100 py-2.5 overflow-hidden flex whitespace-nowrap">
      <div className="animate-marquee flex gap-8">
        {[...products, ...products].map((p, i) => {
          const isUp = p.change.dir === "up";
          const isDown = p.change.dir === "down";
          const icon = getProductIcon(p.slug || p.nameBn, p.categoryIcon);
          
          return (
            <div key={`${p.id}-${i}`} className="flex items-center gap-2 text-sm font-medium">
              <span className="text-gray-500">{icon}</span>
              <span className="text-gray-700">{p.nameBn}</span>
              <span className="text-gray-900">{p.today.toLocaleString('bn-BD')} টাকা/{p.unit === 'kg' ? 'কেজি' : (p.unit === 'litre' || p.unit === 'liter') ? 'লিটার' : p.unit === 'dozen' ? 'ডজন' : 'পিস'}</span>
              <span className={cn(
                "inline-flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 rounded-md",
                isUp ? "text-green-700 bg-green-50 border border-green-200/60" : isDown ? "text-red-700 bg-red-50 border border-red-200/60" : "text-gray-600 bg-gray-50 border border-gray-200/60"
              )}>
                <span className="text-[10px] leading-none">{isUp ? "▲" : isDown ? "▼" : "—"}</span>
                <span className="font-semibold">{Math.abs(p.change.pct).toLocaleString('bn-BD')}%</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
