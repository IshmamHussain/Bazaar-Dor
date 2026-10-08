"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
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
          
          return (
            <div key={`${p.id}-${i}`} className="flex items-center gap-2 text-sm font-medium">
              <span className="text-gray-500">{p.categoryIcon}</span>
              <span className="text-gray-700">{p.nameBn}</span>
              <span className="text-gray-900">{p.today.toLocaleString('bn-BD')} টাকা/{p.unit === 'kg' ? 'কেজি' : p.unit === 'liter' ? 'লিটার' : p.unit === 'dozen' ? 'ডজন' : 'পিস'}</span>
              <span className={cn(
                "flex items-center text-xs px-1.5 py-0.5 rounded",
                isUp ? "text-red-600 bg-red-50" : isDown ? "text-green-600 bg-green-50" : "text-gray-500 bg-gray-50"
              )}>
                {isUp ? "▲" : isDown ? "▼" : "—"} {p.change.pct.toLocaleString('bn-BD')}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
