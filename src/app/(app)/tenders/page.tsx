"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { tenders as initialTenders } from "@/lib/mockData";
import { GridColDef } from "@mui/x-data-grid";
import StatusChip from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";
import { Tender } from "@/types";

export default function TendersPage() {
  const { toast } = useToast();
  const [tendersList, setTendersList] = useState<Tender[]>(initialTenders);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);

  // Form State
  const [tenderNumber, setTenderNumber] = useState("");
  const [title, setTitle] = useState("");
  const [authority, setAuthority] = useState("");
  const [value, setValue] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [status, setStatus] = useState("Open");

  const handleAddClick = () => {
    setSelectedTender(null);
    setTenderNumber(`TND-${Date.now().toString().slice(-4)}`);
    setTitle("");
    setAuthority("");
    setValue("");
    setSubmissionDate("");
    setStatus("Open");
    setModalOpen(true);
  };

  const handleEditClick = (t: Tender) => {
    setSelectedTender(t);
    setTenderNumber(t.tenderNumber);
    setTitle(t.title);
    setAuthority(t.authority);
    setValue(String(t.value));
    setSubmissionDate(t.submissionDate);
    setStatus(t.status);
    setModalOpen(true);
  };

  const handleDeleteTender = (id: string) => {
    if (confirm("Are you sure you want to delete this tender bid?")) {
      setTendersList((prev) => prev.filter((t) => t.id !== id));
      toast("Tender bid deleted successfully!");
    }
  };

  const handleSaveTender = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tenderNumber.trim() || !title.trim() || !authority.trim() || !value || !submissionDate || !status.trim()) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const tData = {
      tenderNumber,
      title,
      authority,
      value: parseFloat(value),
      submissionDate,
      status: status as any,
      bondAmount: selectedTender?.bondAmount ?? 0,
    };

    if (selectedTender) {
      setTendersList((prev) =>
        prev.map((t) => (t.id === selectedTender.id ? { ...t, ...tData } : t))
      );
      toast("Tender bid updated successfully!");
    } else {
      const newTender: Tender = {
        id: `tnd-${Date.now()}`,
        ...tData,
      };
      setTendersList((prev) => [...prev, newTender]);
      toast("Tender bid added successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "tenderNumber", headerName: "Tender ID", flex: 1 },
    { field: "title", headerName: "Project Title", flex: 2 },
    { field: "authority", headerName: "Issuing Authority", flex: 1.5 },
    { field: "value", headerName: "Value (₹)", flex: 1.2, valueFormatter: (v: any) => `₹${(v / 10000000).toFixed(2)} Cr` },
    { field: "submissionDate", headerName: "Submission Date", flex: 1.2 },
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
            onClick={() => handleEditClick(p.row as Tender)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Tender"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteTender(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Tender"
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
            Tender Bid Management
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Monitor open government & corporate bids, deposit bonds, and track proposal milestones.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Tender Bid
        </button>
      </div>

      <DataTable rows={tendersList} columns={columns} searchPlaceholder="Search tenders..." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedTender ? "Edit Tender details" : "Add Tender Bid"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveTender} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Tender ID *
              </label>
              <input
                type="text"
                required
                value={tenderNumber}
                onChange={(e) => setTenderNumber(e.target.value)}
                placeholder="e.g. TND-9011"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Construction of Highway Overpass"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Issuing Authority *
              </label>
              <input
                type="text"
                required
                value={authority}
                onChange={(e) => setAuthority(e.target.value)}
                placeholder="e.g. NHAI Tamil Nadu"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Value (₹ in Rupees) *
              </label>
              <input
                type="number"
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g. 180000000"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Submission Date *
              </label>
              <input
                type="date"
                required
                value={submissionDate}
                onChange={(e) => setSubmissionDate(e.target.value)}
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
                <option value="Open">Open</option>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
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
              Save Tender
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
