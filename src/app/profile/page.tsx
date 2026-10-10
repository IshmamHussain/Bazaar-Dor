"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="max-w-md mx-auto min-h-[60vh] flex flex-col justify-center items-center">
        <div className="w-8 h-8 border-4 border-[#05893E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="max-w-md mx-auto min-h-[60vh] flex flex-col justify-center px-4">
      <div className="bg-white p-8 sm:p-10 rounded-[28px] shadow-sm border border-[#E1E8E1] text-center">
        <h1 className="text-2xl font-bold text-[#1D271F] mb-2 tracking-tight">আমার প্রোফাইল</h1>
        <p className="text-[#59665B] text-sm mb-8">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
          <div className="w-24 h-24 bg-[#FAFCFA] border border-[#E1E8E1] rounded-full flex items-center justify-center text-gray-400 overflow-hidden shadow-inner">
            {user?.image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={user.image} alt={user.name || "Avatar"} className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-[#59665B]" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1D271F]">{user?.name || "ইউজার"}</h2>
            <p className="text-sm text-[#59665B] mt-0.5">{user?.email || "ইমেইল পাওয়া যায়নি"}</p>
          </div>
        </div>

        <Link 
          href="/profile/update" 
          className="w-full inline-block bg-[#05893E] hover:bg-[#047F39] text-white py-3 px-6 rounded-xl font-semibold text-sm transition-colors shadow-sm"
        >
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}
