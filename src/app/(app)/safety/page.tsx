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

  const [activeTab, setActiveTab] = useState<"incidents" | "toolbox" | "permits" | "ppe">("incidents");
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
            Safety & Health Compliance (HSE)
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            File site hazard logs, register safety gear checks, verify permits to work, and record toolbox talks.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Incident
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-concrete-100 dark:border-white/5">
        {[
          { id: "incidents", label: "Incident Logs" },
          { id: "toolbox", label: "Toolbox Talks" },
          { id: "permits", label: "Permits to Work" },
          { id: "ppe", label: "PPE Issuance" },
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

      {activeTab === "incidents" && (
        <DataTable rows={incidentsList} columns={columns} searchPlaceholder="Search safety logs..." />
      )}

      {activeTab === "toolbox" && (
        <div className="overflow-x-auto text-[13px] bg-white dark:bg-blueprint-850 p-5 rounded-2xl border border-concrete-100 dark:border-white/5 shadow-card">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-concrete-100 dark:border-white/5 text-concrete-350 font-semibold">
                <th className="py-2.5">Talk Date</th>
                <th className="py-2.5">Topic Discussed</th>
                <th className="py-2.5">Site Location</th>
                <th className="py-2.5">Supervisor</th>
                <th className="py-2.5">Attendees Count</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-concrete-50 dark:divide-white/5">
              {[
                { date: "2026-08-10", topic: "Scaffolding Safety & Fall Arrest Systems", site: "Skyline Business Tower", supervisor: "Ravi Shankar", count: 24 },
                { date: "2026-08-09", topic: "Handling Electrical MEP Line Hazards", site: "Riverside Residency Phase 2", supervisor: "Priya Ramachandran", count: 15 },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-concrete-50 dark:hover:bg-blueprint-900/50">
                  <td className="py-3 font-semibold">{item.date}</td>
                  <td className="py-3">{item.topic}</td>
                  <td className="py-3">{item.site}</td>
                  <td className="py-3">{item.supervisor}</td>
                  <td className="py-3 font-bold">{item.count} Workers</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "permits" && (
        <div className="overflow-x-auto text-[13px] bg-white dark:bg-blueprint-850 p-5 rounded-2xl border border-concrete-100 dark:border-white/5 shadow-card">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-concrete-100 dark:border-white/5 text-concrete-350 font-semibold">
                <th className="py-2.5">Permit No</th>
                <th className="py-2.5">Permit Type</th>
                <th className="py-2.5">Site Location</th>
                <th className="py-2.5">Assigned Subcontractor</th>
                <th className="py-2.5">Valid Until</th>
                <th className="py-2.5">Approval Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-concrete-50 dark:divide-white/5">
              {[
                { no: "PTW-SKY-902", type: "Hot Work (Welding at height)", site: "Skyline Block C (Roof)", contractor: "NPS Foundations", valid: "2026-08-10 18:00", status: "Active / Approved" },
                { no: "PTW-SKY-905", type: "Confined Space Access (Sewage)", site: "Skyline Basement 2", contractor: "Jai Steel Erectors", valid: "2026-08-11 12:00", status: "Pending Review" },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-concrete-50 dark:hover:bg-blueprint-900/50">
                  <td className="py-3 font-semibold">{item.no}</td>
                  <td className="py-3">{item.type}</td>
                  <td className="py-3">{item.site}</td>
                  <td className="py-3">{item.contractor}</td>
                  <td className="py-3">{item.valid}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      item.status.includes("Active") ? "bg-green-100 text-green-700 dark:bg-green-950/30" : "bg-amber-100 text-amber-700 dark:bg-amber-950/30"
                    }`}>{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "ppe" && (
        <div className="overflow-x-auto text-[13px] bg-white dark:bg-blueprint-850 p-5 rounded-2xl border border-concrete-100 dark:border-white/5 shadow-card">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-concrete-100 dark:border-white/5 text-concrete-350 font-semibold">
                <th className="py-2.5">Employee Name</th>
                <th className="py-2.5">PPE Gear Issued</th>
                <th className="py-2.5">Issuance Date</th>
                <th className="py-2.5">Next Renewal Inspection</th>
                <th className="py-2.5">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-concrete-50 dark:divide-white/5">
              {[
                { name: "Ravi Shankar", gear: "Safety Harness, Hard Hat, Steel-toe Boots", date: "2026-01-15", next: "2026-10-15", status: "Compliant" },
                { name: "Vignesh Babu", gear: "Protective Goggles, Hard Hat, Ear Muffs", date: "2026-03-22", next: "2026-08-22", status: "Renewal Due" },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-concrete-50 dark:hover:bg-blueprint-900/50">
                  <td className="py-3 font-semibold">{item.name}</td>
                  <td className="py-3">{item.gear}</td>
                  <td className="py-3">{item.date}</td>
                  <td className="py-3">{item.next}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      item.status === "Compliant" ? "bg-green-100 text-green-700 dark:bg-green-950/30" : "bg-red-100 text-red-700 dark:bg-red-950/30"
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
