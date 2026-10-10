export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse space-y-12">
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#E1E8E1] h-72 flex flex-col justify-between">
        <div className="w-40 h-6 bg-gray-200 rounded-full" />
        <div className="w-3/4 h-10 bg-gray-200 rounded-xl" />
        <div className="w-1/2 h-5 bg-gray-100 rounded-lg" />
        <div className="w-32 h-10 bg-gray-200 rounded-xl" />
      </div>

      <div>
        <div className="w-44 h-7 bg-gray-200 rounded-lg mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-[#E1E8E1] h-44 flex flex-col justify-between">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-gray-200" />
                <div className="space-y-2 flex-1">
                  <div className="w-3/4 h-5 bg-gray-200 rounded" />
                  <div className="w-1/3 h-4 bg-gray-100 rounded" />
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="w-20 h-6 bg-gray-200 rounded" />
                <div className="w-14 h-5 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
