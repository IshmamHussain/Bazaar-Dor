"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ChevronDown, Grid3X3 } from "lucide-react";

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

export function AllProductsList({ initialProducts }: { initialProducts: Product[] }) {
  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">("default");

  const sortedProducts = [...initialProducts].sort((a, b) => {
    if (sortOrder === "asc") return a.today - b.today;
    if (sortOrder === "desc") return b.today - a.today;
    return a.id - b.id;
  });

  return (
    <section id="সব-পণ্য" className="scroll-mt-24">
      <div id="all-products" />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 border-b border-gray-200 pb-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Grid3X3 className="text-gray-500 w-6 h-6" />
            <h2 className="text-xl font-bold text-gray-900">সব পণ্য</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            নিত্যপ্রয়োজনীয় সকল পণ্যের বর্তমান বাজার দর
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden sm:inline">
            {initialProducts.length} টি পণ্য পাওয়া গেছে
          </span>

          <div className="relative">
            <label className="text-sm text-gray-500 mr-2">সাজান:</label>
            <div className="inline-block relative">
              <select
                className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-sm font-medium cursor-pointer"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "default" | "asc" | "desc")}
              >
                <option value="default">ডিফল্ট</option>
                <option value="asc">দাম: কম থেকে বেশি</option>
                <option value="desc">দাম: বেশি থেকে কম</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6">
        {sortedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
