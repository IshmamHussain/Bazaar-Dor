"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { User, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useSession, signOut } from "@/lib/auth-client";

const categories = [
  { name: "চাল", icon: "🍚", slug: "chal" },
  { name: "ডাল", icon: "🫘", slug: "dal" },
  { name: "তেল", icon: "🛢️", slug: "oil" },
  { name: "সবজি", icon: "🥒", slug: "vegetables" },
  { name: "মাছ", icon: "🐟", slug: "fish" },
  { name: "মাংস", icon: "🍗", slug: "meat" },
  { name: "ডিম-দুধ", icon: "🥛", slug: "egg-milk" },
  { name: "মশলা", icon: "🌶️", slug: "spice" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Bengali Date formatting
  const [banglaDate, setBanglaDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setBanglaDate(today.toLocaleDateString('bn-BD', options));
  }, []);

  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          {/* Top Row: Logo & User */}
          <div className="flex items-center justify-between h-[4.5rem]">
            {/* Logo and Date */}
            <div className="flex flex-col flex-shrink-0">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo-icon.png" alt="Bazar Dor Logo" width={32} height={32} className="object-contain" />
                <span className="font-bold text-xl text-gray-900 tracking-tight">বাজার দর</span>
              </Link>
              <span className="text-[11px] text-gray-500 mt-0.5 pl-10">{banglaDate}</span>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {session?.user ? (
                <div className="relative group cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-200">
                      {session.user.image ? (
                        <img src={session.user.image} alt="Avatar" width={32} height={32} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                    <span className="text-[15px] font-medium text-gray-800 hidden sm:block">{session.user.name || "User"}</span>
                    <ChevronDown className="w-3 h-3 text-gray-500 mt-0.5" />
                  </div>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                    <div className="px-3 py-2 border-b border-gray-100 mb-1">
                      <p className="text-[15px] font-semibold text-gray-900 truncate">{session.user.name}</p>
                      <p className="text-[13px] text-gray-500 truncate mt-0.5">{session.user.email}</p>
                    </div>
                    <Link href="/profile" className="flex items-center gap-2 px-3 py-2 text-[14px] text-gray-700 hover:bg-gray-50 rounded-lg transition-colors mt-1">
                      <User className="w-[18px] h-[18px] text-slate-500" />
                      <span>আমার প্রোফাইল</span>
                    </Link>
                    <button 
                      onClick={() => signOut()}
                      className="w-full flex items-center gap-2 px-3 py-2 text-[14px] text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                    >
                      <LogOut className="w-[18px] h-[18px]" />
                      <span>সাইন আউট</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/signin" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
                    সাইন ইন
                  </Link>
                  <Link href="/signup" className="btn-primary text-sm px-5 py-2">
                    সাইন আপ
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Row: Categories */}
          <div className="hidden md:flex items-center gap-2 pb-3 pl-8">
            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={cn(
                    "flex items-center gap-1.5 text-[13px] font-medium transition-all duration-200 px-3 py-1.5 rounded-full",
                    isActive
                      ? "bg-[#0E8B44] text-white shadow-sm"
                      : "text-gray-600 hover:text-[#0E8B44] border border-transparent hover:bg-gray-50"
                  )}
                >
                  <span className="text-sm opacity-80">{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
