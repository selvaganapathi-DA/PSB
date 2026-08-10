"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import StatusChip from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";

interface Worker {
  id: string;
  name: string;
  trade: string;
  wageRate: number;
  site: string;
  status: string;
}

export default function LabourPage() {
  const { toast } = useToast();
  const [workersList, setWorkersList] = useState<Worker[]>([
    { id: "1", name: "Murugan P", trade: "Masonry", wageRate: 850, site: "Skyline Business Tower", status: "Active" },
    { id: "2", name: "Chinnasamy V", trade: "Bar Bender", wageRate: 900, site: "Skyline Business Tower", status: "Active" },
    { id: "3", name: "Kathiravan S", trade: "Electrician", wageRate: 950, site: "Riverside Residency Phase 2", status: "Active" },
    { id: "4", name: "Rajamani K", trade: "Carpenter", wageRate: 800, site: "Dharmapuri Highway Overpass", status: "Idle" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [trade, setTrade] = useState("");
  const [wageRate, setWageRate] = useState("");
  const [site, setSite] = useState("");
  const [status, setStatus] = useState("Active");

  const handleAddClick = () => {
    setSelectedWorker(null);
    setName("");
    setTrade("");
    setWageRate("");
    setSite("");
    setStatus("Active");
    setModalOpen(true);
  };

  const handleEditClick = (w: Worker) => {
    setSelectedWorker(w);
    setName(w.name);
    setTrade(w.trade);
    setWageRate(String(w.wageRate));
    setSite(w.site);
    setStatus(w.status);
    setModalOpen(true);
  };

  const handleDeleteWorker = (id: string) => {
    if (confirm("Are you sure you want to delete this worker?")) {
      setWorkersList((prev) => prev.filter((w) => w.id !== id));
      toast("Worker deleted successfully!");
    }
  };

  const handleSaveWorker = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !trade.trim() || !wageRate || !site.trim() || !status.trim()) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const workerData = {
      name,
      trade,
      wageRate: parseInt(wageRate, 10),
      site,
      status,
    };

    if (selectedWorker) {
      setWorkersList((prev) =>
        prev.map((w) => (w.id === selectedWorker.id ? { ...w, ...workerData } : w))
      );
      toast("Worker updated successfully!");
    } else {
      const newWorker: Worker = {
        id: `w-${Date.now()}`,
        ...workerData,
      };
      setWorkersList((prev) => [...prev, newWorker]);
      toast("Worker added successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Labour Name", flex: 1.5 },
    { field: "trade", headerName: "Skill Trade", flex: 1.2 },
    { field: "wageRate", headerName: "Daily Wage (₹)", flex: 1.2, valueFormatter: (v: any) => `₹${v}` },
    { field: "site", headerName: "Site Allocation", flex: 2 },
    { field: "status", headerName: "Status", flex: 1, renderCell: (p) => <StatusChip label={p.value} /> },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (p) => (
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => handleEditClick(p.row as Worker)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Worker"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteWorker(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Worker"
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
            Labour Management
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Track daily wage workers, trade types (masonry, MEP, civil), and site deployments.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Labour
        </button>
      </div>

      <DataTable rows={workersList} columns={columns} searchPlaceholder="Search workers..." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedWorker ? "Edit Labour Details" : "Add New Labour"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveWorker} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Labour Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Murugan P"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Skill Trade *
              </label>
              <input
                type="text"
                required
                value={trade}
                onChange={(e) => setTrade(e.target.value)}
                placeholder="e.g. Masonry, Electrician"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Daily Wage (₹) *
              </label>
              <input
                type="number"
                required
                value={wageRate}
                onChange={(e) => setWageRate(e.target.value)}
                placeholder="e.g. 850"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Site Allocation *
              </label>
              <input
                type="text"
                required
                value={site}
                onChange={(e) => setSite(e.target.value)}
                placeholder="e.g. Skyline Business Tower"
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
                <option value="Active">Active</option>
                <option value="Idle">Idle</option>
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
              Save Labour
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
