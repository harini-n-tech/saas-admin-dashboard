"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  Bell,
  Check,
  Lock,
  Palette,
  Save,
  Settings as SettingsIcon,
  User,
} from "lucide-react";

interface SettingsForm {
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  emailNotifications: boolean;
  orderNotifications: boolean;
  marketingEmails: boolean;
  darkMode: boolean;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialSettings: SettingsForm = {
  fullName: "Harini N",
  email: "harini@example.com",
  phone: "+91 98765 43210",
  jobTitle: "Frontend Developer",
  emailNotifications: true,
  orderNotifications: true,
  marketingEmails: false,
  darkMode: false,
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function SettingsPage() {
  const [settings, setSettings] =
    useState<SettingsForm>(initialSettings);

  const [activeSection, setActiveSection] =
    useState("profile");

  const [message, setMessage] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);

  /*
   * Load saved theme when the page opens.
   */
  useEffect(() => {
    const savedTheme =
      localStorage.getItem("dashboard-theme");

    const isDark = savedTheme === "dark";

    document.documentElement.classList.toggle(
      "dark",
      isDark,
    );

    setSettings((previous) => ({
      ...previous,
      darkMode: isDark,
    }));

    setIsLoaded(true);
  }, []);

  /*
   * Update normal settings fields.
   */
  const updateField = <K extends keyof SettingsForm>(
    field: K,
    value: SettingsForm[K],
  ) => {
    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }));

    setMessage("");
  };

  /*
   * Handle Dark Mode immediately.
   */
  const handleDarkModeChange = (
    enabled: boolean,
  ) => {
    setSettings((previous) => ({
      ...previous,
      darkMode: enabled,
    }));

    document.documentElement.classList.toggle(
      "dark",
      enabled,
    );

    localStorage.setItem(
      "dashboard-theme",
      enabled ? "dark" : "light",
    );

    setMessage("");
  };

  /*
   * Save settings.
   */
  const handleSave = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      settings.newPassword &&
      settings.newPassword !==
        settings.confirmPassword
    ) {
      setMessage(
        "New password and confirm password do not match.",
      );

      return;
    }

    localStorage.setItem(
      "dashboard-theme",
      settings.darkMode
        ? "dark"
        : "light",
    );

    document.documentElement.classList.toggle(
      "dark",
      settings.darkMode,
    );

    setMessage(
      "Settings saved successfully.",
    );
  };

  const navigationItems = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "security",
      label: "Security",
      icon: Lock,
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: Palette,
    },
  ];

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 transition-colors duration-200 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 dark:bg-white">
              <SettingsIcon className="h-5 w-5 text-white dark:text-slate-900" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Settings
              </h1>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Manage your account and application preferences
              </p>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="grid gap-6 lg:grid-cols-[230px_1fr]">
          {/* Settings Navigation */}
          <div className="h-fit rounded-xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;

                const isActive =
                  activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveSection(item.id);
                      setMessage("");
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                      isActive
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />

                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <form
            onSubmit={handleSave}
            className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
          >
            {/* =====================================================
                PROFILE
               ===================================================== */}

            {activeSection === "profile" && (
              <div>
                <div className="border-b border-slate-200 p-6 dark:border-slate-700">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Profile Information
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Update your personal and professional information.
                  </p>
                </div>

                <div className="space-y-6 p-6">
                  {/* Profile Avatar */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-xl font-bold text-white dark:bg-white dark:text-slate-900">
                      HN
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {settings.fullName ||
                          "Your Name"}
                      </p>

                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {settings.jobTitle ||
                          "Job Title"}
                      </p>
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="grid gap-5 md:grid-cols-2">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Full Name
                      </label>

                      <input
                        id="fullName"
                        type="text"
                        value={settings.fullName}
                        onChange={(event) =>
                          updateField(
                            "fullName",
                            event.target.value,
                          )
                        }
                        className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-white"
                        placeholder="Enter your name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(event) =>
                          updateField(
                            "email",
                            event.target.value,
                          )
                        }
                        className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-white"
                        placeholder="Enter your email"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        type="tel"
                        value={settings.phone}
                        onChange={(event) =>
                          updateField(
                            "phone",
                            event.target.value,
                          )
                        }
                        className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-white"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    {/* Job Title */}
                    <div>
                      <label
                        htmlFor="jobTitle"
                        className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Job Title
                      </label>

                      <input
                        id="jobTitle"
                        type="text"
                        value={settings.jobTitle}
                        onChange={(event) =>
                          updateField(
                            "jobTitle",
                            event.target.value,
                          )
                        }
                        className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-white"
                        placeholder="Enter your job title"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =====================================================
                NOTIFICATIONS
               ===================================================== */}

            {activeSection === "notifications" && (
              <div>
                <div className="border-b border-slate-200 p-6 dark:border-slate-700">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Notification Preferences
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Choose which notifications you want to receive.
                  </p>
                </div>

                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                  {/* Email Notifications */}
                  <label className="flex cursor-pointer items-center justify-between gap-4 p-6">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        Email Notifications
                      </p>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Receive important updates through email.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={
                        settings.emailNotifications
                      }
                      onChange={(event) =>
                        updateField(
                          "emailNotifications",
                          event.target.checked,
                        )
                      }
                      className="h-5 w-5 accent-slate-900"
                    />
                  </label>

                  {/* Order Notifications */}
                  <label className="flex cursor-pointer items-center justify-between gap-4 p-6">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        Order Notifications
                      </p>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Get notified when an order status changes.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={
                        settings.orderNotifications
                      }
                      onChange={(event) =>
                        updateField(
                          "orderNotifications",
                          event.target.checked,
                        )
                      }
                      className="h-5 w-5 accent-slate-900"
                    />
                  </label>

                  {/* Marketing Emails */}
                  <label className="flex cursor-pointer items-center justify-between gap-4 p-6">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        Marketing Emails
                      </p>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Receive product news and promotional updates.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={
                        settings.marketingEmails
                      }
                      onChange={(event) =>
                        updateField(
                          "marketingEmails",
                          event.target.checked,
                        )
                      }
                      className="h-5 w-5 accent-slate-900"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* =====================================================
                SECURITY
               ===================================================== */}

            {activeSection === "security" && (
              <div>
                <div className="border-b border-slate-200 p-6 dark:border-slate-700">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Security
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Update your password and keep your account secure.
                  </p>
                </div>

                <div className="space-y-5 p-6">
                  {/* Current Password */}
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Current Password
                    </label>

                    <input
                      id="currentPassword"
                      type="password"
                      value={
                        settings.currentPassword
                      }
                      onChange={(event) =>
                        updateField(
                          "currentPassword",
                          event.target.value,
                        )
                      }
                      className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-white"
                      placeholder="Enter current password"
                    />
                  </div>

                  {/* New Password */}
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      New Password
                    </label>

                    <input
                      id="newPassword"
                      type="password"
                      value={settings.newPassword}
                      onChange={(event) =>
                        updateField(
                          "newPassword",
                          event.target.value,
                        )
                      }
                      className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-white"
                      placeholder="Enter new password"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Confirm New Password
                    </label>

                    <input
                      id="confirmPassword"
                      type="password"
                      value={
                        settings.confirmPassword
                      }
                      onChange={(event) =>
                        updateField(
                          "confirmPassword",
                          event.target.value,
                        )
                      }
                      className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-white"
                      placeholder="Confirm new password"
                    />
                  </div>

                  {/* Requirements */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      Password requirements
                    </p>

                    <ul className="mt-2 space-y-1 text-sm text-slate-500 dark:text-slate-400">
                      <li>
                        • Use at least 8 characters.
                      </li>

                      <li>
                        • Include uppercase and lowercase letters.
                      </li>

                      <li>
                        • Include at least one number.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* =====================================================
                APPEARANCE
               ===================================================== */}

            {activeSection === "appearance" && (
              <div>
                <div className="border-b border-slate-200 p-6 dark:border-slate-700">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Appearance
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Customize how the dashboard looks.
                  </p>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-5 dark:border-slate-700">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        Dark Mode
                      </p>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Use a darker color scheme for the dashboard.
                      </p>
                    </div>

                    {/* Dark Mode Toggle */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={
                        settings.darkMode
                      }
                      onClick={() =>
                        handleDarkModeChange(
                          !settings.darkMode,
                        )
                      }
                      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
                        settings.darkMode
                          ? "bg-slate-900 dark:bg-white"
                          : "bg-slate-300 dark:bg-slate-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 dark:bg-slate-900 ${
                          settings.darkMode
                            ? "translate-x-5"
                            : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Current Theme */}
                  <div className="mt-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-slate-500 dark:text-slate-400" />

                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Current theme:
                        <span className="ml-1 font-semibold text-slate-900 dark:text-white">
                          {settings.darkMode
                            ? "Dark"
                            : "Light"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =====================================================
                FOOTER
               ===================================================== */}

            <div className="flex flex-col gap-3 border-t border-slate-200 p-6 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm">
                {message && (
                  <div
                    className={`flex items-center gap-2 ${
                      message.includes(
                        "successfully",
                      )
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {message.includes(
                      "successfully",
                    ) && (
                      <Check className="h-4 w-4" />
                    )}

                    {message}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                <Save className="h-4 w-4" />

                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}