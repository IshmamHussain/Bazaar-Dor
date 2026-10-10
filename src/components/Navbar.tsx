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
  { name: "তেল", icon: "🥫", slug: "tel" },
  { name: "সবজি", icon: "🥬", slug: "sobji" },
  { name: "মাছ", icon: "🐟", slug: "mach" },
  { name: "মাংস", icon: "🍗", slug: "mangsho" },
  { name: "ডিম-দুধ", icon: "🥛", slug: "dim-dui" },
  { name: "মসলা", icon: "🌶️", slug: "mosla" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Bengali Date formatting
  const [banglaDate, setBanglaDate] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const today = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      setBanglaDate(today.toLocaleDateString("bn-BD", options));
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="bg-white border-b border-[#E1E8E1] sticky top-0 z-50">
      {/* Top Row: Logo, Date & User Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[4.25rem]">
          {/* Logo & Bengali Date */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="বাজার দর"
              width={44}
              height={44}
              className="w-11 h-11 object-contain transition-transform group-hover:scale-105 flex-shrink-0 rounded-2xl"
              priority
            />
            <div className="flex flex-col justify-center">
              <span className="font-bold text-xl sm:text-2xl text-[#1D271F] tracking-tight leading-tight">
                বাজার দর
              </span>
              <span
                suppressHydrationWarning
                className="text-xs sm:text-[13px] text-[#59665B] font-normal leading-tight mt-0.5"
              >
                {banglaDate || "মঙ্গলবার, ৬ অক্টোবর, ২০২৬"}
              </span>
            </div>
          </Link>

          {/* Auth Buttons / Profile */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {session?.user ? (
              <div className="relative group cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-200">
                    {session.user.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={session.user.image}
                        alt="Avatar"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  <span className="text-[15px] font-medium text-gray-800 hidden sm:block">
                    {session.user.name || "User"}
                  </span>
                  <ChevronDown className="w-3 h-3 text-gray-500 mt-0.5" />
                </div>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50">
                  <div className="px-3 py-2 border-b border-gray-100 mb-1">
                    <p className="text-[15px] font-semibold text-gray-900 truncate">
                      {session.user.name}
                    </p>
                    <p className="text-[13px] text-gray-500 truncate mt-0.5">
                      {session.user.email}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-3 py-2 text-[14px] text-gray-700 hover:bg-gray-50 rounded-lg transition-colors mt-1"
                  >
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
                <Link
                  href="/signin"
                  className="text-sm font-semibold text-gray-700 hover:text-[#05893E] transition-colors px-2 py-1"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="bg-[#05893E] hover:bg-[#047F39] text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors shadow-sm"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subtle Horizontal Divider */}
      <div className="border-t border-[#F0F5F0]" />

      {/* Bottom Row: Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-6 sm:gap-8 overflow-x-auto scrollbar-none py-2.5 sm:py-3">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={cn(
                  "flex items-center gap-2 text-sm sm:text-[15px] font-semibold whitespace-nowrap transition-colors py-1 hover:text-[#05893E]",
                  isActive
                    ? "text-[#05893E] font-bold"
                    : "text-[#1D271F]"
                )}
              >
                <span className="text-base sm:text-[17px] leading-none">{cat.icon}</span>
                <span className="leading-none">{cat.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

