"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import ProgressBar from "@/components/ui/ProgressBar";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";

interface Warehouse {
  id: string;
  name: string;
  location: string;
  manager: string;
  capacity: number;
  phone: string;
}

export default function WarehousePage() {
  const { toast } = useToast();
  const [warehousesList, setWarehousesList] = useState<Warehouse[]>([
    { id: "1", name: "Chennai Central Yard", manager: "Ravi Shankar", location: "Koyambedu, Chennai", capacity: 85, phone: "+91 94440 99881" },
    { id: "2", name: "Salem Storage Depot", manager: "Lakshmi Narayanan", location: "Salem Bypass Road", capacity: 62, phone: "+91 94440 99882" },
    { id: "3", name: "Coimbatore Logistics Hub", manager: "Deepa Suresh", location: "Peelamedu, Coimbatore", capacity: 40, phone: "+91 94440 99883" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [manager, setManager] = useState("");
  const [phone, setPhone] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleAddClick = () => {
    setSelectedWarehouse(null);
    setName("");
    setLocation("");
    setManager("");
    setPhone("");
    setCapacity("");
    setModalOpen(true);
  };

  const handleEditClick = (wh: Warehouse) => {
    setSelectedWarehouse(wh);
    setName(wh.name);
    setLocation(wh.location);
    setManager(wh.manager);
    setPhone(wh.phone);
    setCapacity(String(wh.capacity));
    setModalOpen(true);
  };

  const handleDeleteWarehouse = (id: string) => {
    if (confirm("Are you sure you want to delete this warehouse?")) {
      setWarehousesList((prev) => prev.filter((w) => w.id !== id));
      toast("Warehouse deleted successfully!");
    }
  };

  const handleSaveWarehouse = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !location.trim() || !manager.trim() || !phone.trim() || !capacity) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const whData = {
      name,
      location,
      manager,
      phone,
      capacity: parseInt(capacity, 10),
    };

    if (selectedWarehouse) {
      setWarehousesList((prev) =>
        prev.map((w) => (w.id === selectedWarehouse.id ? { ...w, ...whData } : w))
      );
      toast("Warehouse updated successfully!");
    } else {
      const newWh: Warehouse = {
        id: `wh-${Date.now()}`,
        ...whData,
      };
      setWarehousesList((prev) => [...prev, newWh]);
      toast("Warehouse added successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Warehouse Name", flex: 2 },
    { field: "location", headerName: "Location", flex: 1.5 },
    { field: "manager", headerName: "In Charge", flex: 1.2 },
    { field: "phone", headerName: "Contact Phone", flex: 1.2 },
    {
      field: "capacity",
      headerName: "Capacity Utilization",
      flex: 1.5,
      renderCell: (p) => (
        <div className="w-full pr-4 mt-2">
          <div className="flex justify-between text-[11px] mb-1">
            <span>Utilization</span>
            <span className="font-semibold">{p.value}%</span>
          </div>
          <ProgressBar value={Number(p.value)} />
        </div>
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
            onClick={() => handleEditClick(p.row as Warehouse)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Warehouse"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteWarehouse(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Warehouse"
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
            Warehouse & Yard Locations
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Manage storage capacities, inventory distribution hubs, and site deliveries.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Warehouse
        </button>
      </div>

      <DataTable rows={warehousesList} columns={columns} searchPlaceholder="Search yards..." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedWarehouse ? "Edit Warehouse Details" : "Add New Warehouse"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveWarehouse} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Warehouse Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Chennai Central Yard"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Location *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Peelamedu, Coimbatore"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                In Charge (Manager) *
              </label>
              <input
                type="text"
                required
                value={manager}
                onChange={(e) => setManager(e.target.value)}
                placeholder="e.g. Deepa Suresh"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Contact Phone *
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 94440 99883"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Utilization (%) *
              </label>
              <input
                type="number"
                required
                min="0"
                max="100"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="e.g. 80"
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
              Save Warehouse
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
