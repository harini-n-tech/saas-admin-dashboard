"use client";

import { useMemo, useState } from "react";
import {
  Edit,
  Eye,
  Filter,
  Package,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Inactive";
  createdDate: string;
  description: string;
}

interface ProductFormData {
  name: string;
  category: string;
  price: string;
  stock: string;
  status: "Active" | "Inactive";
  description: string;
}

interface FormErrors {
  name?: string;
  category?: string;
  price?: string;
  stock?: string;
  description?: string;
}

const initialProducts: Product[] = [
  {
    id: "PRD001",
    name: "Premium Analytics",
    category: "Software",
    price: 299,
    stock: 120,
    status: "Active",
    createdDate: "2026-01-12",
    description: "Advanced analytics and reporting solution.",
  },
  {
    id: "PRD002",
    name: "Cloud Storage Pro",
    category: "Cloud",
    price: 149,
    stock: 85,
    status: "Active",
    createdDate: "2026-01-18",
    description: "Secure cloud storage for growing teams.",
  },
  {
    id: "PRD003",
    name: "Team Collaboration",
    category: "Productivity",
    price: 199,
    stock: 64,
    status: "Active",
    createdDate: "2026-02-03",
    description: "Collaboration tools for distributed teams.",
  },
  {
    id: "PRD004",
    name: "Marketing Suite",
    category: "Marketing",
    price: 249,
    stock: 42,
    status: "Active",
    createdDate: "2026-02-14",
    description: "Marketing automation and campaign management.",
  },
  {
    id: "PRD005",
    name: "Customer Support",
    category: "Support",
    price: 179,
    stock: 31,
    status: "Inactive",
    createdDate: "2026-02-21",
    description: "Customer support and ticket management platform.",
  },
  {
    id: "PRD006",
    name: "Project Manager",
    category: "Productivity",
    price: 129,
    stock: 73,
    status: "Active",
    createdDate: "2026-03-02",
    description: "Project planning and task management solution.",
  },
  {
    id: "PRD007",
    name: "HR Management",
    category: "HR",
    price: 219,
    stock: 28,
    status: "Active",
    createdDate: "2026-03-09",
    description: "Employee and HR workflow management platform.",
  },
  {
    id: "PRD008",
    name: "Finance Tracker",
    category: "Finance",
    price: 189,
    stock: 19,
    status: "Inactive",
    createdDate: "2026-03-16",
    description: "Financial tracking and reporting software.",
  },
  {
    id: "PRD009",
    name: "CRM Starter",
    category: "CRM",
    price: 159,
    stock: 56,
    status: "Active",
    createdDate: "2026-03-24",
    description: "Customer relationship management for small teams.",
  },
  {
    id: "PRD010",
    name: "Inventory Manager",
    category: "Operations",
    price: 139,
    stock: 91,
    status: "Active",
    createdDate: "2026-04-01",
    description: "Inventory monitoring and stock management system.",
  },
  {
    id: "PRD011",
    name: "Business Intelligence",
    category: "Analytics",
    price: 349,
    stock: 17,
    status: "Active",
    createdDate: "2026-04-07",
    description: "Business intelligence dashboards and insights.",
  },
  {
    id: "PRD012",
    name: "Email Automation",
    category: "Marketing",
    price: 119,
    stock: 44,
    status: "Inactive",
    createdDate: "2026-04-15",
    description: "Automated email campaigns and workflows.",
  },
];

const emptyForm: ProductFormData = {
  name: "",
  category: "",
  price: "",
  stock: "",
  status: "Active",
  description: "",
};

const categories = [
  "Software",
  "Cloud",
  "Productivity",
  "Marketing",
  "Support",
  "HR",
  "Finance",
  "CRM",
  "Operations",
  "Analytics",
];

const usersPerPage = 5;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const [isProductFormOpen, setIsProductFormOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [productToDelete, setProductToDelete] =
    useState<Product | null>(null);

  const [formData, setFormData] =
    useState<ProductFormData>(emptyForm);

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const filteredProducts = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        search === "" ||
        product.name.toLowerCase().includes(search) ||
        product.id.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search);

      const matchesCategory =
        categoryFilter === "All" ||
        product.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" ||
        product.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchTerm, categoryFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / usersPerPage),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * usersPerPage;

    return filteredProducts.slice(
      startIndex,
      startIndex + usersPerPage,
    );
  }, [filteredProducts, safeCurrentPage]);

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.status === "Active",
  ).length;

  const inactiveProducts = products.filter(
    (product) => product.status === "Inactive",
  ).length;

  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0,
  );

  const openAddProduct = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setFormErrors({});
    setIsProductFormOpen(true);
  };

  const openEditProduct = (product: Product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      status: product.status,
      description: product.description,
    });

    setFormErrors({});
    setIsProductFormOpen(true);
  };

  const closeProductForm = () => {
    setIsProductFormOpen(false);
    setEditingProduct(null);
    setFormData(emptyForm);
    setFormErrors({});
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseView = () => {
    setSelectedProduct(null);
  };

  const handleOpenDeleteProduct = (product: Product) => {
    setProductToDelete(product);
  };

  const handleCloseDeleteProduct = () => {
    setProductToDelete(null);
  };

  const handleDeleteProduct = () => {
    if (!productToDelete) {
      return;
    }

    const deletedId = productToDelete.id;

    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product.id !== deletedId,
      ),
    );

    setProductToDelete(null);

    setCurrentPage((page) => Math.min(page, totalPages));
  };

  const handleFormChange = (
    field: keyof ProductFormData,
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

    const trimmedName = formData.name.trim();

    if (!trimmedName) {
      errors.name = "Product name is required.";
    } else if (trimmedName.length < 3) {
      errors.name =
        "Product name must be at least 3 characters.";
    }

    if (!formData.category) {
      errors.category = "Please select a category.";
    }

    if (!formData.price.trim()) {
      errors.price = "Price is required.";
    } else if (
      Number.isNaN(Number(formData.price)) ||
      Number(formData.price) < 0
    ) {
      errors.price = "Enter a valid price.";
    }

    if (!formData.stock.trim()) {
      errors.stock = "Stock is required.";
    } else if (
      !Number.isInteger(Number(formData.stock)) ||
      Number(formData.stock) < 0
    ) {
      errors.stock = "Enter a valid stock quantity.";
    }

    if (formData.description.trim().length > 500) {
      errors.description =
        "Description cannot exceed 500 characters.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSaveProduct = () => {
    if (!validateForm()) {
      return;
    }

    const productName = formData.name.trim();

    const duplicateProduct = products.some(
      (product) =>
        product.name.toLowerCase() === productName.toLowerCase() &&
        product.id !== editingProduct?.id,
    );

    if (duplicateProduct) {
      setFormErrors({
        name: "A product with this name already exists.",
      });

      return;
    }

    if (editingProduct) {
      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                name: productName,
                category: formData.category,
                price: Number(formData.price),
                stock: Number(formData.stock),
                status: formData.status,
                description: formData.description.trim(),
              }
            : product,
        ),
      );
    } else {
      const newProduct: Product = {
        id: `PRD${String(products.length + 1).padStart(3, "0")}`,
        name: productName,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        status: formData.status,
        createdDate: new Date()
          .toISOString()
          .split("T")[0],
        description: formData.description.trim(),
      };

      setProducts((currentProducts) => [
        newProduct,
        ...currentProducts,
      ]);

      setCurrentPage(1);
    }

    closeProductForm();
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(`${date}T00:00:00`));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="p-6 lg:p-8">
        {/* HEADER */}

        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Products
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your products and inventory.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddProduct}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>

        {/* STATISTICS */}

        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Products
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {totalProducts}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Package size={21} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Active Products
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {activeProducts}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Package size={21} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Inactive Products
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {inactiveProducts}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <Package size={21} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Stock
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {totalStock}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Package size={21} />
              </div>
            </div>
          </div>
        </div>

        {/* TABLE CARD */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* FILTER BAR */}

          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-md">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search products..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Filter
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={categoryFilter}
                  onChange={(event) => {
                    setCategoryFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-11 w-full min-w-[180px] appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-9 text-sm text-slate-600 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="All">
                    All Categories
                  </option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="h-11 min-w-[150px] rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Product
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Category
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Price
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Stock
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Created
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            <Package size={18} />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              {product.name}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {product.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {product.category}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                        {formatPrice(product.price)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={
                            product.stock < 25
                              ? "text-sm font-semibold text-rose-600"
                              : "text-sm font-medium text-slate-600"
                          }
                        >
                          {product.stock}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            product.status === "Active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {formatDate(product.createdDate)}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() =>
                              handleViewProduct(product)
                            }
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition hover:text-indigo-600"
                          >
                            <Eye size={14} />
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openEditProduct(product)
                            }
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition hover:text-indigo-600"
                          >
                            <Edit size={14} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleOpenDeleteProduct(product)
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
                      colSpan={7}
                      className="px-5 py-14 text-center"
                    >
                      <Package
                        size={38}
                        className="mx-auto text-slate-300"
                      />

                      <p className="mt-3 text-sm font-semibold text-slate-600">
                        No products found
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}

          <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredProducts.length === 0
                  ? 0
                  : (safeCurrentPage - 1) *
                      usersPerPage +
                    1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-slate-700">
                {Math.min(
                  safeCurrentPage * usersPerPage,
                  filteredProducts.length,
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={safeCurrentPage === 1}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(1, page - 1),
                  )
                }
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
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
                  className={`h-9 w-9 rounded-lg text-sm font-semibold transition ${
                    page === safeCurrentPage
                      ? "bg-indigo-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={safeCurrentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1),
                  )
                }
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ADD / EDIT MODAL */}

      {isProductFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeProductForm();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-form-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2
                  id="product-form-title"
                  className="text-lg font-semibold text-slate-900"
                >
                  {editingProduct
                    ? "Edit Product"
                    : "Add Product"}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {editingProduct
                    ? "Update product information."
                    : "Add a new product to your catalog."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeProductForm}
                aria-label="Close product form"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 px-6 py-6">
              <div>
                <label
                  htmlFor="product-name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Product Name
                </label>

                <input
                  id="product-name"
                  type="text"
                  value={formData.name}
                  onChange={(event) =>
                    handleFormChange(
                      "name",
                      event.target.value,
                    )
                  }
                  placeholder="Enter product name"
                  className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-slate-700 outline-none transition focus:ring-2 ${
                    formErrors.name
                      ? "border-rose-400 focus:ring-rose-100"
                      : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                  }`}
                />

                {formErrors.name && (
                  <p className="mt-1.5 text-xs text-rose-500">
                    {formErrors.name}
                  </p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="product-category"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Category
                  </label>

                  <select
                    id="product-category"
                    value={formData.category}
                    onChange={(event) =>
                      handleFormChange(
                        "category",
                        event.target.value,
                      )
                    }
                    className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-slate-700 outline-none transition focus:ring-2 ${
                      formErrors.category
                        ? "border-rose-400 focus:ring-rose-100"
                        : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                    }`}
                  >
                    <option value="">
                      Select category
                    </option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  {formErrors.category && (
                    <p className="mt-1.5 text-xs text-rose-500">
                      {formErrors.category}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="product-status"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Status
                  </label>

                  <select
                    id="product-status"
                    value={formData.status}
                    onChange={(event) =>
                      handleFormChange(
                        "status",
                        event.target.value as
                          | "Active"
                          | "Inactive",
                      )
                    }
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="product-price"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Price
                  </label>

                  <input
                    id="product-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(event) =>
                      handleFormChange(
                        "price",
                        event.target.value,
                      )
                    }
                    placeholder="Enter price"
                    className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-slate-700 outline-none transition focus:ring-2 ${
                      formErrors.price
                        ? "border-rose-400 focus:ring-rose-100"
                        : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                    }`}
                  />

                  {formErrors.price && (
                    <p className="mt-1.5 text-xs text-rose-500">
                      {formErrors.price}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="product-stock"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Stock
                  </label>

                  <input
                    id="product-stock"
                    type="number"
                    min="0"
                    step="1"
                    value={formData.stock}
                    onChange={(event) =>
                      handleFormChange(
                        "stock",
                        event.target.value,
                      )
                    }
                    placeholder="Enter stock quantity"
                    className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-slate-700 outline-none transition focus:ring-2 ${
                      formErrors.stock
                        ? "border-rose-400 focus:ring-rose-100"
                        : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                    }`}
                  />

                  {formErrors.stock && (
                    <p className="mt-1.5 text-xs text-rose-500">
                      {formErrors.stock}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="product-description"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Description
                </label>

                <textarea
                  id="product-description"
                  value={formData.description}
                  onChange={(event) =>
                    handleFormChange(
                      "description",
                      event.target.value,
                    )
                  }
                  rows={4}
                  placeholder="Enter product description"
                  className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:ring-2 ${
                    formErrors.description
                      ? "border-rose-400 focus:ring-rose-100"
                      : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                  }`}
                />

                {formErrors.description && (
                  <p className="mt-1.5 text-xs text-rose-500">
                    {formErrors.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={closeProductForm}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveProduct}
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                {editingProduct
                  ? "Save Changes"
                  : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}

      {selectedProduct && (
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
            aria-labelledby="view-product-title"
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2
                  id="view-product-title"
                  className="text-lg font-semibold text-slate-900"
                >
                  Product Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  View product information.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseView}
                aria-label="Close product details"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 px-6 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Package size={25} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {selectedProduct.name}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {selectedProduct.id}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Category
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {selectedProduct.category}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Price
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {formatPrice(selectedProduct.price)}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Stock
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {selectedProduct.stock}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Status
                  </p>

                  <span
                    className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      selectedProduct.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {selectedProduct.status}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Created Date
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {formatDate(selectedProduct.createdDate)}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Description
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {selectedProduct.description ||
                    "No description available."}
                </p>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={handleCloseView}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}

      {productToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseDeleteProduct();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-product-title"
            className="w-full max-w-md rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2
                  id="delete-product-title"
                  className="text-lg font-semibold text-slate-900"
                >
                  Delete Product
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  This action cannot be undone.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseDeleteProduct}
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
                      {productToDelete.name}
                    </span>
                    ?
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    The product will be removed from the
                    product list.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={handleCloseDeleteProduct}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteProduct}
                className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                <Trash2 size={16} />
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}