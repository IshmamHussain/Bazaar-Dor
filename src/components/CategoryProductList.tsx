"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

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

export function CategoryProductList({ slug }: { slug: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [prevSlug, setPrevSlug] = useState(slug);
  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">("default");
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");

  if (prevSlug !== slug) {
    setPrevSlug(slug);
    setLoading(true);
  }

  useEffect(() => {
    let isMounted = true;
    fetch(`https://api.abcz.workers.dev/api/bazardor/products?category=${slug}`)
      .then((res) => res.ok ? res.json() : fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`).then(r => r.json()))
      .then((data) => {
        if (!isMounted) return;
        if (Array.isArray(data)) {
          setProducts(data);
          if (data.length > 0) {
            setCategoryName(data[0].categoryNameBn || "");
            setCategoryIcon(data[0].categoryIcon || "");
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error(err);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-2xl h-40 border border-gray-100"></div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">কোনো পণ্য পাওয়া যায়নি</h2>
        <p className="text-gray-500 mb-8">আপনি যে ক্যাটাগরিটি খুঁজছেন তাতে কোনো পণ্য নেই বা এটি ভুল।</p>
        <Link href="/" className="btn-primary">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  // Sorting logic (sort by numeric value)
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "asc") return a.today - b.today;
    if (sortOrder === "desc") return b.today - a.today;
    return 0; // default
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b border-gray-200 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl">{categoryIcon}</span>
          <h1 className="text-2xl font-bold text-gray-900">{categoryName}</h1>
        </div>
        
        <div className="relative">
          <label className="text-sm text-gray-500 mr-2">সাজান:</label>
          <div className="inline-block relative">
            <select 
              className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-sm font-medium"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6">
        {sortedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
