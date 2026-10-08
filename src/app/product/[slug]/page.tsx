export const instant = false;
import { notFound, redirect } from "next/navigation";
import { TrendingUp, TrendingDown } from "lucide-react";
// import { auth } from "@/lib/auth"; // auth check to be added

async function getProduct(slug: string) {
  const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${slug}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch product");
  }
  return res.json();
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // Mock Auth Check
  // const session = await auth.api.getSession({ headers: headers() });
  // if (!session) redirect("/signin");

  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const allMins = product.markets?.map((m: any) => m.min) || [];
  const allMaxs = product.markets?.map((m: any) => m.max) || [];
  const minPrice = allMins.length ? Math.min(...allMins) : product.today;
  const maxPrice = allMaxs.length ? Math.max(...allMaxs) : product.today;
  const avgPrice = Math.round((minPrice + maxPrice) / 2);

  return (
    <div className="max-w-4xl mx-auto min-h-screen">
      {/* Top Summary */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between mb-8">
        <div className="flex gap-6 items-center">
          <div className="w-20 h-20 flex items-center justify-center bg-gray-50 rounded-2xl text-4xl border border-gray-100 shadow-inner">
            {product.categoryIcon}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.nameBn}</h1>
            <p className="text-gray-500 text-sm mb-3">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গত, সর্বোচ্চ-সর্বনিম্ন...
            </p>
            <div className="flex gap-2">
              <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">
                {product.categoryNameBn}
              </span>
              <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">
                প্রতি {product.unit === 'kg' ? 'কেজি' : product.unit === 'liter' ? 'লিটার' : product.unit === 'dozen' ? 'ডজন' : 'পিস'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-right flex flex-col items-end">
          <p className="text-sm text-gray-500 mb-1">আজকের গড় দাম</p>
          <p className="text-3xl font-bold text-gray-900">
            {product.today.toLocaleString('bn-BD')} <span className="text-lg font-normal">টাকা</span>
          </p>
          <div className={`mt-2 flex items-center gap-1 text-sm font-medium px-2.5 py-1 rounded-md ${isUp ? "text-red-600 bg-red-50" : isDown ? "text-green-600 bg-green-50" : "text-gray-500 bg-gray-50"}`}>
            {isUp ? "▲" : isDown ? "▼" : "—"} {product.change.pct.toLocaleString('bn-BD')}%
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 border border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-2">সর্বনিম্ন দাম</p>
            <p className="text-2xl font-bold text-green-600">{minPrice.toLocaleString('bn-BD')} টাকা</p>
            <p className="text-xs text-gray-400 mt-1">সবচেয়ে কম দামের বাজার</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-2">সর্বোচ্চ দাম</p>
            <p className="text-2xl font-bold text-red-500">{maxPrice.toLocaleString('bn-BD')} টাকা</p>
            <p className="text-xs text-gray-400 mt-1">সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-2">গড় দাম</p>
            <p className="text-2xl font-bold text-gray-900">{avgPrice.toLocaleString('bn-BD')} টাকা</p>
            <p className="text-xs text-gray-400 mt-1">প্রতি কেজিতে গড় হিসাব</p>
          </div>
        </div>
      </div>

      {/* Markets Table */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">বাজারভিত্তিক আজকের দাম</h2>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="py-3 px-6 font-semibold">বাজার</th>
                <th className="py-3 px-6 font-semibold">বিভাগ</th>
                <th className="py-3 px-6 font-semibold text-right">সর্বনিম্ন</th>
                <th className="py-3 px-6 font-semibold text-right">সর্বোচ্চ</th>
              </tr>
            </thead>
            <tbody>
              {product.markets?.map((m: any, i: number) => (
                <tr key={i} className="border-b last:border-0 border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-6 font-medium text-gray-900">{m.market}</td>
                  <td className="py-3 px-6 text-gray-600">{m.division}</td>
                  <td className="py-3 px-6 text-right text-gray-700">{m.min.toLocaleString('bn-BD')} টাকা</td>
                  <td className="py-3 px-6 text-right text-gray-700">{m.max.toLocaleString('bn-BD')} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
