"use client";

import Link from "next/link";

import { useMemo, useState } from "react";
import {
  Edit,
  Filter,
  Plus,
  Search,
  Trash2,
  Users as UsersIcon,
  X,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive" | "Pending";
  joined: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
}

const initialUsers: User[] = [
  {
    id: "USR-001",
    name: "Arun Kumar",
    email: "arun.kumar@example.com",
    role: "Administrator",
    status: "Active",
    joined: "Jan 12, 2026",
  },
  {
    id: "USR-002",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    role: "Manager",
    status: "Active",
    joined: "Jan 18, 2026",
  },
  {
    id: "USR-003",
    name: "Rahul Menon",
    email: "rahul.menon@example.com",
    role: "User",
    status: "Active",
    joined: "Feb 02, 2026",
  },
  {
    id: "USR-004",
    name: "Sneha Krishnan",
    email: "sneha.krishnan@example.com",
    role: "User",
    status: "Inactive",
    joined: "Feb 14, 2026",
  },
  {
    id: "USR-005",
    name: "Vikram Kumar",
    email: "vikram.kumar@example.com",
    role: "Manager",
    status: "Active",
    joined: "Feb 21, 2026",
  },
  {
    id: "USR-006",
    name: "Anjali Nair",
    email: "anjali.nair@example.com",
    role: "User",
    status: "Active",
    joined: "Mar 04, 2026",
  },
  {
    id: "USR-007",
    name: "Karthik Raj",
    email: "karthik.raj@example.com",
    role: "User",
    status: "Pending",
    joined: "Mar 10, 2026",
  },
  {
    id: "USR-008",
    name: "Meena Devi",
    email: "meena.devi@example.com",
    role: "Manager",
    status: "Active",
    joined: "Mar 16, 2026",
  },
  {
    id: "USR-009",
    name: "Sanjay Kumar",
    email: "sanjay.kumar@example.com",
    role: "User",
    status: "Active",
    joined: "Mar 20, 2026",
  },
  {
    id: "USR-010",
    name: "Divya Raj",
    email: "divya.raj@example.com",
    role: "Manager",
    status: "Inactive",
    joined: "Mar 25, 2026",
  },
  {
    id: "USR-011",
    name: "Aditya Sharma",
    email: "aditya.sharma@example.com",
    role: "User",
    status: "Active",
    joined: "Apr 02, 2026",
  },
  {
    id: "USR-012",
    name: "Nithya Menon",
    email: "nithya.menon@example.com",
    role: "User",
    status: "Pending",
    joined: "Apr 08, 2026",
  },
];

const statusClasses: Record<User["status"], string> = {
  Active: "bg-emerald-50 text-emerald-600",
  Inactive: "bg-slate-100 text-slate-500",
  Pending: "bg-amber-50 text-amber-600",
};

const avatarClasses = [
  "bg-indigo-100 text-indigo-700",
  "bg-violet-100 text-violet-700",
  "bg-sky-100 text-sky-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active" as User["status"],
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const usersPerPage = 5;

  const filteredUsers = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        search === "" ||
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.id.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, users]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / usersPerPage),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const visibleUsers = filteredUsers.slice(startIndex, endIndex);

  const activeUsers = users.filter(
    (user) => user.status === "Active",
  ).length;

  const pendingUsers = users.filter(
    (user) => user.status === "Pending",
  ).length;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handlePrevious = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  /* =========================
     ADD USER
  ========================= */

  const handleOpenAddUser = () => {
    setEditingUser(null);

    setFormData({
      name: "",
      email: "",
      role: "User",
      status: "Active",
    });

    setFormErrors({});
    setIsUserFormOpen(true);
  };

  /* =========================
     EDIT USER
  ========================= */

  const handleOpenEditUser = (user: User) => {
    setEditingUser(user);

    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });

    setFormErrors({});
    setIsUserFormOpen(true);
  };

  /* =========================
     CLOSE FORM
  ========================= */

  const handleCloseUserForm = () => {
    setIsUserFormOpen(false);
    setEditingUser(null);
    setFormErrors({});
  };

  /* =========================
     VIEW USER
  ========================= */

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseViewUser = () => {
    setSelectedUser(null);
  };

  /* =========================
     DELETE USER
  ========================= */

  const handleOpenDeleteUser = (user: User) => {
    setUserToDelete(user);
  };

  const handleCloseDeleteUser = () => {
    setUserToDelete(null);
  };

  const handleDeleteUser = () => {
    if (!userToDelete) {
      return;
    }

    const deletedUserId = userToDelete.id;

    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== deletedUserId),
    );

    setUserToDelete(null);

    setCurrentPage((page) => {
      const remainingUsers = users.filter(
        (user) => user.id !== deletedUserId,
      );

      const search = searchTerm.trim().toLowerCase();

      const remainingFilteredUsers = remainingUsers.filter((user) => {
        const matchesSearch =
          search === "" ||
          user.name.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search) ||
          user.id.toLowerCase().includes(search);

        const matchesStatus =
          statusFilter === "All" || user.status === statusFilter;

        return matchesSearch && matchesStatus;
      });

      const newTotalPages = Math.max(
        1,
        Math.ceil(remainingFilteredUsers.length / usersPerPage),
      );

      return Math.min(page, newTotalPages);
    });
  };

  /* =========================
     FORM CHANGE
  ========================= */

  const handleFormChange = (
    field: keyof typeof formData,
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setFormErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  };

  /* =========================
     VALIDATION
  ========================= */

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (!name) {
      errors.name = "Full name is required.";
    } else if (name.length < 3) {
      errors.name = "Full name must be at least 3 characters.";
    }

    if (!email) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    } else {
      const duplicateEmail = users.some(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase() &&
          user.id !== editingUser?.id,
      );

      if (duplicateEmail) {
        errors.email = "A user with this email already exists.";
      }
    }

    if (!formData.role) {
      errors.role = "Please select a role.";
    }

    if (!formData.status) {
      errors.status = "Please select a status.";
    }

    return errors;
  };

  /* =========================
     SAVE ADD / EDIT
  ========================= */

  const handleSaveUser = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editingUser) {
      // EDIT EXISTING USER
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                name: formData.name.trim(),
                email: formData.email.trim(),
                role: formData.role,
                status: formData.status,
              }
            : user,
        ),
      );
    } else {
      // ADD NEW USER
      const nextUserNumber =
        users.reduce((max, user) => {
          const number = Number(
            user.id.replace("USR-", ""),
          );

          return Number.isNaN(number)
            ? max
            : Math.max(max, number);
        }, 0) + 1;

      const newUser: User = {
        id: `USR-${String(nextUserNumber).padStart(3, "0")}`,
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role,
        status: formData.status,
        joined: "Sep 15, 2026",
      };

      setUsers((currentUsers) => [
        newUser,
        ...currentUsers,
      ]);
    }

    setSearchTerm("");
    setStatusFilter("All");
    setCurrentPage(1);

    handleCloseUserForm();
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
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

        <nav className="flex-1 space-y-1 px-3 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <span>▦</span>
            Dashboard
          </Link>

          <Link
            href="/users"
            className="flex items-center gap-3 rounded-lg bg-indigo-50 px-3 py-2.5 text-sm font-medium text-indigo-600"
          >
            <UsersIcon size={19} strokeWidth={1.8} />
            Users
          </Link>

          <Link
            href="/products"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <span>◇</span>
            Products
          </Link>

          <Link
            href="/orders"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <span>🛒</span>
            Orders
          </Link>

          <Link
            href="/analytics"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <span>▥</span>
            Analytics
          </Link>
        </nav>

        <div className="border-t border-slate-200 p-3">
          <Link
            href="/settings"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <span>⚙</span>
            Settings
          </Link>

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

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* HEADER */}

        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              placeholder="Search anything..."
              aria-label="Search"
              className="h-10 w-56 rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:w-64"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Notifications"
              className="relative rounded-lg p-2.5 text-slate-500 transition hover:bg-slate-100"
            >
              <span>♧</span>

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
            </button>

            <div className="h-7 w-px bg-slate-200" />

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                HN
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">
                  Harini N
                </p>

                <p className="text-xs text-slate-500">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE */}

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {/* PAGE TITLE */}

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-medium text-indigo-600">
                  Management
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Users
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Manage users, roles, and account access.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddUser}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Plus size={18} />
                Add User
              </button>
            </div>

            {/* SUMMARY CARDS */}

            <section className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-slate-500">
                  Total Users
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {users.length}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-slate-500">
                  Active Users
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {activeUsers}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-slate-500">
                  Pending Users
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {pendingUsers}
                </p>
              </div>
            </section>

            {/* USERS TABLE */}

            <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              {/* TOOLBAR */}

              <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    All Users
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Showing{" "}
                    {filteredUsers.length === 0
                      ? 0
                      : startIndex + 1}
                    -
                    {Math.min(
                      endIndex,
                      filteredUsers.length,
                    )}{" "}
                    of {filteredUsers.length} matching users
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  {/* SEARCH */}

                  <div className="relative">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="search"
                      value={searchTerm}
                      onChange={(event) =>
                        handleSearchChange(
                          event.target.value,
                        )
                      }
                      placeholder="Search users..."
                      aria-label="Search users"
                      className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:w-48"
                    />
                  </div>

                  {/* STATUS FILTER */}

                  <div className="relative">
                    <Filter
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                      value={statusFilter}
                      onChange={(event) =>
                        handleStatusChange(
                          event.target.value,
                        )
                      }
                      aria-label="Filter users by status"
                      className="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-8 text-xs font-medium text-slate-600 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 sm:w-36"
                    >
                      <option value="All">
                        All Status
                      </option>

                      <option value="Active">
                        Active
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>

                      <option value="Pending">
                        Pending
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* TABLE */}

              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        User
                      </th>

                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        User ID
                      </th>

                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Role
                      </th>

                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Status
                      </th>

                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Joined
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {visibleUsers.length > 0 ? (
                      visibleUsers.map((user, index) => {
                        const initials = user.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("");

                        return (
                          <tr
                            key={user.id}
                            className="transition hover:bg-slate-50"
                          >
                            {/* USER */}

                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                                    avatarClasses[
                                      (startIndex + index) %
                                        avatarClasses.length
                                    ]
                                  }`}
                                >
                                  {initials}
                                </div>

                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold text-slate-800">
                                    {user.name}
                                  </p>

                                  <p className="truncate text-xs text-slate-500">
                                    {user.email}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* ID */}

                            <td className="px-5 py-4 text-sm font-medium text-slate-600">
                              {user.id}
                            </td>

                            {/* ROLE */}

                            <td className="px-5 py-4 text-sm text-slate-600">
                              {user.role}
                            </td>

                            {/* STATUS */}

                            <td className="px-5 py-4">
                              <span
                                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                  statusClasses[user.status]
                                }`}
                              >
                                {user.status}
                              </span>
                            </td>

                            {/* JOINED */}

                            <td className="px-5 py-4 text-sm text-slate-500">
                              {user.joined}
                            </td>

                            {/* ACTIONS */}

                            <td className="px-5 py-4">
                              <div className="flex items-center justify-end gap-4">
                                {/* VIEW */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleViewUser(user)
                                  }
                                  className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-700"
                                >
                                  View
                                </button>

                                {/* EDIT */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleOpenEditUser(
                                      user,
                                    )
                                  }
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition hover:text-indigo-600"
                                >
                                  <Edit
                                    size={14}
                                    strokeWidth={2}
                                  />

                                  Edit
                                </button>

                                {/* DELETE */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleOpenDeleteUser(user)
                                  }
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 transition hover:text-rose-600"
                                >
                                  <Trash2
                                    size={14}
                                    strokeWidth={2}
                                  />

                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-5 py-12 text-center"
                        >
                          <div className="flex flex-col items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                              <Search
                                size={18}
                                className="text-slate-400"
                              />
                            </div>

                            <p className="mt-3 text-sm font-semibold text-slate-800">
                              No users found
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              Try changing your search
                              or filter.
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}

              <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500">
                  Page{" "}
                  <span className="font-semibold text-slate-700">
                    {safeCurrentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-700">
                    {totalPages}
                  </span>
                </p>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={safeCurrentPage === 1}
                    className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
                  >
                    Previous
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() =>
                        setCurrentPage(page)
                      }
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                        safeCurrentPage === page
                          ? "bg-indigo-600 text-white"
                          : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={
                      safeCurrentPage === totalPages
                    }
                    className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
                  >
                    Next
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* =========================
          ADD / EDIT MODAL
      ========================= */}

      {isUserFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseUserForm();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-form-title"
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
          >
            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2
                  id="user-form-title"
                  className="text-lg font-semibold text-slate-900"
                >
                  {editingUser ? "Edit User" : "Add User"}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {editingUser
                    ? "Update the user account information."
                    : "Create a new user account."}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseUserForm}
                aria-label="Close user form"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={19} />
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleSaveUser}>
              <div className="space-y-5 px-6 py-6">
                {/* NAME */}

                <div>
                  <label
                    htmlFor="user-name"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Full Name
                    <span className="ml-1 text-rose-500">
                      *
                    </span>
                  </label>

                  <input
                    id="user-name"
                    type="text"
                    value={formData.name}
                    onChange={(event) =>
                      handleFormChange(
                        "name",
                        event.target.value,
                      )
                    }
                    placeholder="Enter full name"
                    className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                      formErrors.name
                        ? "border-rose-400 focus:border-rose-400 focus:ring-rose-100"
                        : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                    }`}
                  />

                  {formErrors.name && (
                    <p className="mt-1.5 text-xs text-rose-500">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="user-email"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Email Address
                    <span className="ml-1 text-rose-500">
                      *
                    </span>
                  </label>

                  <input
                    id="user-email"
                    type="email"
                    value={formData.email}
                    onChange={(event) =>
                      handleFormChange(
                        "email",
                        event.target.value,
                      )
                    }
                    placeholder="Enter email address"
                    className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                      formErrors.email
                        ? "border-rose-400 focus:border-rose-400 focus:ring-rose-100"
                        : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                    }`}
                  />

                  {formErrors.email && (
                    <p className="mt-1.5 text-xs text-rose-500">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* ROLE / STATUS */}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="user-role"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Role
                      <span className="ml-1 text-rose-500">
                        *
                      </span>
                    </label>

                    <select
                      id="user-role"
                      value={formData.role}
                      onChange={(event) =>
                        handleFormChange(
                          "role",
                          event.target.value,
                        )
                      }
                      className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="User">User</option>

                      <option value="Manager">
                        Manager
                      </option>

                      <option value="Administrator">
                        Administrator
                      </option>
                    </select>

                    {formErrors.role && (
                      <p className="mt-1.5 text-xs text-rose-500">
                        {formErrors.role}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="user-status"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Status
                      <span className="ml-1 text-rose-500">
                        *
                      </span>
                    </label>

                    <select
                      id="user-status"
                      value={formData.status}
                      onChange={(event) =>
                        handleFormChange(
                          "status",
                          event.target.value,
                        )
                      }
                      className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="Active">
                        Active
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>

                      <option value="Pending">
                        Pending
                      </option>
                    </select>

                    {formErrors.status && (
                      <p className="mt-1.5 text-xs text-rose-500">
                        {formErrors.status}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* MODAL FOOTER */}

              <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
                <button
                  type="button"
                  onClick={handleCloseUserForm}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {editingUser
                    ? "Save Changes"
                    : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================
          VIEW USER MODAL
      ========================= */}

      {selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseViewUser();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="view-user-title"
            className="w-full max-w-md rounded-2xl bg-white shadow-2xl"
          >
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2
                  id="view-user-title"
                  className="text-lg font-semibold text-slate-900"
                >
                  User Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  View user account information.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseViewUser}
                aria-label="Close user details"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={19} />
              </button>
            </div>

            {/* DETAILS */}

            <div className="px-6 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-lg font-semibold text-indigo-700">
                  {selectedUser.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-base font-semibold text-slate-900">
                    {selectedUser.name}
                  </h3>

                  <p className="mt-1 truncate text-sm text-slate-500">
                    {selectedUser.email}
                  </p>
                </div>
              </div>

              <div className="mt-6 divide-y divide-slate-100 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-xs font-medium text-slate-500">
                    User ID
                  </span>

                  <span className="text-sm font-semibold text-slate-800">
                    {selectedUser.id}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-xs font-medium text-slate-500">
                    Role
                  </span>

                  <span className="text-sm font-medium text-slate-700">
                    {selectedUser.role}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-xs font-medium text-slate-500">
                    Status
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      statusClasses[selectedUser.status]
                    }`}
                  >
                    {selectedUser.status}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-xs font-medium text-slate-500">
                    Joined
                  </span>

                  <span className="text-sm font-medium text-slate-700">
                    {selectedUser.joined}
                  </span>
                </div>
              </div>
            </div>

            {/* FOOTER */}

            <div className="flex justify-end border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={handleCloseViewUser}
                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* =========================
          DELETE USER CONFIRMATION MODAL
      ========================= */}

      {userToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseDeleteUser();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-user-title"
            className="w-full max-w-md rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2
                  id="delete-user-title"
                  className="text-lg font-semibold text-slate-900"
                >
                  Delete User
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  This action cannot be undone.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseDeleteUser}
                aria-label="Close delete confirmation"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={19} />
              </button>
            </div>

            <div className="px-6 py-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                  <Trash2 size={20} />
                </div>

                <div>
                  <p className="text-sm leading-6 text-slate-600">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-slate-900">
                      {userToDelete.name}
                    </span>
                    ?
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    The user account and its information will be
                    removed from this table.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={handleCloseDeleteUser}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteUser}
                className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              >
                <Trash2 size={16} />
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}