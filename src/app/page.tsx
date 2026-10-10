import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { AllProductsList } from "@/components/AllProductsList";
import { TrendingUp, TrendingDown } from "lucide-react";

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

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products", {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function Home() {
  const products: Product[] = await getProducts();
  
  // Sort and filter for risers and fallers
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
      {/* Hero Section */}
      <section className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 mt-4 shadow-sm">
        <div className="max-w-xl">
          <div className="inline-block bg-green-50/80 text-green-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-green-100">
            মঙ্গলবার, ৬ অক্টোবর, ২০২৬
          </div>
          <h1 className="text-4xl md:text-[2.75rem] font-bold text-gray-900 leading-[1.2] mb-6 tracking-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-gray-500 text-[1.05rem] leading-relaxed mb-8">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <Link href="#সব-পণ্য" className="btn-primary inline-block">
            সব পণ্য দেখুন
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

      {/* Risers Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="text-red-500 w-6 h-6" />
          <h2 className="text-xl font-bold text-gray-900">আজ দাম বেড়েছে ▲</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6">
          {risers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Fallers Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <TrendingDown className="text-green-500 w-6 h-6" />
          <h2 className="text-xl font-bold text-gray-900">আজ দাম কমেছে ▼</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6">
          {fallers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* All Products Section with Sort dropdown */}
      <AllProductsList initialProducts={products} />
    </div>
  );
}
