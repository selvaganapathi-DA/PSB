"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { vendors as initialVendors } from "@/lib/mockData";
import { GridColDef } from "@mui/x-data-grid";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";
import { Vendor } from "@/types";

export default function VendorsPage() {
  const { toast } = useToast();
  const [vendorsList, setVendorsList] = useState<Vendor[]>(initialVendors);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");

  const handleAddClick = () => {
    setSelectedVendor(null);
    setName("");
    setCategory("");
    setContactPerson("");
    setPhone("");
    setEmail("");
    setRating("");
    setModalOpen(true);
  };

  const handleEditClick = (v: Vendor) => {
    setSelectedVendor(v);
    setName(v.name);
    setCategory(v.category);
    setContactPerson(v.contactPerson);
    setPhone(v.phone);
    setEmail(v.email);
    setRating(String(v.rating));
    setModalOpen(true);
  };

  const handleDeleteVendor = (id: string) => {
    if (confirm("Are you sure you want to delete this vendor?")) {
      setVendorsList((prev) => prev.filter((v) => v.id !== id));
      toast("Vendor deleted successfully!");
    }
  };

  const handleSaveVendor = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !category.trim() || !contactPerson.trim() || !phone.trim() || !email.trim() || !rating) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const vData = {
      name,
      category,
      contactPerson,
      phone,
      email,
      rating: parseFloat(rating),
    };

    if (selectedVendor) {
      setVendorsList((prev) =>
        prev.map((v) => (v.id === selectedVendor.id ? { ...v, ...vData } : v))
      );
      toast("Vendor updated successfully!");
    } else {
      const newVendor: Vendor = {
        id: `v-${Date.now()}`,
        ...vData,
      };
      setVendorsList((prev) => [...prev, newVendor]);
      toast("Vendor added successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Supplier/Vendor Name", flex: 2 },
    { field: "category", headerName: "Supply Category", flex: 1.2 },
    { field: "contactPerson", headerName: "Contact Person", flex: 1.5 },
    { field: "phone", headerName: "Phone Number", flex: 1.2 },
    { field: "email", headerName: "Email Address", flex: 1.8 },
    { field: "rating", headerName: "Vendor Rating", flex: 1, valueFormatter: (v: any) => `${v} ⭐` },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (p) => (
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => handleEditClick(p.row as Vendor)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Vendor"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteVendor(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Vendor"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
            Suppliers & Vendors
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Directory of registered material, electrical, and concrete supply partners.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Vendor
        </button>
      </div>

      <DataTable rows={vendorsList} columns={columns} searchPlaceholder="Search vendors..." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedVendor ? "Edit Vendor Details" : "Add New Vendor"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveVendor} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Vendor Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sri Balaji Steel Traders"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Supply Category *
              </label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Steel, Cement"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Contact Person *
              </label>
              <input
                type="text"
                required
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="e.g. Sundaram Balaji"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Phone Number *
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 98400 11223"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. sales@balajisteel.in"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
              Vendor Rating (1-5) *
            </label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              required
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="e.g. 4.8"
              className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-xl border border-concrete-100 bg-white px-4 py-2.5 text-[12.5px] font-semibold text-concrete-600 hover:bg-concrete-50 dark:border-white/5 dark:bg-blueprint-850 dark:text-blueprint-200 dark:hover:bg-blueprint-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white hover:bg-signal-orange/90"
            >
              Save Vendor
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
