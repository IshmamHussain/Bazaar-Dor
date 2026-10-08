import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center bg-white p-12 rounded-3xl border border-gray-100 shadow-sm max-w-lg w-full">
        <h1 className="text-9xl mb-4">🛒</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">৪০৪ - পৃষ্ঠা পাওয়া যায়নি</h2>
        <p className="text-gray-500 mb-8 text-lg">
          আপনি যে পেজটি খুঁজছেন তা মুছে ফেলা হয়েছে, নাম পরিবর্তন করা হয়েছে অথবা সাময়িকভাবে অনুপলব্ধ।
        </p>
        <Link href="/" className="btn-primary inline-block text-lg px-8 py-3">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
