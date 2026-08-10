"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { quotations as initialQuotations } from "@/lib/mockData";
import { GridColDef } from "@mui/x-data-grid";
import StatusChip from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";
import { Quotation } from "@/types";

export default function QuotationsPage() {
  const { toast } = useToast();
  const [quotationsList, setQuotationsList] = useState<Quotation[]>(initialQuotations);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);

  // Form State
  const [quoteNumber, setQuoteNumber] = useState("");
  const [client, setClient] = useState("");
  const [project, setProject] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [status, setStatus] = useState("Draft");

  const handleAddClick = () => {
    setSelectedQuotation(null);
    setQuoteNumber(`QT-${Date.now().toString().slice(-4)}`);
    setClient("");
    setProject("");
    setAmount("");
    setDate("");
    setValidUntil("");
    setStatus("Draft");
    setModalOpen(true);
  };

  const handleEditClick = (q: Quotation) => {
    setSelectedQuotation(q);
    setQuoteNumber(q.quoteNumber);
    setClient(q.client);
    setProject(q.project);
    setAmount(String(q.amount));
    setDate(q.date);
    setValidUntil(q.validUntil);
    setStatus(q.status);
    setModalOpen(true);
  };

  const handleDeleteQuotation = (id: string) => {
    if (confirm("Are you sure you want to delete this quotation?")) {
      setQuotationsList((prev) => prev.filter((q) => q.id !== id));
      toast("Quotation deleted successfully!");
    }
  };

  const handleSaveQuotation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!quoteNumber.trim() || !client.trim() || !project.trim() || !amount || !date || !validUntil || !status.trim()) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const qData = {
      quoteNumber,
      client,
      project,
      amount: parseFloat(amount),
      date,
      validUntil,
      status: status as any,
    };

    if (selectedQuotation) {
      setQuotationsList((prev) =>
        prev.map((q) => (q.id === selectedQuotation.id ? { ...q, ...qData } : q))
      );
      toast("Quotation updated successfully!");
    } else {
      const newQuotation: Quotation = {
        id: `quote-${Date.now()}`,
        ...qData,
      };
      setQuotationsList((prev) => [...prev, newQuotation]);
      toast("Quotation added successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "quoteNumber", headerName: "Quote Number", flex: 1.2 },
    { field: "client", headerName: "Client", flex: 1.5 },
    { field: "project", headerName: "Project", flex: 1.8 },
    { field: "amount", headerName: "Amount (₹)", flex: 1.5, valueFormatter: (v: any) => `₹${v?.toLocaleString()}` },
    { field: "date", headerName: "Issue Date", flex: 1.2 },
    { field: "validUntil", headerName: "Valid Until", flex: 1.2 },
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
            onClick={() => handleEditClick(p.row as Quotation)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Quote"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteQuotation(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Quote"
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
            Quotations & Bids
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Track active estimations, pricing models, and proposal sheets shared with clients.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Quotation
        </button>
      </div>

      <DataTable rows={quotationsList} columns={columns} searchPlaceholder="Search quotes..." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedQuotation ? "Edit Quotation Details" : "Add New Quotation"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveQuotation} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Quote Number *
              </label>
              <input
                type="text"
                required
                value={quoteNumber}
                onChange={(e) => setQuoteNumber(e.target.value)}
                placeholder="e.g. QT-8851"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Client *
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
                Project *
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
                Amount (₹) *
              </label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 1850000"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Issue Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Valid Until *
              </label>
              <input
                type="date"
                required
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
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
                <option value="Draft">Draft</option>
                <option value="Sent">Sent</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
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
              Save Quotation
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
