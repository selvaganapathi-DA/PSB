"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { qualityChecklists as initialQualityChecklists } from "@/lib/mockData";
import { GridColDef } from "@mui/x-data-grid";
import StatusChip from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";
import { QualityChecklist } from "@/types";

export default function QualityPage() {
  const { toast } = useToast();
  const [checklistsList, setChecklistsList] = useState<QualityChecklist[]>(initialQualityChecklists);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChecklist, setSelectedChecklist] = useState<QualityChecklist | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [inspector, setInspector] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Draft");

  const handleAddClick = () => {
    setSelectedChecklist(null);
    setTitle("");
    setProject("");
    setInspector("");
    setDate("");
    setStatus("Draft");
    setModalOpen(true);
  };

  const handleEditClick = (c: QualityChecklist) => {
    setSelectedChecklist(c);
    setTitle(c.title);
    setProject(c.project);
    setInspector(c.inspector);
    setDate(c.date);
    setStatus(c.status);
    setModalOpen(true);
  };

  const handleDeleteChecklist = (id: string) => {
    if (confirm("Are you sure you want to delete this checklist?")) {
      setChecklistsList((prev) => prev.filter((c) => c.id !== id));
      toast("Checklist deleted successfully!");
    }
  };

  const handleSaveChecklist = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !project.trim() || !inspector.trim() || !date || !status.trim()) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const cData = {
      title,
      project,
      inspector,
      date,
      status: status as any,
    };

    if (selectedChecklist) {
      setChecklistsList((prev) =>
        prev.map((c) => (c.id === selectedChecklist.id ? { ...c, ...cData } : c))
      );
      toast("Checklist updated successfully!");
    } else {
      const newChecklist: QualityChecklist = {
        id: `chk-${Date.now()}`,
        ...cData,
      };
      setChecklistsList((prev) => [newChecklist, ...prev]);
      toast("Checklist added successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Inspection Target", flex: 2 },
    { field: "project", headerName: "Project Site", flex: 1.5 },
    { field: "inspector", headerName: "QA/QC Inspector", flex: 1.2 },
    { field: "date", headerName: "Audit Date", flex: 1.2 },
    {
      field: "status",
      headerName: "Audit Status",
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
            onClick={() => handleEditClick(p.row as QualityChecklist)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Checklist"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteChecklist(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Checklist"
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
            QA/QC Inspection Checklists
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Register concrete cube test logs, compaction levels, and structural finishing sign-offs.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Checklist
        </button>
      </div>

      <DataTable rows={checklistsList} columns={columns} searchPlaceholder="Search checklists..." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedChecklist ? "Edit Checklist details" : "Add New Checklist"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveChecklist} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Inspection Target *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. M25 Slab Concrete Pour Cube Test"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Project Site *
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
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                QA/QC Inspector *
              </label>
              <input
                type="text"
                required
                value={inspector}
                onChange={(e) => setInspector(e.target.value)}
                placeholder="e.g. Anand K"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Audit Date *
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
                Audit Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              >
                <option value="Draft">Draft</option>
                <option value="Pending">Pending</option>
                <option value="Passed">Passed</option>
                <option value="Failed">Failed</option>
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
              Save Checklist
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
