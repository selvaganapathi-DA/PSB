"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { customers as initialCustomers } from "@/lib/mockData";
import { GridColDef } from "@mui/x-data-grid";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";
import { Customer } from "@/types";

export default function CustomersPage() {
  const { toast } = useToast();
  const [customersList, setCustomersList] = useState<Customer[]>(initialCustomers);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectsActive, setProjectsActive] = useState("");

  const handleAddClick = () => {
    setSelectedCustomer(null);
    setName("");
    setCompany("");
    setPhone("");
    setEmail("");
    setProjectsActive("");
    setModalOpen(true);
  };

  const handleEditClick = (c: Customer) => {
    setSelectedCustomer(c);
    setName(c.name);
    setCompany(c.company);
    setPhone(c.phone);
    setEmail(c.email);
    setProjectsActive(String(c.projectsActive));
    setModalOpen(true);
  };

  const handleDeleteCustomer = (id: string) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      setCustomersList((prev) => prev.filter((c) => c.id !== id));
      toast("Customer deleted successfully!");
    }
  };

  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !company.trim() || !phone.trim() || !email.trim() || !projectsActive) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const cData = {
      name,
      company,
      phone,
      email,
      projectsActive: parseInt(projectsActive, 10),
    };

    if (selectedCustomer) {
      setCustomersList((prev) =>
        prev.map((c) => (c.id === selectedCustomer.id ? { ...c, ...cData } : c))
      );
      toast("Customer updated successfully!");
    } else {
      const newCustomer: Customer = {
        id: `cust-${Date.now()}`,
        ...cData,
      };
      setCustomersList((prev) => [...prev, newCustomer]);
      toast("Customer added successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Client Representative", flex: 1.8 },
    { field: "company", headerName: "Company Name", flex: 2 },
    { field: "phone", headerName: "Contact Phone", flex: 1.2 },
    { field: "email", headerName: "Email Address", flex: 1.8 },
    { field: "projectsActive", headerName: "Active Projects Deployed", flex: 1.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (p) => (
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => handleEditClick(p.row as Customer)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Customer"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteCustomer(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Customer"
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
            Client Directory
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Monitor contact profiles, active sites, and commercial billing details of project owners.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Customer
        </button>
      </div>

      <DataTable rows={customersList} columns={columns} searchPlaceholder="Search customers..." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedCustomer ? "Edit Customer Details" : "Add New Customer"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveCustomer} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Client Representative *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. PSB"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Ganga Housing Pvt Ltd"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Contact Phone *
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 44 2828 0000"
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
                placeholder="e.g. admin@gangahousing.com"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Active Projects *
              </label>
              <input
                type="number"
                required
                value={projectsActive}
                onChange={(e) => setProjectsActive(e.target.value)}
                placeholder="e.g. 2"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
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
              Save Customer
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
