"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { Card, CardHeader } from "@/components/ui/Card";
import { vehicles as initialVehicles } from "@/lib/mockData";
import { GridColDef } from "@mui/x-data-grid";
import StatusChip from "@/components/ui/StatusChip";
import ProgressBar from "@/components/ui/ProgressBar";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";
import { Vehicle } from "@/types";

export default function VehicleTrackingPage() {
  const { toast } = useToast();
  const [vehiclesList, setVehiclesList] = useState<Vehicle[]>(initialVehicles);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Form State
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [model, setModel] = useState("");
  const [driver, setDriver] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [fuelLevel, setFuelLevel] = useState("");
  const [status, setStatus] = useState<"Active" | "Maintenance" | "Idle">("Active");

  const handleAddClick = () => {
    setSelectedVehicle(null);
    setVehicleNumber("");
    setModel("");
    setDriver("");
    setCurrentLocation("");
    setFuelLevel("");
    setStatus("Active");
    setModalOpen(true);
  };

  const handleEditClick = (v: Vehicle) => {
    setSelectedVehicle(v);
    setVehicleNumber(v.vehicleNumber);
    setModel(v.model);
    setDriver(v.driver);
    setCurrentLocation(v.currentLocation);
    setFuelLevel(String(v.fuelLevel));
    setStatus(v.status);
    setModalOpen(true);
  };

  const handleDeleteVehicle = (id: string) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      setVehiclesList((prev) => prev.filter((v) => v.id !== id));
      toast("Vehicle deleted successfully!");
    }
  };

  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();

    if (!vehicleNumber.trim() || !model.trim() || !driver.trim() || !currentLocation.trim() || !fuelLevel) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const fuelNum = parseInt(fuelLevel, 10);
    if (isNaN(fuelNum) || fuelNum < 0 || fuelNum > 100) {
      toast("Fuel level must be a number between 0 and 100.", "error");
      return;
    }

    const vData = {
      vehicleNumber,
      model,
      driver,
      currentLocation,
      fuelLevel: fuelNum,
      status,
    };

    if (selectedVehicle) {
      setVehiclesList((prev) =>
        prev.map((v) => (v.id === selectedVehicle.id ? { ...v, ...vData } : v))
      );
      toast("Vehicle updated successfully!");
    } else {
      const newVehicle: Vehicle = {
        id: `vhl-${Date.now()}`,
        ...vData,
      };
      setVehiclesList((prev) => [...prev, newVehicle]);
      toast("Vehicle added successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "vehicleNumber", headerName: "Vehicle No", flex: 1 },
    { field: "model", headerName: "Model", flex: 1.5 },
    { field: "driver", headerName: "Driver Name", flex: 1.2 },
    { field: "currentLocation", headerName: "Current GPS Location", flex: 2 },
    {
      field: "fuelLevel",
      headerName: "Fuel",
      flex: 1,
      renderCell: (p) => (
        <div className="w-full pr-2 mt-2">
          <div className="flex justify-between text-[10px] mb-1">
            <span>Fuel Level</span>
            <span>{p.value}%</span>
          </div>
          <ProgressBar value={Number(p.value)} />
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
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
            onClick={() => handleEditClick(p.row as Vehicle)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Vehicle"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteVehicle(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Vehicle"
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
            Vehicle Fleet & GPS Tracking
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Track transit status, fuel efficiency, and dispatch locations of company trucks.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Vehicle
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DataTable rows={vehiclesList} columns={columns} searchPlaceholder="Search fleet..." />
        </div>
        <Card className="h-full">
          <CardHeader title="Live Fleet Map" subtitle="Geolocated vehicle coordinates" />
          <div className="h-72 flex items-center justify-center border border-dashed border-concrete-100 rounded-xl dark:border-white/5 bg-concrete-50/50 dark:bg-blueprint-900/30">
            <span className="text-[12.5px] text-concrete-300 dark:text-blueprint-400 font-medium">
              Chennai Bypass / Salem Yard Map View
            </span>
          </div>
        </Card>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedVehicle ? "Edit Vehicle Details" : "Add New Vehicle"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveVehicle} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Vehicle Number *
              </label>
              <input
                type="text"
                required
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="e.g. TN-07-BY-1234"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Model *
              </label>
              <input
                type="text"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. Tata Signa Tipper 2823.K"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Driver Name *
              </label>
              <input
                type="text"
                required
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
                placeholder="e.g. Durai Pandian"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Current GPS Location *
              </label>
              <input
                type="text"
                required
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                placeholder="e.g. Chennai Bypass Road"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Fuel Level (%) *
              </label>
              <input
                type="number"
                required
                min="0"
                max="100"
                value={fuelLevel}
                onChange={(e) => setFuelLevel(e.target.value)}
                placeholder="e.g. 78"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Status *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              >
                <option value="Active">Active</option>
                <option value="Idle">Idle</option>
                <option value="Maintenance">Maintenance</option>
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
              Save Vehicle
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
