"use client";

import { getProductIcon } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface ProductDetail {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets?: Market[];
}

export function ProductDetailView({ product }: { product: ProductDetail }) {
  const {
    t,
    translateProduct,
    translateCategory,
    translateUnit,
    translateMarket,
    translateDivision,
    formatNumber,
    formatPercent,
  } = useLanguage();

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const allMins = product.markets?.map((m: Market) => m.min) || [];
  const allMaxs = product.markets?.map((m: Market) => m.max) || [];
  const minPrice = allMins.length ? Math.min(...allMins) : product.today;
  const maxPrice = allMaxs.length ? Math.max(...allMaxs) : product.today;
  const avgPrice = Math.round((minPrice + maxPrice) / 2);

  const unitLabel = translateUnit(product.unit, true);
  const productName = translateProduct(product);
  const categoryName = translateCategory(product.category || product.categoryNameBn);

  return (
    <div className="max-w-4xl mx-auto min-h-screen">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start sm:items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-2xl text-3xl sm:text-4xl border border-gray-100 shadow-inner">
            {getProductIcon(product.slug || product.nameBn, product.categoryIcon)}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5">{productName}</h1>
            <p className="text-gray-500 text-sm mb-3">
              {t.productSubtitle}
            </p>
            <div className="flex gap-2">
              <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">
                {categoryName}
              </span>
              <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">
                {unitLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="text-left sm:text-right flex flex-col sm:items-end w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100">
          <p className="text-sm text-gray-500 mb-1">{t.todayAvgPrice}</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            {formatNumber(product.today)} <span className="text-lg font-normal">{t.currency}</span>
          </p>
          <div className={`mt-2 inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1 rounded-lg w-fit ${isUp ? "text-red-700 bg-red-50 border border-red-200/60" : isDown ? "text-green-700 bg-green-50 border border-green-200/60" : "text-gray-600 bg-gray-50 border border-gray-200/60"}`}>
            <span className="text-xs leading-none">{isUp ? "▲" : isDown ? "▼" : "—"}</span>
            <span className="font-semibold">{formatPercent(product.change.pct)}</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">{t.priceSummary}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 border border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-2">{t.lowestPrice}</p>
            <p className="text-2xl font-bold text-green-600">{formatNumber(minPrice)} {t.currency}</p>
            <p className="text-xs text-gray-400 mt-1">{t.lowestPriceMarket}</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-2">{t.highestPrice}</p>
            <p className="text-2xl font-bold text-red-500">{formatNumber(maxPrice)} {t.currency}</p>
            <p className="text-xs text-gray-400 mt-1">{t.highestPriceMarket}</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-2">{t.avgPrice}</p>
            <p className="text-2xl font-bold text-gray-900">{formatNumber(avgPrice)} {t.currency}</p>
            <p className="text-xs text-gray-400 mt-1">{t.avgPriceUnitDesc(unitLabel)}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">{t.marketWisePrices}</h2>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="py-3 px-6 font-semibold">{t.thMarket}</th>
                <th className="py-3 px-6 font-semibold">{t.thDivision}</th>
                <th className="py-3 px-6 font-semibold text-right">{t.thLowest}</th>
                <th className="py-3 px-6 font-semibold text-right">{t.thHighest}</th>
              </tr>
            </thead>
            <tbody>
              {product.markets?.map((m: Market, i: number) => (
                <tr key={i} className="border-b last:border-0 border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-6 font-medium text-gray-900">{translateMarket(m.market)}</td>
                  <td className="py-3 px-6 text-gray-600">{translateDivision(m.division)}</td>
                  <td className="py-3 px-6 text-right text-gray-700">{formatNumber(m.min)} {t.currency}</td>
                  <td className="py-3 px-6 text-right text-gray-700">{formatNumber(m.max)} {t.currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
