"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession, authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const { data: session } = useSession();
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
        router.push("/profile");
      }
    } catch (err: unknown) {
      console.error("Update error:", err);
      toast.error("আপডেট করার সময় ত্রুটি হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-[60vh] flex flex-col justify-center px-4">
      <div className="bg-white p-8 sm:p-10 rounded-[28px] shadow-sm border border-[#E1E8E1]">
        <h1 className="text-2xl font-bold text-[#1D271F] mb-6 text-center tracking-tight">তথ্য আপডেট করুন</h1>
        
        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#1D271F] mb-2">নাম</label>
            <input 
              type="text" 
              required
              value={currentName}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAFCFA] border border-[#E1E8E1] rounded-xl text-sm sm:text-[15px] text-[#1D271F] placeholder:text-[#59665B]/60 focus:bg-white focus:outline-none focus:border-[#05893E] focus:ring-1 focus:ring-[#05893E] transition-all" 
              placeholder="আপনার নতুন নাম লিখুন" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#05893E] hover:bg-[#047F39] text-white py-3.5 rounded-xl font-bold text-base shadow-sm hover:shadow transition-all duration-200 flex justify-center items-center cursor-pointer"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "আপডেট সম্পন্ন করুন"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link 
            href="/profile" 
            className="text-sm font-medium text-[#59665B] hover:text-[#05893E] transition-colors"
          >
            ← ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
