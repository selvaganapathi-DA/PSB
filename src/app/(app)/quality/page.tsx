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

  const [activeTab, setActiveTab] = useState<"checklists" | "ncr" | "snag">("checklists");
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
            QA/QC Inspection Checklists
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Register concrete cube test logs, compaction levels, NCR defects, and Snag lists.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Checklist
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-concrete-100 dark:border-white/5">
        {[
          { id: "checklists", label: "Inspection Checklists" },
          { id: "ncr", label: "Non-Conformance Reports (NCR)" },
          { id: "snag", label: "Snag Lists (Pre-handover)" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-3 text-[13px] font-medium border-b-2 -mb-[2px] transition-all ${
              activeTab === tab.id
                ? "border-signal-orange text-signal-orange font-semibold"
                : "border-transparent text-concrete-300 hover:text-concrete-900 dark:hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "checklists" && (
        <DataTable rows={checklistsList} columns={columns} searchPlaceholder="Search checklists..." />
      )}

      {activeTab === "ncr" && (
        <div className="overflow-x-auto text-[13px] bg-white dark:bg-blueprint-850 p-5 rounded-2xl border border-concrete-100 dark:border-white/5 shadow-card">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-concrete-100 dark:border-white/5 text-concrete-350 font-semibold">
                <th className="py-2.5">NCR No</th>
                <th className="py-2.5">Defect Description</th>
                <th className="py-2.5">Root Cause Analysis</th>
                <th className="py-2.5">Corrective Action</th>
                <th className="py-2.5">Severity</th>
                <th className="py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-concrete-50 dark:divide-white/5">
              {[
                { ncr: "NCR-SKY-01", desc: "Honeycomb defect in concrete column C3", root: "Improper vibration during pour", action: "Chipping & patching with micro-concrete", severity: "High", status: "Resolved" },
                { ncr: "NCR-RIV-04", desc: "Plastering thickness variation on exterior walls", root: "Mason workmanship deviation", action: "Re-leveling and plaster touch-up", severity: "Medium", status: "Open" },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-concrete-50 dark:hover:bg-blueprint-900/50">
                  <td className="py-3 font-semibold">{item.ncr}</td>
                  <td className="py-3">{item.desc}</td>
                  <td className="py-3">{item.root}</td>
                  <td className="py-3">{item.action}</td>
                  <td className="py-3"><span className="text-red-500 font-bold">{item.severity}</span></td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      item.status === "Resolved" ? "bg-green-100 text-green-700 dark:bg-green-950/30" : "bg-amber-100 text-amber-700 dark:bg-amber-950/30"
                    }`}>{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "snag" && (
        <div className="overflow-x-auto text-[13px] bg-white dark:bg-blueprint-850 p-5 rounded-2xl border border-concrete-100 dark:border-white/5 shadow-card">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-concrete-100 dark:border-white/5 text-concrete-350 font-semibold">
                <th className="py-2.5">Snag ID</th>
                <th className="py-2.5">Defect Details</th>
                <th className="py-2.5">Unit Location</th>
                <th className="py-2.5">Assigned Contractor</th>
                <th className="py-2.5">Target Resolution</th>
                <th className="py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-concrete-50 dark:divide-white/5">
              {[
                { snag: "SNAG-401-01", desc: "Wall trim alignment misalignment near window", unit: "Flat 401 (Block A)", contractor: "NPS Foundations", target: "2026-08-15", status: "In Progress" },
                { snag: "SNAG-401-02", desc: "Scratch marks on marble floor tiles", unit: "Flat 401 (Block A)", contractor: "Jai Painters & Tilers", target: "2026-08-18", status: "Pending" },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-concrete-50 dark:hover:bg-blueprint-900/50">
                  <td className="py-3 font-semibold">{item.snag}</td>
                  <td className="py-3">{item.desc}</td>
                  <td className="py-3">{item.unit}</td>
                  <td className="py-3">{item.contractor}</td>
                  <td className="py-3">{item.target}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      item.status === "In Progress" ? "bg-blue-100 text-blue-700 dark:bg-blue-950/30" : "bg-red-100 text-red-700 dark:bg-red-950/30"
                    }`}>{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
