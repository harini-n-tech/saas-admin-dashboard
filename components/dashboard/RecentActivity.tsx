const activities = [
  {
    initials: "AK",
    name: "Arun Kumar",
    action: "created a new order",
    time: "5 minutes ago",
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    action: "updated product details",
    time: "24 minutes ago",
  },
  {
    initials: "RM",
    name: "Rahul Menon",
    action: "registered a new account",
    time: "1 hour ago",
  },
  {
    initials: "SK",
    name: "Sneha Krishnan",
    action: "completed an order",
    time: "2 hours ago",
  },
  {
    initials: "VK",
    name: "Vikram Kumar",
    action: "updated account settings",
    time: "3 hours ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Recent Activity
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Latest activity across your workspace
          </p>
        </div>

        <button
          type="button"
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
        >
          View all
        </button>
      </div>

      <div className="mt-6 space-y-5">
        {activities.map((activity) => (
          <div
            key={`${activity.name}-${activity.time}`}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
              {activity.initials}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-slate-700">
                <span className="font-semibold text-slate-900">
                  {activity.name}
                </span>{" "}
                {activity.action}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}