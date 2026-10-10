"use client";

import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn, signUp, useSession } from "@/lib/auth-client";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/");
    }
  }, [isPending, session, router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      setLoading(false);
      return;
    }

    const { error } = await signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    } else {
      toast.success("রেজিস্ট্রেশন সফল হয়েছে!");
      router.push("/signin");
    }
    
    setLoading(false);
  };

  const handleSocialLogin = async (provider: string) => {
    setLoading(true);
    const providerLower = provider.toLowerCase() as "google" | "github";

    try {
      const res = await signIn.social({
        provider: providerLower,
        callbackURL: "/",
      });

      if (res?.data?.url) {
        window.location.href = res.data.url;
        return;
      }

      if (res?.error) {
        toast.error(res.error.message || `${provider} সাইন ইন ব্যর্থ হয়েছে`);
        setLoading(false);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : `${provider} সাইন ইন ব্যর্থ হয়েছে`;
      toast.error(message);
      setLoading(false);
    }
  };

  if (isPending || session) {
    return (
      <div className="py-20 flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
        <div className="w-8 h-8 border-4 border-[#05893E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-10 flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
      <div className="text-center mb-8 max-w-md w-full px-4">
        <h1 className="text-3xl sm:text-[2rem] font-bold text-[#1D271F] mb-2 tracking-tight">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-[#59665B] text-sm sm:text-[15px] leading-relaxed">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন
        </p>
      </div>

      <div className="bg-white p-7 sm:p-9 rounded-[28px] border border-[#E1E8E1] shadow-[0_2px_8px_rgba(0,0,0,0.02)] w-full max-w-[430px]">
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1D271F] mb-2">
              নাম
            </label>
            <input 
              type="text" 
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAFCFA] border border-[#E1E8E1] rounded-xl text-sm sm:text-[15px] text-[#1D271F] placeholder:text-[#59665B]/60 focus:bg-white focus:outline-none focus:border-[#05893E] focus:ring-1 focus:ring-[#05893E] transition-all" 
              placeholder="আপনার নাম" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1D271F] mb-2">
              ইমেইল
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAFCFA] border border-[#E1E8E1] rounded-xl text-sm sm:text-[15px] text-[#1D271F] placeholder:text-[#59665B]/60 focus:bg-white focus:outline-none focus:border-[#05893E] focus:ring-1 focus:ring-[#05893E] transition-all" 
              placeholder="you@example.com" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1D271F] mb-2">
              পাসওয়ার্ড
            </label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAFCFA] border border-[#E1E8E1] rounded-xl text-sm sm:text-[15px] text-[#1D271F] placeholder:text-[#59665B]/60 focus:bg-white focus:outline-none focus:border-[#05893E] focus:ring-1 focus:ring-[#05893E] transition-all" 
              placeholder="কমপক্ষে ৮ অক্ষর" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#05893E] hover:bg-[#047F39] text-white py-3.5 rounded-xl font-bold text-base shadow-sm hover:shadow transition-all duration-200 mt-2 flex justify-center items-center cursor-pointer"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "সাইন আপ"
            )}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E1E8E1]" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-[#59665B] font-medium">অথবা</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            type="button"
            onClick={() => handleSocialLogin("Google")} 
            className="flex items-center justify-center gap-2 py-2.5 px-2 bg-white border border-[#E1E8E1] rounded-xl hover:bg-gray-50 transition-colors text-xs sm:text-[13px] font-semibold text-[#1D271F] cursor-pointer"
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span className="truncate">Google দিয়ে চালিয়ে যান</span>
          </button>

          <button 
            type="button"
            onClick={() => handleSocialLogin("GitHub")} 
            className="flex items-center justify-center gap-2 py-2.5 px-2 bg-white border border-[#E1E8E1] rounded-xl hover:bg-gray-50 transition-colors text-xs sm:text-[13px] font-semibold text-[#1D271F] cursor-pointer"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span className="truncate">GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-[#59665B]">
          আগে থেকে অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-[#05893E] font-semibold hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link 
          href="/" 
          className="text-sm font-medium text-[#59665B] hover:text-[#05893E] transition-colors inline-flex items-center gap-1.5"
        >
          <span>←</span>
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}
