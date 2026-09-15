"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  CreditCard,
  Edit,
  Eye,
  Filter,
  Package,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  X,
  XCircle,
} from "lucide-react";

interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  quantity: number;
  amount: number;
  orderStatus: "Completed" | "Processing" | "Pending" | "Cancelled";
  paymentStatus: "Paid" | "Pending" | "Failed";
  orderDate: string;
}

interface OrderFormData {
  customer: string;
  email: string;
  product: string;
  quantity: string;
  amount: string;
  orderStatus: Order["orderStatus"];
  paymentStatus: Order["paymentStatus"];
}

interface FormErrors {
  customer?: string;
  email?: string;
  product?: string;
  quantity?: string;
  amount?: string;
}

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "Arun Kumar",
    email: "arun.kumar@example.com",
    product: "Premium Analytics",
    quantity: 2,
    amount: 598,
    orderStatus: "Completed",
    paymentStatus: "Paid",
    orderDate: "Sep 01, 2026",
  },
  {
    id: "ORD-002",
    customer: "Priya Sharma",
    email: "priya.sharma@example.com",
    product: "Cloud Storage Pro",
    quantity: 1,
    amount: 149,
    orderStatus: "Processing",
    paymentStatus: "Paid",
    orderDate: "Sep 03, 2026",
  },
  {
    id: "ORD-003",
    customer: "Rahul Menon",
    email: "rahul.menon@example.com",
    product: "Team Collaboration",
    quantity: 3,
    amount: 597,
    orderStatus: "Pending",
    paymentStatus: "Pending",
    orderDate: "Sep 05, 2026",
  },
  {
    id: "ORD-004",
    customer: "Sneha Krishnan",
    email: "sneha.krishnan@example.com",
    product: "Marketing Suite",
    quantity: 1,
    amount: 249,
    orderStatus: "Completed",
    paymentStatus: "Paid",
    orderDate: "Sep 06, 2026",
  },
  {
    id: "ORD-005",
    customer: "Vikram Kumar",
    email: "vikram.kumar@example.com",
    product: "Customer Support",
    quantity: 2,
    amount: 358,
    orderStatus: "Cancelled",
    paymentStatus: "Failed",
    orderDate: "Sep 07, 2026",
  },
  {
    id: "ORD-006",
    customer: "Anjali Nair",
    email: "anjali.nair@example.com",
    product: "Project Manager",
    quantity: 1,
    amount: 129,
    orderStatus: "Completed",
    paymentStatus: "Paid",
    orderDate: "Sep 08, 2026",
  },
  {
    id: "ORD-007",
    customer: "Karthik Raj",
    email: "karthik.raj@example.com",
    product: "HR Management",
    quantity: 2,
    amount: 438,
    orderStatus: "Processing",
    paymentStatus: "Paid",
    orderDate: "Sep 09, 2026",
  },
  {
    id: "ORD-008",
    customer: "Meena Devi",
    email: "meena.devi@example.com",
    product: "Finance Tracker",
    quantity: 1,
    amount: 189,
    orderStatus: "Pending",
    paymentStatus: "Pending",
    orderDate: "Sep 10, 2026",
  },
  {
    id: "ORD-009",
    customer: "Sanjay Kumar",
    email: "sanjay.kumar@example.com",
    product: "CRM Starter",
    quantity: 4,
    amount: 636,
    orderStatus: "Completed",
    paymentStatus: "Paid",
    orderDate: "Sep 11, 2026",
  },
  {
    id: "ORD-010",
    customer: "Divya Raj",
    email: "divya.raj@example.com",
    product: "Inventory Manager",
    quantity: 2,
    amount: 278,
    orderStatus: "Processing",
    paymentStatus: "Paid",
    orderDate: "Sep 12, 2026",
  },
  {
    id: "ORD-011",
    customer: "Aditya Sharma",
    email: "aditya.sharma@example.com",
    product: "Business Intelligence",
    quantity: 1,
    amount: 349,
    orderStatus: "Completed",
    paymentStatus: "Paid",
    orderDate: "Sep 13, 2026",
  },
  {
    id: "ORD-012",
    customer: "Nithya Menon",
    email: "nithya.menon@example.com",
    product: "Email Automation",
    quantity: 3,
    amount: 357,
    orderStatus: "Cancelled",
    paymentStatus: "Failed",
    orderDate: "Sep 14, 2026",
  },
];

const emptyForm: OrderFormData = {
  customer: "",
  email: "",
  product: "",
  quantity: "",
  amount: "",
  orderStatus: "Pending",
  paymentStatus: "Pending",
};

const products = [
  "Premium Analytics",
  "Cloud Storage Pro",
  "Team Collaboration",
  "Marketing Suite",
  "Customer Support",
  "Project Manager",
  "HR Management",
  "Finance Tracker",
  "CRM Starter",
  "Inventory Manager",
  "Business Intelligence",
  "Email Automation",
];

const ordersPerPage = 5;

const orderStatusClasses: Record<
  Order["orderStatus"],
  string
> = {
  Completed: "bg-emerald-50 text-emerald-700",
  Processing: "bg-blue-50 text-blue-700",
  Pending: "bg-amber-50 text-amber-700",
  Cancelled: "bg-rose-50 text-rose-700",
};

const paymentStatusClasses: Record<
  Order["paymentStatus"],
  string
> = {
  Paid: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Failed: "bg-rose-50 text-rose-700",
};

export default function OrdersPage() {
  const [orders, setOrders] =
    useState<Order[]>(initialOrders);

  const [searchTerm, setSearchTerm] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] =
    useState("All");
  const [paymentStatusFilter, setPaymentStatusFilter] =
    useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const [isOrderFormOpen, setIsOrderFormOpen] =
    useState(false);

  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  const [editingOrder, setEditingOrder] =
    useState<Order | null>(null);

  const [orderToDelete, setOrderToDelete] =
    useState<Order | null>(null);

  const [formData, setFormData] =
    useState<OrderFormData>(emptyForm);

  const [formErrors, setFormErrors] =
    useState<FormErrors>({});

  const filteredOrders = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        search === "" ||
        order.id.toLowerCase().includes(search) ||
        order.customer.toLowerCase().includes(search) ||
        order.email.toLowerCase().includes(search) ||
        order.product.toLowerCase().includes(search);

      const matchesOrderStatus =
        orderStatusFilter === "All" ||
        order.orderStatus === orderStatusFilter;

      const matchesPaymentStatus =
        paymentStatusFilter === "All" ||
        order.paymentStatus === paymentStatusFilter;

      return (
        matchesSearch &&
        matchesOrderStatus &&
        matchesPaymentStatus
      );
    });
  }, [
    orders,
    searchTerm,
    orderStatusFilter,
    paymentStatusFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / ordersPerPage),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const startIndex =
    (safeCurrentPage - 1) * ordersPerPage;

  const visibleOrders = filteredOrders.slice(
    startIndex,
    startIndex + ordersPerPage,
  );

  const totalOrders = orders.length;

  const completedOrders = orders.filter(
    (order) => order.orderStatus === "Completed",
  ).length;

  const processingOrders = orders.filter(
    (order) => order.orderStatus === "Processing",
  ).length;

  const totalRevenue = orders
    .filter((order) => order.paymentStatus === "Paid")
    .reduce((total, order) => total + order.amount, 0);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const openAddOrder = () => {
    setEditingOrder(null);
    setFormData(emptyForm);
    setFormErrors({});
    setIsOrderFormOpen(true);
  };

  const openEditOrder = (order: Order) => {
    setEditingOrder(order);

    setFormData({
      customer: order.customer,
      email: order.email,
      product: order.product,
      quantity: String(order.quantity),
      amount: String(order.amount),
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus,
    });

    setFormErrors({});
    setIsOrderFormOpen(true);
  };

  const closeOrderForm = () => {
    setIsOrderFormOpen(false);
    setEditingOrder(null);
    setFormData(emptyForm);
    setFormErrors({});
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCloseView = () => {
    setSelectedOrder(null);
  };

  const handleOpenDeleteOrder = (order: Order) => {
    setOrderToDelete(order);
  };

  const handleCloseDeleteOrder = () => {
    setOrderToDelete(null);
  };

  const handleDeleteOrder = () => {
    if (!orderToDelete) {
      return;
    }

    const deletedId = orderToDelete.id;

    setOrders((currentOrders) =>
      currentOrders.filter(
        (order) => order.id !== deletedId,
      ),
    );

    setOrderToDelete(null);

    setCurrentPage((page) => Math.min(page, totalPages));
  };

  const handleFormChange = (
    field: keyof OrderFormData,
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

  const validateForm = () => {
    const errors: FormErrors = {};

    const customer = formData.customer.trim();
    const email = formData.email.trim();

    if (!customer) {
      errors.customer = "Customer name is required.";
    } else if (customer.length < 3) {
      errors.customer =
        "Customer name must be at least 3 characters.";
    }

    if (!email) {
      errors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      errors.email = "Enter a valid email address.";
    }

    if (!formData.product) {
      errors.product = "Please select a product.";
    }

    if (!formData.quantity.trim()) {
      errors.quantity = "Quantity is required.";
    } else if (
      !Number.isInteger(Number(formData.quantity)) ||
      Number(formData.quantity) <= 0
    ) {
      errors.quantity = "Enter a valid quantity.";
    }

    if (!formData.amount.trim()) {
      errors.amount = "Amount is required.";
    } else if (
      Number.isNaN(Number(formData.amount)) ||
      Number(formData.amount) < 0
    ) {
      errors.amount = "Enter a valid amount.";
    }

    return errors;
  };

  const handleSaveOrder = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editingOrder) {
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === editingOrder.id
            ? {
                ...order,
                customer: formData.customer.trim(),
                email: formData.email.trim(),
                product: formData.product,
                quantity: Number(formData.quantity),
                amount: Number(formData.amount),
                orderStatus: formData.orderStatus,
                paymentStatus: formData.paymentStatus,
              }
            : order,
        ),
      );
    } else {
      const nextOrderNumber =
        orders.reduce((max, order) => {
          const number = Number(
            order.id.replace("ORD-", ""),
          );

          return Number.isNaN(number)
            ? max
            : Math.max(max, number);
        }, 0) + 1;

      const newOrder: Order = {
        id: `ORD-${String(nextOrderNumber).padStart(
          3,
          "0",
        )}`,
        customer: formData.customer.trim(),
        email: formData.email.trim(),
        product: formData.product,
        quantity: Number(formData.quantity),
        amount: Number(formData.amount),
        orderStatus: formData.orderStatus,
        paymentStatus: formData.paymentStatus,
        orderDate: "Sep 15, 2026",
      };

      setOrders((currentOrders) => [
        newOrder,
        ...currentOrders,
      ]);

      setCurrentPage(1);
    }

    setSearchTerm("");
    setOrderStatusFilter("All");
    setPaymentStatusFilter("All");

    closeOrderForm();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="p-4 sm:p-6 lg:p-8">
        {/* HEADER */}

        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-indigo-600">
              Management
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Orders
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage customer orders and payment status.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddOrder}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Plus size={18} />
            Add Order
          </button>
        </div>

        {/* SUMMARY CARDS */}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Total Orders
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {totalOrders}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <ShoppingCart size={20} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Completed
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {completedOrders}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={20} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Processing
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {processingOrders}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Clock3 size={20} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Paid Revenue
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {formatAmount(totalRevenue)}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <CreditCard size={20} />
              </div>
            </div>
          </div>
        </section>

        {/* ORDERS TABLE */}

        <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* TOOLBAR */}

          <div className="flex flex-col gap-3 border-b border-slate-200 p-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                All Orders
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Showing{" "}
                {filteredOrders.length === 0
                  ? 0
                  : startIndex + 1}{" "}
                -{" "}
                {Math.min(
                  startIndex + ordersPerPage,
                  filteredOrders.length,
                )}{" "}
                of {filteredOrders.length} matching orders
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
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search orders..."
                  aria-label="Search orders"
                  className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:w-48"
                />
              </div>

              {/* ORDER STATUS */}

              <div className="relative">
                <Filter
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={orderStatusFilter}
                  onChange={(event) => {
                    setOrderStatusFilter(
                      event.target.value,
                    );
                    setCurrentPage(1);
                  }}
                  aria-label="Filter orders by order status"
                  className="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-8 text-xs font-medium text-slate-600 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 sm:w-40"
                >
                  <option value="All">
                    All Order Status
                  </option>
                  <option value="Completed">
                    Completed
                  </option>
                  <option value="Processing">
                    Processing
                  </option>
                  <option value="Pending">
                    Pending
                  </option>
                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>
              </div>

              {/* PAYMENT STATUS */}

              <select
                value={paymentStatusFilter}
                onChange={(event) => {
                  setPaymentStatusFilter(
                    event.target.value,
                  );
                  setCurrentPage(1);
                }}
                aria-label="Filter orders by payment status"
                className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 sm:w-36"
              >
                <option value="All">
                  All Payments
                </option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Order
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Customer
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Product
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Amount
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Order Status
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Payment
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Date
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {visibleOrders.length > 0 ? (
                  visibleOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="transition hover:bg-slate-50"
                    >
                      {/* ORDER */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                            <Package size={17} />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              {order.id}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              Qty: {order.quantity}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* CUSTOMER */}

                      <td className="px-5 py-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {order.customer}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {order.email}
                          </p>
                        </div>
                      </td>

                      {/* PRODUCT */}

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {order.product}
                      </td>

                      {/* AMOUNT */}

                      <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                        {formatAmount(order.amount)}
                      </td>

                      {/* ORDER STATUS */}

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${orderStatusClasses[order.orderStatus]}`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>

                      {/* PAYMENT */}

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${paymentStatusClasses[order.paymentStatus]}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>

                      {/* DATE */}

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {order.orderDate}
                      </td>

                      {/* ACTIONS */}

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-4">
                          <button
                            type="button"
                            onClick={() =>
                              handleViewOrder(order)
                            }
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 transition hover:text-indigo-700"
                          >
                            <Eye size={14} />
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openEditOrder(order)
                            }
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition hover:text-indigo-600"
                          >
                            <Edit size={14} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleOpenDeleteOrder(order)
                            }
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 transition hover:text-rose-600"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
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
                          No orders found
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Try changing your search or
                          filters.
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
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(page - 1, 1),
                  )
                }
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
                  onClick={() => setCurrentPage(page)}
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
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(page + 1, totalPages),
                  )
                }
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
      </main>

      {/* ADD / EDIT ORDER MODAL */}

      {isOrderFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeOrderForm();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-form-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2
                  id="order-form-title"
                  className="text-lg font-semibold text-slate-900"
                >
                  {editingOrder
                    ? "Edit Order"
                    : "Add Order"}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {editingOrder
                    ? "Update order information."
                    : "Create a new customer order."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeOrderForm}
                aria-label="Close order form"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleSaveOrder}>
              <div className="space-y-5 px-6 py-6">
                {/* CUSTOMER */}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="order-customer"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Customer Name
                      <span className="ml-1 text-rose-500">
                        *
                      </span>
                    </label>

                    <input
                      id="order-customer"
                      type="text"
                      value={formData.customer}
                      onChange={(event) =>
                        handleFormChange(
                          "customer",
                          event.target.value,
                        )
                      }
                      placeholder="Enter customer name"
                      className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:ring-2 ${
                        formErrors.customer
                          ? "border-rose-400 focus:ring-rose-100"
                          : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                      }`}
                    />

                    {formErrors.customer && (
                      <p className="mt-1.5 text-xs text-rose-500">
                        {formErrors.customer}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="order-email"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Email Address
                      <span className="ml-1 text-rose-500">
                        *
                      </span>
                    </label>

                    <input
                      id="order-email"
                      type="email"
                      value={formData.email}
                      onChange={(event) =>
                        handleFormChange(
                          "email",
                          event.target.value,
                        )
                      }
                      placeholder="Enter email address"
                      className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:ring-2 ${
                        formErrors.email
                          ? "border-rose-400 focus:ring-rose-100"
                          : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                      }`}
                    />

                    {formErrors.email && (
                      <p className="mt-1.5 text-xs text-rose-500">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* PRODUCT */}

                <div>
                  <label
                    htmlFor="order-product"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Product
                    <span className="ml-1 text-rose-500">
                      *
                    </span>
                  </label>

                  <select
                    id="order-product"
                    value={formData.product}
                    onChange={(event) =>
                      handleFormChange(
                        "product",
                        event.target.value,
                      )
                    }
                    className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:ring-2 ${
                      formErrors.product
                        ? "border-rose-400 focus:ring-rose-100"
                        : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                    }`}
                  >
                    <option value="">
                      Select product
                    </option>

                    {products.map((product) => (
                      <option key={product} value={product}>
                        {product}
                      </option>
                    ))}
                  </select>

                  {formErrors.product && (
                    <p className="mt-1.5 text-xs text-rose-500">
                      {formErrors.product}
                    </p>
                  )}
                </div>

                {/* QUANTITY / AMOUNT */}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="order-quantity"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Quantity
                      <span className="ml-1 text-rose-500">
                        *
                      </span>
                    </label>

                    <input
                      id="order-quantity"
                      type="number"
                      min="1"
                      step="1"
                      value={formData.quantity}
                      onChange={(event) =>
                        handleFormChange(
                          "quantity",
                          event.target.value,
                        )
                      }
                      placeholder="Enter quantity"
                      className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:ring-2 ${
                        formErrors.quantity
                          ? "border-rose-400 focus:ring-rose-100"
                          : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                      }`}
                    />

                    {formErrors.quantity && (
                      <p className="mt-1.5 text-xs text-rose-500">
                        {formErrors.quantity}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="order-amount"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Amount
                      <span className="ml-1 text-rose-500">
                        *
                      </span>
                    </label>

                    <input
                      id="order-amount"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.amount}
                      onChange={(event) =>
                        handleFormChange(
                          "amount",
                          event.target.value,
                        )
                      }
                      placeholder="Enter amount"
                      className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:ring-2 ${
                        formErrors.amount
                          ? "border-rose-400 focus:ring-rose-100"
                          : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                      }`}
                    />

                    {formErrors.amount && (
                      <p className="mt-1.5 text-xs text-rose-500">
                        {formErrors.amount}
                      </p>
                    )}
                  </div>
                </div>

                {/* STATUS */}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="order-status"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Order Status
                    </label>

                    <select
                      id="order-status"
                      value={formData.orderStatus}
                      onChange={(event) =>
                        handleFormChange(
                          "orderStatus",
                          event.target.value,
                        )
                      }
                      className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="payment-status"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Payment Status
                    </label>

                    <select
                      id="payment-status"
                      value={formData.paymentStatus}
                      onChange={(event) =>
                        handleFormChange(
                          "paymentStatus",
                          event.target.value,
                        )
                      }
                      className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Paid">Paid</option>

                      <option value="Failed">
                        Failed
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
                <button
                  type="button"
                  onClick={closeOrderForm}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {editingOrder
                    ? "Save Changes"
                    : "Add Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW ORDER MODAL */}

      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseView();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="view-order-title"
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2
                  id="view-order-title"
                  className="text-lg font-semibold text-slate-900"
                >
                  Order Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  View complete order information.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseView}
                aria-label="Close order details"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={19} />
              </button>
            </div>

            <div className="px-6 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <ShoppingCart size={24} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {selectedOrder.id}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedOrder.orderDate}
                  </p>
                </div>
              </div>

              <div className="mt-6 divide-y divide-slate-100 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-xs font-medium text-slate-500">
                    Customer
                  </span>

                  <span className="text-sm font-semibold text-slate-800">
                    {selectedOrder.customer}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-xs font-medium text-slate-500">
                    Email
                  </span>

                  <span className="max-w-[60%] truncate text-sm text-slate-700">
                    {selectedOrder.email}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-xs font-medium text-slate-500">
                    Product
                  </span>

                  <span className="text-sm text-slate-700">
                    {selectedOrder.product}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-xs font-medium text-slate-500">
                    Quantity
                  </span>

                  <span className="text-sm font-semibold text-slate-800">
                    {selectedOrder.quantity}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-xs font-medium text-slate-500">
                    Amount
                  </span>

                  <span className="text-sm font-semibold text-slate-800">
                    {formatAmount(selectedOrder.amount)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-xs font-medium text-slate-500">
                    Order Status
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${orderStatusClasses[selectedOrder.orderStatus]}`}
                  >
                    {selectedOrder.orderStatus}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-xs font-medium text-slate-500">
                    Payment
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${paymentStatusClasses[selectedOrder.paymentStatus]}`}
                  >
                    {selectedOrder.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={handleCloseView}
                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}

      {orderToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseDeleteOrder();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-order-title"
            className="w-full max-w-md rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2
                  id="delete-order-title"
                  className="text-lg font-semibold text-slate-900"
                >
                  Delete Order
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  This action cannot be undone.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseDeleteOrder}
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
                      {orderToDelete.id}
                    </span>
                    ?
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    The order will be removed from the
                    order list.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={handleCloseDeleteOrder}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteOrder}
                className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700"
              >
                <Trash2 size={16} />
                Delete Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}