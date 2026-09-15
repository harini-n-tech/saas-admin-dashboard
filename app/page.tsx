"use client";

import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import RecentActivity from "@/components/dashboard/RecentActivity";
import RevenueChart from "@/components/dashboard/RevenueChart";
import StatCard from "@/components/dashboard/StatCard";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-sm font-medium text-indigo-600">
                Overview
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Good morning, Harini 👋
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Here&apos;s what&apos;s happening with your business today.
              </p>
            </div>

            <section
              aria-label="Dashboard statistics"
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              <StatCard
                title="Total Revenue"
                value="$84,240"
                change="+12.5%"
                description="vs last month"
                icon={DollarSign}
              />

              <StatCard
                title="Total Users"
                value="12,480"
                change="+8.2%"
                description="vs last month"
                icon={Users}
              />

              <StatCard
                title="Total Orders"
                value="3,842"
                change="+14.6%"
                description="vs last month"
                icon={ShoppingCart}
              />

              <StatCard
                title="Conversion Rate"
                value="6.84%"
                change="+2.4%"
                description="vs last month"
                icon={TrendingUp}
              />
            </section>

            <section
              aria-label="Revenue and recent activity"
              className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]"
            >
              <RevenueChart />
              <RecentActivity />
            </section>

            <section
              aria-label="Quick overview"
              className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Quick Overview
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Business performance at a glance
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Active Users
                  </p>

                  <p className="mt-2 text-xl font-bold text-slate-900">
                    8,426
                  </p>

                  <p className="mt-1 text-xs text-emerald-600">
                    67.5% of total users
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Pending Orders
                  </p>

                  <p className="mt-2 text-xl font-bold text-slate-900">
                    284
                  </p>

                  <p className="mt-1 text-xs text-amber-600">
                    Requires attention
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Products
                  </p>

                  <p className="mt-2 text-xl font-bold text-slate-900">
                    1,248
                  </p>

                  <p className="mt-1 text-xs text-indigo-600">
                    42 added this month
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}