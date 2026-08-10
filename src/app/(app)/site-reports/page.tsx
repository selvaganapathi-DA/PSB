"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { Card, CardHeader } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { GridColDef } from "@mui/x-data-grid";
import StatusChip from "@/components/ui/StatusChip";
import { FileUpload } from "@/components/ui/FileUpload";
import { useToast } from "@/components/ui/Toast";

export default function SiteReportsPage() {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);

  const mockReports = [
    { id: "1", date: "2026-07-08", project: "Skyline Business Tower", supervisor: "Ravi Shankar", weather: "Sunny (34°C)", progressSummary: "Foundation slab poured for Block C", labourCount: 42, status: "Submitted" },
    { id: "2", date: "2026-07-08", project: "Riverside Residency Phase 2", supervisor: "Lakshmi Narayanan", weather: "Light Rain (29°C)", progressSummary: "Conduit layout and electrical cabling", labourCount: 28, status: "Submitted" },
    { id: "3", date: "2026-07-07", project: "Dharmapuri Highway Overpass", supervisor: "Suresh Kumar", weather: "Overcast (31°C)", progressSummary: "Piling sequence at Pier 4 completed", labourCount: 35, status: "Approved" },
  ];

  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "project", headerName: "Project", flex: 1.5 },
    { field: "supervisor", headerName: "Supervisor", flex: 1.2 },
    { field: "weather", headerName: "Weather", flex: 1 },
    { field: "progressSummary", headerName: "Progress Summary", flex: 2 },
    { field: "labourCount", headerName: "Labour Count", flex: 0.8 },
    { field: "status", headerName: "Status", flex: 1, renderCell: (p) => <StatusChip label={p.value} /> },
  ];

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(false);
    toast("Daily Site Report submitted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
            Daily Site Reports (DSR)
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Submit and view daily summaries of site progress, attendance, and events.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Submit DSR
        </button>
      </div>

      <DataTable rows={mockReports} columns={columns} searchPlaceholder="Search DSRs..." />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Submit Daily Site Report" maxWidth="md">
        <form onSubmit={handleCreateReport} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Project
              </label>
              <select className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100">
                <option>Skyline Business Tower</option>
                <option>Riverside Residency Phase 2</option>
                <option>Dharmapuri Highway Overpass</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Weather Condition
              </label>
              <input
                type="text"
                placeholder="e.g. Sunny (32°C)"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
              Progress & Work Accomplished
            </label>
            <textarea
              rows={3}
              placeholder="Provide a brief summary of civil, MEP, or architectural achievements today..."
              className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Total Labour Count
              </label>
              <input
                type="number"
                defaultValue={15}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Upload Site Photos
              </label>
              <FileUpload accept="image/*" />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-concrete-100 dark:border-white/5">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-xl border border-concrete-100 bg-white px-4 py-2.5 text-[12.5px] font-semibold text-concrete-600 dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white hover:bg-signal-orange/95"
            >
              Submit Report
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
