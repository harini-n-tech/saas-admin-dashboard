"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  CalendarDays,
  DollarSign,
  Download,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

interface RevenueData {
  month: string;
  revenue: number;
}

interface UserGrowthData {
  month: string;
  users: number;
}

interface ProductPerformance {
  name: string;
  sales: number;
  revenue: number;
}

const revenueData: RevenueData[] = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5100 },
  { month: "Mar", revenue: 4700 },
  { month: "Apr", revenue: 6200 },
  { month: "May", revenue: 7100 },
  { month: "Jun", revenue: 6800 },
  { month: "Jul", revenue: 8200 },
  { month: "Aug", revenue: 9100 },
  { month: "Sep", revenue: 8700 },
  { month: "Oct", revenue: 10200 },
  { month: "Nov", revenue: 11400 },
  { month: "Dec", revenue: 12800 },
];

const userGrowthData: UserGrowthData[] = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 165 },
  { month: "Mar", users: 210 },
  { month: "Apr", users: 260 },
  { month: "May", users: 315 },
  { month: "Jun", users: 370 },
  { month: "Jul", users: 430 },
  { month: "Aug", users: 495 },
  { month: "Sep", users: 560 },
  { month: "Oct", users: 635 },
  { month: "Nov", users: 720 },
  { month: "Dec", users: 815 },
];

const productPerformance: ProductPerformance[] = [
  {
    name: "Pro Plan",
    sales: 248,
    revenue: 12400,
  },
  {
    name: "Business Plan",
    sales: 186,
    revenue: 11160,
  },
  {
    name: "Starter Plan",
    sales: 325,
    revenue: 9750,
  },
  {
    name: "Enterprise Plan",
    sales: 74,
    revenue: 8880,
  },
  {
    name: "Basic Plan",
    sales: 214,
    revenue: 6420,
  },
];

const monthlyOrders = [
  { month: "Jan", orders: 82 },
  { month: "Feb", orders: 96 },
  { month: "Mar", orders: 104 },
  { month: "Apr", orders: 118 },
  { month: "May", orders: 132 },
  { month: "Jun", orders: 126 },
  { month: "Jul", orders: 148 },
  { month: "Aug", orders: 164 },
  { month: "Sep", orders: 157 },
  { month: "Oct", orders: 181 },
  { month: "Nov", orders: 194 },
  { month: "Dec", orders: 218 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("This Year");
  const [isExporting, setIsExporting] = useState(false);

  const analytics = useMemo(() => {
    const totalRevenue = revenueData.reduce(
      (total, item) => total + item.revenue,
      0,
    );

    const totalOrders = monthlyOrders.reduce(
      (total, item) => total + item.orders,
      0,
    );

    const totalUsers =
      userGrowthData[userGrowthData.length - 1]?.users ?? 0;

    const averageOrderValue =
      totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
      totalRevenue,
      totalOrders,
      totalUsers,
      averageOrderValue,
    };
  }, []);

  const maxRevenue = Math.max(
    ...revenueData.map((item) => item.revenue),
  );

  const maxUsers = Math.max(
    ...userGrowthData.map((item) => item.users),
  );

  const maxOrders = Math.max(
    ...monthlyOrders.map((item) => item.orders),
  );

  const handleExport = () => {
    setIsExporting(true);

    try {
      const rows = [
        ["Month", "Revenue", "Orders", "Users"],
        ...revenueData.map((item, index) => [
          item.month,
          item.revenue.toString(),
          monthlyOrders[index]?.orders.toString() ?? "0",
          userGrowthData[index]?.users.toString() ?? "0",
        ]),
      ];

      const csvContent = rows
        .map((row) =>
          row
            .map((value) => `"${value.replace(/"/g, '""')}"`)
            .join(","),
        )
        .join("\n");

      const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "analytics-report.csv";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Analytics
                </h1>

                <p className="text-sm text-slate-500">
                  Track your business performance and growth
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Period Filter */}
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <select
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
                className="h-10 appearance-none rounded-lg border border-slate-300 bg-white pl-9 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              >
                <option>This Year</option>
                <option>Last 6 Months</option>
                <option>Last 3 Months</option>
                <option>This Month</option>
              </select>
            </div>

            {/* Export */}
            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Download className="h-4 w-4" />

              {isExporting ? "Exporting..." : "Export"}
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Revenue */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Revenue
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {formatCurrency(analytics.totalRevenue)}
                </h2>

                <div className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-600">
                  <ArrowUp className="h-4 w-4" />
                  18.4%

                  <span className="font-normal text-slate-400">
                    vs last year
                  </span>
                </div>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <DollarSign className="h-5 w-5 text-slate-700" />
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Orders
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {analytics.totalOrders.toLocaleString()}
                </h2>

                <div className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-600">
                  <ArrowUp className="h-4 w-4" />
                  12.8%

                  <span className="font-normal text-slate-400">
                    vs last year
                  </span>
                </div>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <ShoppingCart className="h-5 w-5 text-slate-700" />
              </div>
            </div>
          </div>

          {/* Users */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Users
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {analytics.totalUsers.toLocaleString()}
                </h2>

                <div className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-600">
                  <ArrowUp className="h-4 w-4" />
                  24.6%

                  <span className="font-normal text-slate-400">
                    vs last year
                  </span>
                </div>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <Users className="h-5 w-5 text-slate-700" />
              </div>
            </div>
          </div>

          {/* Average Order */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Average Order
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {formatCurrency(analytics.averageOrderValue)}
                </h2>

                <div className="mt-2 flex items-center gap-1 text-sm font-medium text-red-500">
                  <ArrowDown className="h-4 w-4" />
                  3.2%

                  <span className="font-normal text-slate-400">
                    vs last year
                  </span>
                </div>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <TrendingUp className="h-5 w-5 text-slate-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Revenue + User Growth */}
        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          {/* Revenue Chart */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Revenue Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Monthly revenue performance
                </p>
              </div>

              <div className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                {period}
              </div>
            </div>

            <div className="flex h-72 gap-3">
              {/* Y Axis */}
              <div className="flex flex-col justify-between pb-7 text-right text-xs text-slate-400">
                <span>$13k</span>
                <span>$10k</span>
                <span>$7k</span>
                <span>$4k</span>
                <span>$0</span>
              </div>

              {/* Chart */}
              <div className="relative flex flex-1 items-end gap-2 border-b border-l border-slate-200 px-2 pb-7 pt-4">
                <div className="pointer-events-none absolute inset-x-0 top-4 flex flex-col">
                  <div className="border-t border-dashed border-slate-200" />
                  <div className="mt-[49px] border-t border-dashed border-slate-200" />
                  <div className="mt-[49px] border-t border-dashed border-slate-200" />
                  <div className="mt-[49px] border-t border-dashed border-slate-200" />
                </div>

                {revenueData.map((item) => {
                  const height = Math.max(
                    (item.revenue / maxRevenue) * 100,
                    8,
                  );

                  return (
                    <div
                      key={item.month}
                      className="group relative flex h-full flex-1 items-end justify-center"
                    >
                      <div
                        className="w-full max-w-7 rounded-t-md bg-slate-900 transition-all duration-200 group-hover:bg-slate-700"
                        style={{
                          height: `${height}%`,
                        }}
                        title={`${item.month}: ${formatCurrency(item.revenue)}`}
                      />

                      <span className="absolute -bottom-6 text-[11px] text-slate-400">
                        {item.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* User Growth */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  User Growth
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Total registered users by month
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                <Users className="h-4 w-4 text-slate-700" />
              </div>
            </div>

            <div className="flex h-72 gap-3">
              {/* Y Axis */}
              <div className="flex flex-col justify-between pb-7 text-right text-xs text-slate-400">
                <span>800</span>
                <span>600</span>
                <span>400</span>
                <span>200</span>
                <span>0</span>
              </div>

              {/* Chart */}
              <div className="relative flex flex-1 items-end gap-2 border-b border-l border-slate-200 px-2 pb-7 pt-4">
                <div className="pointer-events-none absolute inset-x-0 top-4 flex flex-col">
                  <div className="border-t border-dashed border-slate-200" />
                  <div className="mt-[49px] border-t border-dashed border-slate-200" />
                  <div className="mt-[49px] border-t border-dashed border-slate-200" />
                  <div className="mt-[49px] border-t border-dashed border-slate-200" />
                </div>

                {userGrowthData.map((item) => {
                  const height = Math.max(
                    (item.users / maxUsers) * 100,
                    8,
                  );

                  return (
                    <div
                      key={item.month}
                      className="group relative flex h-full flex-1 items-end justify-center"
                    >
                      <div
                        className="w-full max-w-7 rounded-t-md bg-slate-500 transition-all duration-200 group-hover:bg-slate-700"
                        style={{
                          height: `${height}%`,
                        }}
                        title={`${item.month}: ${item.users} users`}
                      />

                      <span className="absolute -bottom-6 text-[11px] text-slate-400">
                        {item.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Orders + Product Performance */}
        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.2fr]">
          {/* Orders Overview */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Orders Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Monthly order volume
              </p>
            </div>

            <div className="space-y-4">
              {monthlyOrders.slice(-6).map((item) => {
                const percentage = (item.orders / maxOrders) * 100;

                return (
                  <div key={item.month}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-700">
                        {item.month}
                      </span>

                      <span className="text-slate-500">
                        {item.orders} orders
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-slate-900 transition-all"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Product Performance */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Product Performance
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Best performing products
                </p>
              </div>

              <BarChart3 className="h-5 w-5 text-slate-400" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">
                      Product
                    </th>

                    <th className="px-5 py-3 font-medium">
                      Sales
                    </th>

                    <th className="px-5 py-3 text-right font-medium">
                      Revenue
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {productPerformance.map((product) => (
                    <tr
                      key={product.name}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                            <ShoppingCart className="h-4 w-4 text-slate-600" />
                          </div>

                          <span className="font-medium text-slate-900">
                            {product.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {product.sales}
                      </td>

                      <td className="px-5 py-4 text-right font-semibold text-slate-900">
                        {formatCurrency(product.revenue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Performance Summary
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                A quick overview of your current business performance.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-slate-50 px-4 py-3">
                <p className="text-xs text-slate-500">
                  Revenue Growth
                </p>

                <p className="mt-1 font-semibold text-emerald-600">
                  +18.4%
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 px-4 py-3">
                <p className="text-xs text-slate-500">
                  User Growth
                </p>

                <p className="mt-1 font-semibold text-emerald-600">
                  +24.6%
                </p>
              </div>

              <div className="col-span-2 rounded-lg bg-slate-50 px-4 py-3 sm:col-span-1">
                <p className="text-xs text-slate-500">
                  Order Growth
                </p>

                <p className="mt-1 font-semibold text-emerald-600">
                  +12.8%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}