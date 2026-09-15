const revenueData = [
  { month: "Jan", value: 45 },
  { month: "Feb", value: 58 },
  { month: "Mar", value: 52 },
  { month: "Apr", value: 68 },
  { month: "May", value: 62 },
  { month: "Jun", value: 78 },
  { month: "Jul", value: 72 },
  { month: "Aug", value: 88 },
  { month: "Sep", value: 82 },
  { month: "Oct", value: 94 },
  { month: "Nov", value: 87 },
  { month: "Dec", value: 98 },
];

export default function RevenueChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Revenue Overview
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Monthly revenue performance
          </p>
        </div>

        <select
          defaultValue="2026"
          aria-label="Select year"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 outline-none focus:border-indigo-400"
        >
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      </div>

      <div className="mt-8 flex h-64 items-end gap-2 sm:gap-4">
        {revenueData.map((item) => (
          <div
            key={item.month}
            className="flex h-full flex-1 flex-col items-center justify-end gap-2"
          >
            <div className="flex h-full w-full items-end">
              <div
                className="w-full rounded-t-md bg-indigo-500 transition hover:bg-indigo-600"
                style={{ height: `${item.value}%` }}
                title={`${item.month}: ${item.value}%`}
              />
            </div>

            <span className="text-[10px] font-medium text-slate-400 sm:text-xs">
              {item.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}