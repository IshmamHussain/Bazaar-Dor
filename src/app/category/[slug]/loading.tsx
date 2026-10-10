export default function CategoryLoading() {
  return (
    <div className="min-h-screen animate-pulse">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b border-gray-200 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-200 rounded-lg" />
          <div className="w-36 h-8 bg-gray-200 rounded-lg" />
        </div>
        <div className="w-48 h-9 bg-gray-200 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm h-44 flex flex-col justify-between">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-gray-100 rounded-xl" />
              <div className="space-y-2 flex-1">
                <div className="w-3/4 h-5 bg-gray-200 rounded" />
                <div className="w-1/3 h-4 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <div className="w-16 h-3 bg-gray-100 rounded" />
                <div className="w-24 h-6 bg-gray-200 rounded" />
              </div>
              <div className="w-14 h-6 bg-gray-100 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
