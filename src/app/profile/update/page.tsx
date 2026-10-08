"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const [name, setName] = useState("Rezwan Ahmed");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock update logic
    setTimeout(() => {
      if (name) {
        toast.success("প্রোফাইল আপডেট সফল হয়েছে!");
        router.push("/profile");
      } else {
        toast.error("নাম খালি রাখা যাবে না");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto min-h-[60vh] flex flex-col justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">তথ্য আপডেট করুন</h1>
        
        <form onSubmit={handleUpdate} className="space-y-4">
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
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary py-2.5 flex justify-center items-center"
          >
            {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : "আপডেট করুন"}
          </button>
        </form>
      </div>
    </div>
  );
}
