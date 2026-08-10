"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { invoices as initialInvoices } from "@/lib/mockData";
import { GridColDef } from "@mui/x-data-grid";
import StatusChip from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";
import { Invoice } from "@/types";

export default function InvoicesPage() {
  const { toast } = useToast();
  const [invoicesList, setInvoicesList] = useState<Invoice[]>(initialInvoices);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Form State
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [client, setClient] = useState("");
  const [project, setProject] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Unpaid");

  const handleAddClick = () => {
    setSelectedInvoice(null);
    setInvoiceNumber(`INV-${Date.now().toString().slice(-4)}`);
    setClient("");
    setProject("");
    setAmount("");
    setDueDate("");
    setStatus("Unpaid");
    setModalOpen(true);
  };

  const handleEditClick = (inv: Invoice) => {
    setSelectedInvoice(inv);
    setInvoiceNumber(inv.invoiceNumber);
    setClient(inv.client);
    setProject(inv.project);
    setAmount(String(inv.amount));
    setDueDate(inv.dueDate);
    setStatus(inv.status);
    setModalOpen(true);
  };

  const handleDeleteInvoice = (id: string) => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      setInvoicesList((prev) => prev.filter((i) => i.id !== id));
      toast("Invoice deleted successfully!");
    }
  };

  const handleSaveInvoice = (e: React.FormEvent) => {
    e.preventDefault();

    if (!invoiceNumber.trim() || !client.trim() || !project.trim() || !amount || !dueDate || !status.trim()) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const invData = {
      invoiceNumber,
      client,
      project,
      amount: parseFloat(amount),
      dueDate,
      status: status as any,
    };

    if (selectedInvoice) {
      setInvoicesList((prev) =>
        prev.map((i) => (i.id === selectedInvoice.id ? { ...i, ...invData } : i))
      );
      toast("Invoice updated successfully!");
    } else {
      const newInvoice: Invoice = {
        id: `inv-${Date.now()}`,
        ...invData,
      };
      setInvoicesList((prev) => [...prev, newInvoice]);
      toast("Invoice added successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "invoiceNumber", headerName: "Invoice Number", flex: 1.2 },
    { field: "client", headerName: "Client Name", flex: 1.8 },
    { field: "project", headerName: "Project Name", flex: 2 },
    { field: "amount", headerName: "Invoice Value (₹)", flex: 1.5, valueFormatter: (v: any) => `₹${v?.toLocaleString()}` },
    { field: "dueDate", headerName: "Due Date", flex: 1.2 },
    {
      field: "status",
      headerName: "Status",
      flex: 1.2,
      renderCell: (p) => (
        <StatusChip label={p.value} />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (p) => (
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => handleEditClick(p.row as Invoice)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Invoice"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteInvoice(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Invoice"
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
            Invoices Directory
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Manage outgoing client invoices, record payments, and track overdue accounts.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Invoice
        </button>
      </div>

      <DataTable rows={invoicesList} columns={columns} searchPlaceholder="Search invoices..." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedInvoice ? "Edit Invoice Details" : "Add New Invoice"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveInvoice} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Invoice Number *
              </label>
              <input
                type="text"
                required
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                placeholder="e.g. INV-3091"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Client Name *
              </label>
              <input
                type="text"
                required
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. Ganga Housing"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                required
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="e.g. Skyline Business Tower"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Invoice Value (₹) *
              </label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 1250000"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Due Date *
              </label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Overdue">Overdue</option>
              </select>
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
              Save Invoice
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
