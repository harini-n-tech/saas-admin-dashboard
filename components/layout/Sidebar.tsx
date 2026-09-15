"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Box,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

const navigationItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    label: "Users",
    icon: Users,
    href: "/users",
  },
  {
    label: "Products",
    icon: Box,
    href: "/products",
  },
  {
    label: "Orders",
    icon: ShoppingCart,
    href: "/orders",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-slate-200 px-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            SaaS<span className="text-indigo-600">Flow</span>
          </h1>

          <p className="mt-0.5 text-xs text-slate-500">
            Admin Dashboard
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Main Menu
        </p>

        {navigationItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon size={19} strokeWidth={1.8} />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-slate-200 p-3">
        <Link
          href="/settings"
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
            pathname.startsWith("/settings")
              ? "bg-indigo-50 text-indigo-600"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Settings size={19} strokeWidth={1.8} />

          <span>Settings</span>
        </Link>

        {/* User */}
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-slate-50 p-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
            HN
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-800">
              Harini N
            </p>

            <p className="truncate text-[11px] text-slate-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}