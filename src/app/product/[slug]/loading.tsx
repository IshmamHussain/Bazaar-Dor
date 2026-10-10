export default function ProductLoading() {
  return (
    <div className="max-w-4xl mx-auto min-h-screen py-6 animate-pulse space-y-8">
      <div className="bg-white rounded-2xl p-6 border border-[#E1E8E1] h-36 flex items-center justify-between">
        <div className="flex gap-6 items-center">
          <div className="w-20 h-20 bg-gray-200 rounded-2xl" />
          <div className="space-y-3">
            <div className="w-48 h-8 bg-gray-200 rounded-lg" />
            <div className="w-64 h-4 bg-gray-100 rounded" />
            <div className="flex gap-2">
              <div className="w-16 h-6 bg-gray-100 rounded-full" />
              <div className="w-20 h-6 bg-gray-100 rounded-full" />
            </div>
          </div>
        </div>
        <div className="space-y-2 text-right">
          <div className="w-24 h-4 bg-gray-100 rounded ml-auto" />
          <div className="w-32 h-8 bg-gray-200 rounded ml-auto" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-[#E1E8E1] h-28 flex flex-col justify-between items-center">
            <div className="w-20 h-4 bg-gray-100 rounded" />
            <div className="w-28 h-7 bg-gray-200 rounded" />
            <div className="w-32 h-3 bg-gray-100 rounded" />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#E1E8E1] h-64 p-6 space-y-4">
        <div className="w-40 h-6 bg-gray-200 rounded mb-4" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-full h-8 bg-gray-100 rounded" />
        ))}
      </div>
    </div>
  );
}
