"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const handleSocialLogin = (provider: string) => {
    toast.success(`${provider} দিয়ে লগইন সফল হয়েছে!`);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center -mt-10">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="text-gray-500 text-sm">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">নাম</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
              placeholder="আপনার নাম" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
              placeholder="you@example.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
              placeholder="কমপক্ষে ৬ ক্যারেক্টার" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary py-2.5 flex justify-center items-center"
          >
            {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : "সাইন আপ"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <span className="border-b w-1/5 lg:w-1/4"></span>
          <span className="text-xs text-center text-gray-500 uppercase">অথবা</span>
          <span className="border-b w-1/5 lg:w-1/4"></span>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button onClick={() => handleSocialLogin("Google")} className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="google" />
            Google দিয়ে চালিয়ে যান
          </button>
          <button onClick={() => handleSocialLogin("GitHub")} className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
            <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-5 h-5" alt="github" />
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          আগে থেকে অ্যাকাউন্ট আছে? <Link href="/signin" className="text-green-600 font-semibold hover:underline">সাইন ইন করুন</Link>
        </p>
      </div>
    </div>
  );
}
