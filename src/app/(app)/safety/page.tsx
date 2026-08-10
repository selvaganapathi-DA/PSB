"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { safetyIncidents as initialSafetyIncidents } from "@/lib/mockData";
import { GridColDef } from "@mui/x-data-grid";
import StatusChip from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";
import { SafetyIncident } from "@/types";

export default function SafetyPage() {
  const { toast } = useToast();
  const [incidentsList, setIncidentsList] = useState<SafetyIncident[]>(initialSafetyIncidents);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<SafetyIncident | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [site, setSite] = useState("");
  const [reportedBy, setReportedBy] = useState("");
  const [date, setDate] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [status, setStatus] = useState("Open");

  const handleAddClick = () => {
    setSelectedIncident(null);
    setTitle("");
    setSite("");
    setReportedBy("");
    setDate("");
    setSeverity("Low");
    setStatus("Open");
    setModalOpen(true);
  };

  const handleEditClick = (inc: SafetyIncident) => {
    setSelectedIncident(inc);
    setTitle(inc.title);
    setSite(inc.site);
    setReportedBy(inc.reportedBy);
    setDate(inc.date);
    setSeverity(inc.severity);
    setStatus(inc.status);
    setModalOpen(true);
  };

  const handleDeleteIncident = (id: string) => {
    if (confirm("Are you sure you want to delete this safety incident?")) {
      setIncidentsList((prev) => prev.filter((i) => i.id !== id));
      toast("Incident deleted successfully!");
    }
  };

  const handleSaveIncident = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !site.trim() || !reportedBy.trim() || !date || !severity.trim() || !status.trim()) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const incData = {
      title,
      site,
      reportedBy,
      date,
      severity: severity as any,
      status: status as any,
    };

    if (selectedIncident) {
      setIncidentsList((prev) =>
        prev.map((i) => (i.id === selectedIncident.id ? { ...i, ...incData } : i))
      );
      toast("Incident updated successfully!");
    } else {
      const newInc: SafetyIncident = {
        id: `inc-${Date.now()}`,
        ...incData,
      };
      setIncidentsList((prev) => [newInc, ...prev]);
      toast("Incident added successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Incident / Inspection Detail", flex: 2 },
    { field: "site", headerName: "Site Location", flex: 1.5 },
    { field: "reportedBy", headerName: "Reported By", flex: 1.2 },
    { field: "date", headerName: "Logged Date", flex: 1.2 },
    {
      field: "severity",
      headerName: "Severity",
      flex: 1,
      renderCell: (p) => (
        <StatusChip label={p.value} />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1.2,
      renderCell: (p) => <StatusChip label={p.value} />,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (p) => (
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => handleEditClick(p.row as SafetyIncident)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Incident"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteIncident(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Incident"
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
            Safety & Health Compliance (HSE)
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            File site hazard logs, register safety gear checks, and report compliance incidents.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Incident
        </button>
      </div>

      <DataTable rows={incidentsList} columns={columns} searchPlaceholder="Search safety logs..." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedIncident ? "Edit Incident Details" : "Add New Incident"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveIncident} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Incident Detail / Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Minor scaffolding fall hazard spotted"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Site Location *
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Reported By *
              </label>
              <input
                type="text"
                required
                value={reportedBy}
                onChange={(e) => setReportedBy(e.target.value)}
                placeholder="e.g. Kumar HSE Supervisor"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Logged Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Severity
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
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
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
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
              Save Incident
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
