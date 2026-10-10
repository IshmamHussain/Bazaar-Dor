"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { User } from "lucide-react";
import { useSession, authClient, signOut } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const router = useRouter();

  // If not authenticated, redirect to signin
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  const currentName = name !== null ? name : (session?.user?.name || "");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentName.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    setLoading(true);
    try {
      const res = await authClient.updateUser({
        name: currentName.trim(),
      });
      if (res?.error) {
        toast.error(res.error.message || "আপডেট ব্যর্থ হয়েছে");
      } else {
        toast.success("প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে!");
      }
    } catch (err: unknown) {
      console.error("Update error:", err);
      toast.error("আপডেট করার সময় ত্রুটি হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
      toast.success("সাইন আউট সফল হয়েছে");
      router.replace("/signin");
    } catch (err) {
      console.error("Sign out error:", err);
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    } finally {
      setSigningOut(false);
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
          {/* Avatar Box */}
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

          {/* User Details */}
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
              {user.name || "ইউজার"}
            </h2>
            <p className="text-sm text-gray-500 truncate mt-0.5">
              {user.email || ""}
            </p>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="border border-red-200 hover:border-red-300 text-red-600 hover:bg-red-50/60 px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
        >
          <span>←</span>
          <span>{signingOut ? "অপেক্ষা করুন..." : "সাইন আউট"}</span>
        </button>
      </div>

      {/* Bottom Card: Update Information Form */}
      <div className="bg-white rounded-[22px] border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 sm:p-7">
        <h3 className="text-base font-bold text-gray-900 mb-6">
          তথ্য
        </h3>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              নাম
            </label>
            <input
              type="text"
              required
              value={currentName}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAFCFA] border border-gray-200 rounded-xl text-sm sm:text-[15px] text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#05893E] focus:ring-1 focus:ring-[#05893E] transition-all"
              placeholder="আপনার নাম লিখুন"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#05893E] hover:bg-[#047F39] text-white py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-[0_3px_10px_rgba(5,137,62,0.25)] hover:shadow-[0_5px_15px_rgba(5,137,62,0.3)] transition-all flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "আপডেট"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
