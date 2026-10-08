"use client";

import Link from "next/link";
import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto min-h-[60vh] flex flex-col justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">আমার প্রোফাইল</h1>
        <p className="text-gray-500 mb-8">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
            <User className="w-12 h-12" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Rezwan Ahmed</h2>
            <p className="text-gray-500">rezwanahmed@gmail.com</p>
          </div>
        </div>

        <Link href="/profile/update" className="btn-primary inline-block">
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}
