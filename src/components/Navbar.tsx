"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { User, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
// Import authClient when available, for now mocked
// import { useSession, signOut } from "@/lib/auth-client";

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
  // const { data: session } = useSession();
  const session = null; // Mock session for now

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
              {session ? (
                <div className="relative group cursor-pointer">
                  <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 rounded-full transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                      <Image src="https://ui-avatars.com/api/?name=Rezwan&background=random" alt="Avatar" width={32} height={32} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden sm:block">Rezwan</span>
                    <ChevronDown className="w-3 h-3 text-gray-400" />
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
                      ? "bg-green-50 text-green-700 border border-green-200 shadow-sm"
                      : "text-gray-600 hover:text-green-700 border border-transparent hover:bg-gray-50"
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
