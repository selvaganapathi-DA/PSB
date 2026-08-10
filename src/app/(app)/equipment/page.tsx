"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { equipmentList as initialEquipmentList } from "@/lib/mockData";
import { GridColDef } from "@mui/x-data-grid";
import StatusChip from "@/components/ui/StatusChip";
import ProgressBar from "@/components/ui/ProgressBar";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";
import { Equipment } from "@/types";

export default function EquipmentPage() {
  const { toast } = useToast();
  const [equipmentListState, setEquipmentListState] = useState<Equipment[]>(initialEquipmentList);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [site, setSite] = useState("");
  const [utilization, setUtilization] = useState("");
  const [lastServiceDate, setLastServiceDate] = useState("");
  const [status, setStatus] = useState("Active");

  const handleAddClick = () => {
    setSelectedEquipment(null);
    setName("");
    setType("");
    setSite("");
    setUtilization("");
    setLastServiceDate("");
    setStatus("Active");
    setModalOpen(true);
  };

  const handleEditClick = (eq: Equipment) => {
    setSelectedEquipment(eq);
    setName(eq.name);
    setType(eq.type);
    setSite(eq.site);
    setUtilization(String(eq.utilization));
    setLastServiceDate(eq.lastServiceDate);
    setStatus(eq.status);
    setModalOpen(true);
  };

  const handleDeleteEquipment = (id: string) => {
    if (confirm("Are you sure you want to delete this equipment?")) {
      setEquipmentListState((prev) => prev.filter((e) => e.id !== id));
      toast("Equipment deleted successfully!");
    }
  };

  const handleSaveEquipment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !type.trim() || !site.trim() || !utilization || !lastServiceDate || !status.trim()) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const eqData = {
      name,
      type,
      site,
      utilization: parseInt(utilization, 10),
      lastServiceDate,
      status: status as any,
    };

    if (selectedEquipment) {
      setEquipmentListState((prev) =>
        prev.map((e) => (e.id === selectedEquipment.id ? { ...e, ...eqData } : e))
      );
      toast("Equipment updated successfully!");
    } else {
      const newEq: Equipment = {
        id: `eq-${Date.now()}`,
        ...eqData,
      };
      setEquipmentListState((prev) => [...prev, newEq]);
      toast("Equipment added successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Machinery Name", flex: 2 },
    { field: "type", headerName: "Type", flex: 1.2 },
    { field: "site", headerName: "Deployed Site", flex: 1.5 },
    {
      field: "utilization",
      headerName: "Utilization Rate",
      flex: 1.5,
      renderCell: (p) => (
        <div className="w-full pr-4 mt-2">
          <div className="flex justify-between text-[11px] mb-1">
            <span>Active Hours</span>
            <span className="font-semibold">{p.value}%</span>
          </div>
          <ProgressBar value={Number(p.value)} />
        </div>
      ),
    },
    { field: "lastServiceDate", headerName: "Last Serviced", flex: 1.2 },
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
            onClick={() => handleEditClick(p.row as Equipment)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Machinery"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteEquipment(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Machinery"
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
            Heavy Equipment & Machinery
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Monitor operating hours, crane allocations, concrete pumps, and maintenance schedules.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Machinery
        </button>
      </div>

      <DataTable rows={equipmentListState} columns={columns} searchPlaceholder="Search equipment..." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedEquipment ? "Edit Machinery Details" : "Add New Machinery"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveEquipment} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Machinery Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tower Crane TC-14"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Type *
              </label>
              <input
                type="text"
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="e.g. Crane, Pump, Excavator"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Deployed Site *
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
                Utilization Rate (%) *
              </label>
              <input
                type="number"
                required
                min="0"
                max="100"
                value={utilization}
                onChange={(e) => setUtilization(e.target.value)}
                placeholder="e.g. 85"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Last Service Date *
              </label>
              <input
                type="date"
                required
                value={lastServiceDate}
                onChange={(e) => setLastServiceDate(e.target.value)}
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
                <option value="Maintenance">Maintenance</option>
                <option value="Out of Service">Out of Service</option>
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
              Save Machinery
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
