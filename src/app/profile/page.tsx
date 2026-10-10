"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { User } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // If not authenticated, redirect to signin
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সাইন আউট সফল হয়েছে");
      router.replace("/signin");
    } catch (err) {
      console.error("Sign out error:", err);
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    }
  };

  if (isPending || !session) {
    return (
      <div className="max-w-[640px] mx-auto min-h-[60vh] flex flex-col justify-center items-center">
        <div className="w-8 h-8 border-4 border-[#05893E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="max-w-[640px] mx-auto py-10 px-4 min-h-[calc(100vh-16rem)]">
      {/* Header outside cards */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-[1.75rem] font-bold text-gray-900 tracking-tight mb-1">
          আমার প্রোফাইল
        </h1>
        <p className="text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* Top Card: User Info & Sign Out */}
      <div className="bg-white rounded-[22px] border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200/80 flex items-center justify-center overflow-hidden flex-shrink-0 text-gray-400">
            {user?.image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={user.image}
                alt={user.name || "Avatar"}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-gray-400" />
            )}
          </div>

          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
              {user.name || "ইউজার"}
            </h2>
            <p className="text-sm text-gray-500 truncate mt-0.5">
              {user.email || ""}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="border border-red-200 hover:border-red-300 text-red-600 hover:bg-red-50/60 px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
        >
          <span>←</span>
          <span>সাইন আউট</span>
        </button>
      </div>

      {/* Action Card */}
      <div className="bg-white rounded-[22px] border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 sm:p-7">
        <Link
          href="/profile/update"
          className="w-full inline-block bg-[#05893E] hover:bg-[#047F39] text-white py-3.5 rounded-xl font-bold text-sm sm:text-base text-center shadow-[0_3px_10px_rgba(5,137,62,0.25)] hover:shadow-[0_5px_15px_rgba(5,137,62,0.3)] transition-all cursor-pointer"
        >
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}
