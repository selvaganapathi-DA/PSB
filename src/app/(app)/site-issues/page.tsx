"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { siteIssues as initialSiteIssues } from "@/lib/mockData";
import { GridColDef } from "@mui/x-data-grid";
import StatusChip from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";
import { SiteIssue } from "@/types";

export default function SiteIssuesPage() {
  const { toast } = useToast();
  const [issuesList, setIssuesList] = useState<SiteIssue[]>(initialSiteIssues);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<SiteIssue | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dateRaised, setDateRaised] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [status, setStatus] = useState("Open");

  const handleAddClick = () => {
    setSelectedIssue(null);
    setTitle("");
    setProject("");
    setAssignedTo("");
    setDateRaised("");
    setSeverity("Low");
    setStatus("Open");
    setModalOpen(true);
  };

  const handleEditClick = (issue: SiteIssue) => {
    setSelectedIssue(issue);
    setTitle(issue.title);
    setProject(issue.project);
    setAssignedTo(issue.assignedTo);
    setDateRaised(issue.dateRaised);
    setSeverity(issue.severity);
    setStatus(issue.status);
    setModalOpen(true);
  };

  const handleDeleteIssue = (id: string) => {
    if (confirm("Are you sure you want to delete this issue?")) {
      setIssuesList((prev) => prev.filter((i) => i.id !== id));
      toast("Issue deleted successfully!");
    }
  };

  const handleSaveIssue = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !project.trim() || !assignedTo.trim() || !dateRaised || !severity.trim() || !status.trim()) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const issueData = {
      title,
      project,
      assignedTo,
      dateRaised,
      severity: severity as any,
      status: status as any,
    };

    if (selectedIssue) {
      setIssuesList((prev) =>
        prev.map((i) => (i.id === selectedIssue.id ? { ...i, ...issueData } : i))
      );
      toast("Issue updated successfully!");
    } else {
      const newIssue: SiteIssue = {
        id: `iss-${Date.now()}`,
        ...issueData,
      };
      setIssuesList((prev) => [newIssue, ...prev]);
      toast("Issue added successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Issue Title", flex: 2 },
    { field: "project", headerName: "Project", flex: 1.5 },
    { field: "assignedTo", headerName: "Assigned Resolve Lead", flex: 1.2 },
    { field: "dateRaised", headerName: "Date Raised", flex: 1.2 },
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
            onClick={() => handleEditClick(p.row as SiteIssue)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Issue"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteIssue(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Issue"
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
            Site Issues & Blockers
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Track structural clashes, drawing disputes, resource blocks, or material deficiencies.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Issue
        </button>
      </div>

      <DataTable rows={issuesList} columns={columns} searchPlaceholder="Search issues..." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedIssue ? "Edit Issue Details" : "Add New Issue"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveIssue} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Issue Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Design mismatch on 3rd floor layout"
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Assigned Resolve Lead *
              </label>
              <input
                type="text"
                required
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="e.g. Anand K (QA/QC)"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Date Raised *
              </label>
              <input
                type="date"
                required
                value={dateRaised}
                onChange={(e) => setDateRaised(e.target.value)}
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
              Save Issue
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
