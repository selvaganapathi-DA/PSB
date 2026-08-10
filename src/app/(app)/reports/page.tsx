"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";

interface Report {
  id: string;
  title: string;
  category: string;
  format: string;
  generatedAt: string;
  size: string;
}

export default function ReportsPage() {
  const { toast } = useToast();
  const [reportsList, setReportsList] = useState<Report[]>([
    { id: "1", title: "Project Cost Variance Report", category: "Financial", format: "PDF / Excel", generatedAt: "2026-07-08 10:00 AM", size: "2.4 MB" },
    { id: "2", title: "Monthly Cement & Steel Stock Reconciliation", category: "Materials", format: "Excel", generatedAt: "2026-07-07 04:30 PM", size: "1.8 MB" },
    { id: "3", title: "Labour Attendance & Wage Sheet - June 2026", category: "Workforce", format: "Excel / PDF", generatedAt: "2026-07-01 09:15 AM", size: "4.1 MB" },
    { id: "4", title: "Safety Inspection & Incident Logs", category: "Compliance", format: "PDF", generatedAt: "2026-07-06 11:00 AM", size: "850 KB" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [format, setFormat] = useState("");
  const [size, setSize] = useState("");

  const handleAddClick = () => {
    setSelectedReport(null);
    setTitle("");
    setCategory("");
    setFormat("PDF");
    setSize("");
    setModalOpen(true);
  };

  const handleEditClick = (rep: Report) => {
    setSelectedReport(rep);
    setTitle(rep.title);
    setCategory(rep.category);
    setFormat(rep.format);
    setSize(rep.size);
    setModalOpen(true);
  };

  const handleDeleteReport = (id: string) => {
    if (confirm("Are you sure you want to delete this report?")) {
      setReportsList((prev) => prev.filter((r) => r.id !== id));
      toast("Report deleted successfully!");
    }
  };

  const handleSaveReport = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !category.trim() || !format.trim() || !size.trim()) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const now = new Date();
    const generatedAtStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours() % 12 || 12).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;

    const repData = {
      title,
      category,
      format,
      generatedAt: generatedAtStr,
      size,
    };

    if (selectedReport) {
      setReportsList((prev) =>
        prev.map((r) => (r.id === selectedReport.id ? { ...r, ...repData } : r))
      );
      toast("Report updated successfully!");
    } else {
      const newRep: Report = {
        id: `rep-${Date.now()}`,
        ...repData,
      };
      setReportsList((prev) => [...prev, newRep]);
      toast("Report added successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Report Title", flex: 2 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "format", headerName: "Formats Available", flex: 1 },
    { field: "generatedAt", headerName: "Generated At", flex: 1.5 },
    { field: "size", headerName: "File Size", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (p) => (
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => handleEditClick(p.row as Report)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Report"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteReport(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Report"
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
            Executive Reports
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Generate, schedule, and download analytical reports across all operations.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Report
        </button>
      </div>

      <DataTable rows={reportsList} columns={columns} searchPlaceholder="Search reports..." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedReport ? "Edit Report details" : "Add New Report"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveReport} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Report Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Project Cost Variance Report"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Category *
              </label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Financial, Materials"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Formats Available *
              </label>
              <input
                type="text"
                required
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                placeholder="e.g. PDF / Excel"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                File Size *
              </label>
              <input
                type="text"
                required
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="e.g. 2.4 MB"
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
              Save Report
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
