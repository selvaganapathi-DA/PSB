"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { materials as initialMaterials } from "@/lib/mockData";
import { GridColDef } from "@mui/x-data-grid";
import StatusChip from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
<<<<<<< HEAD
import { Edit2, Trash2, LayoutGrid, AlertTriangle, Plus, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Material } from "@/types";

interface WastageLog {
  id: string;
  siteName: string;
  materialName: string;
  estimatedQty: number;
  wastedQty: number;
  unit: string;
  unitCost: number;
  reason: string;
}

export default function MaterialsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"catalog" | "wastage">("catalog");
  const [materialsList, setMaterialsList] = useState<Material[]>(initialMaterials);
  
  // Materials Form State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
=======
import { Edit2, Trash2 } from "lucide-react";
import { Material } from "@/types";

export default function MaterialsPage() {
  const { toast } = useToast();
  const [materialsList, setMaterialsList] = useState<Material[]>(initialMaterials);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  // Form State
>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [unitCost, setUnitCost] = useState("");
  const [stock, setStock] = useState("");
  const [reorderLevel, setReorderLevel] = useState("");
  const [warehouse, setWarehouse] = useState("");

<<<<<<< HEAD
  // Wastage Logs State
  const [wastageLogs, setWastageLogs] = useState<WastageLog[]>([
    { id: "w1", siteName: "Skyline Business Tower", materialName: "Fe 550 TMT Steel Rebars", estimatedQty: 120, wastedQty: 14.5, unit: "Tons", unitCost: 58000, reason: "Bending and cutting scrap offcuts" },
    { id: "w2", siteName: "Riverside Residency", materialName: "Portland Cement (Grade 53)", estimatedQty: 4500, wastedQty: 480, unit: "Bags", unitCost: 385, reason: "Silo leakage and rain moisture damage" },
    { id: "w3", siteName: "Dharmapuri Highway Overpass", materialName: "Aggregate (20mm coarse)", estimatedQty: 850, wastedQty: 42, unit: "Cu.m", unitCost: 1600, reason: "Spillage during unloading transit" },
  ]);

  const [wastageModalOpen, setWastageModalOpen] = useState(false);
  const [selectedWastage, setSelectedWastage] = useState<WastageLog | null>(null);

  // Wastage Form Fields
  const [wasteSite, setWasteSite] = useState("Skyline Business Tower");
  const [wasteMaterial, setWasteMaterial] = useState("Fe 550 TMT Steel Rebars");
  const [wasteEst, setWasteEst] = useState("");
  const [wasteQty, setWasteQty] = useState("");
  const [wasteUnit, setWasteUnit] = useState("Tons");
  const [wasteCost, setWasteCost] = useState("");
  const [wasteReason, setWasteReason] = useState("");

  // Material Actions
=======
>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
  const handleAddClick = () => {
    setSelectedMaterial(null);
    setName("");
    setCategory("");
    setUnit("");
    setUnitCost("");
    setStock("");
    setReorderLevel("");
    setWarehouse("");
    setModalOpen(true);
  };

  const handleEditClick = (material: Material) => {
    setSelectedMaterial(material);
    setName(material.name);
    setCategory(material.category);
    setUnit(material.unit);
    setUnitCost(String(material.unitCost));
    setStock(String(material.stock));
    setReorderLevel(String(material.reorderLevel));
    setWarehouse(material.warehouse);
    setModalOpen(true);
  };

  const handleDeleteMaterial = (id: string) => {
    if (confirm("Are you sure you want to delete this material?")) {
      setMaterialsList((prev) => prev.filter((m) => m.id !== id));
      toast("Material deleted successfully!");
    }
  };

  const handleSaveMaterial = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !category.trim() || !unit.trim() || !unitCost || !stock || !reorderLevel || !warehouse.trim()) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const materialData: Omit<Material, "id"> = {
      name,
      category,
      unit,
      unitCost: parseFloat(unitCost),
      stock: parseInt(stock, 10),
      reorderLevel: parseInt(reorderLevel, 10),
      warehouse,
    };

    if (selectedMaterial) {
<<<<<<< HEAD
=======
      // Edit
>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
      setMaterialsList((prev) =>
        prev.map((m) => (m.id === selectedMaterial.id ? { ...m, ...materialData } : m))
      );
      toast("Material updated successfully!");
    } else {
<<<<<<< HEAD
=======
      // Add
>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
      const newMaterial: Material = {
        id: `m-${Date.now()}`,
        ...materialData,
      };
      setMaterialsList((prev) => [...prev, newMaterial]);
      toast("Material added successfully!");
    }
<<<<<<< HEAD
    setModalOpen(false);
  };

  // Wastage Actions
  const handleAddWastageClick = () => {
    setSelectedWastage(null);
    setWasteSite("Skyline Business Tower");
    setWasteMaterial("Fe 550 TMT Steel Rebars");
    setWasteEst("");
    setWasteQty("");
    setWasteUnit("Tons");
    setWasteCost("58000");
    setWasteReason("");
    setWastageModalOpen(true);
  };

  const handleEditWastageClick = (w: WastageLog) => {
    setSelectedWastage(w);
    setWasteSite(w.siteName);
    setWasteMaterial(w.materialName);
    setWasteEst(String(w.estimatedQty));
    setWasteQty(String(w.wastedQty));
    setWasteUnit(w.unit);
    setWasteCost(String(w.unitCost));
    setWasteReason(w.reason);
    setWastageModalOpen(true);
  };

  const handleDeleteWastage = (id: string) => {
    if (confirm("Are you sure you want to delete this wastage log?")) {
      setWastageLogs((prev) => prev.filter((w) => w.id !== id));
      toast("Wastage log deleted successfully!");
    }
  };

  const handleSaveWastage = (e: React.FormEvent) => {
    e.preventDefault();
    const estVal = parseFloat(wasteEst) || 0;
    const qtyVal = parseFloat(wasteQty) || 0;
    const costVal = parseFloat(wasteCost) || 0;

    const data: WastageLog = {
      id: selectedWastage ? selectedWastage.id : `w-${Date.now()}`,
      siteName: wasteSite,
      materialName: wasteMaterial,
      estimatedQty: estVal,
      wastedQty: qtyVal,
      unit: wasteUnit,
      unitCost: costVal,
      reason: wasteReason,
    };

    if (selectedWastage) {
      setWastageLogs((prev) => prev.map((w) => (w.id === selectedWastage.id ? data : w)));
      toast("Wastage log updated!");
    } else {
      setWastageLogs((prev) => [...prev, data]);
      toast("Wastage log registered successfully!");
    }
    setWastageModalOpen(false);
  };

=======

    setModalOpen(false);
  };

>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
  const columns: GridColDef[] = [
    { field: "name", headerName: "Material Name", flex: 2 },
    { field: "category", headerName: "Category", flex: 1.2 },
    { field: "unit", headerName: "Unit", flex: 0.8 },
    { field: "unitCost", headerName: "Unit Cost (₹)", flex: 1, valueFormatter: (v: any) => `₹${v}` },
<<<<<<< HEAD
    {
      field: "stock",
      headerName: "Stock Status",
      flex: 1.2,
      renderCell: (p) => {
        const isLow = p.row.stock <= p.row.reorderLevel;
        return (
          <div className="flex items-center gap-2 mt-1">
            <span className="font-semibold text-concrete-800 dark:text-blueprint-200">{p.row.stock}</span>
            {isLow && (
              <span className="inline-flex items-center gap-1 rounded bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-600 dark:bg-red-950/30 dark:text-red-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
=======
    { field: "stock", headerName: "Current Stock", flex: 1.2, renderCell: (p) => {
        const isLow = p.row.stock <= p.row.reorderLevel;
        return (
          <div className="flex items-center gap-2 mt-1">
            <span>{p.value}</span>
            {isLow && (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 dark:bg-red-950/20 px-2 py-0.5 text-[11px] font-semibold text-red-600 dark:text-red-400 ring-1 ring-inset ring-red-600/20 dark:ring-red-500/20">
                <span className="relative flex h-1.5 w-1.5 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600 dark:bg-red-400"></span>
                </span>
                Low Stock
              </span>
            )}
          </div>
        );
      }
    },
    { field: "warehouse", headerName: "Warehouse Location", flex: 1.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (p) => (
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => handleEditClick(p.row as Material)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Material"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteMaterial(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Material"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
<<<<<<< HEAD
      <div>
        <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100 flex items-center gap-2">
          <LayoutGrid className="h-6 w-6 text-signal-orange" />
          Materials Management
        </h1>
        <p className="mt-1 text-[13px] text-concrete-300">
          Track basic material items, stock thresholds, and log material wastage cost overruns per project site.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-concrete-100 dark:border-white/5">
        <button
          onClick={() => setActiveTab("catalog")}
          className={`px-5 py-3 text-[13px] font-medium transition-all border-b-2 -mb-[2px] ${
            activeTab === "catalog"
              ? "border-signal-orange text-signal-orange font-semibold"
              : "border-transparent text-concrete-300 hover:text-concrete-900 dark:hover:text-white"
          }`}
        >
          Materials Directory
        </button>
        <button
          onClick={() => setActiveTab("wastage")}
          className={`px-5 py-3 text-[13px] font-medium transition-all border-b-2 -mb-[2px] ${
            activeTab === "wastage"
              ? "border-signal-orange text-signal-orange font-semibold"
              : "border-transparent text-concrete-300 hover:text-concrete-900 dark:hover:text-white"
          }`}
        >
          Wastage Tracking & Variance
        </button>
      </div>

      {/* Tab 1: Catalog */}
      {activeTab === "catalog" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
              Materials Master Catalog
            </h3>
            <button
              onClick={handleAddClick}
              className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
            >
              Add Material
            </button>
          </div>
          <DataTable rows={materialsList} columns={columns} searchPlaceholder="Search materials..." />
        </div>
      )}

      {/* Tab 2: Wastage Tracking */}
      {activeTab === "wastage" && (
        <div className="space-y-6">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850">
              <span className="text-[11px] text-concrete-350 block font-bold">TOTAL WASTAGE COST IMPACT</span>
              <span className="text-[20px] font-extrabold text-red-500">
                ₹{wastageLogs.reduce((acc, log) => acc + log.wastedQty * log.unitCost, 0).toLocaleString()}
              </span>
            </div>
            <div className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850">
              <span className="text-[11px] text-concrete-350 block font-bold">CRITICAL SITE OVERRUNS</span>
              <span className="text-[20px] font-extrabold text-amber-500">
                {wastageLogs.filter((log) => (log.wastedQty / log.estimatedQty) * 100 >= 10).length} Flags
              </span>
            </div>
            <div className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850">
              <span className="text-[11px] text-concrete-350 block font-bold">AVERAGE WASTAGE RATIO</span>
              <span className="text-[20px] font-extrabold text-concrete-900 dark:text-blueprint-100">
                {(wastageLogs.reduce((acc, log) => acc + (log.wastedQty / log.estimatedQty) * 100, 0) / wastageLogs.length).toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
              Wastage Logs & Variance Flagging
            </h3>
            <button
              onClick={handleAddWastageClick}
              className="flex items-center gap-1 bg-signal-orange text-[12px] font-semibold text-white px-3 py-2 rounded-xl hover:bg-signal-orange/90 shadow-card"
            >
              <Plus className="h-3.5 w-3.5" /> Log Material Wastage
            </button>
          </div>

          <div className="overflow-x-auto text-[13px]">
            <table className="w-full text-left border-collapse bg-white dark:bg-blueprint-850 rounded-2xl border border-concrete-100 dark:border-white/5">
              <thead>
                <tr className="border-b border-concrete-100 dark:border-white/5 text-concrete-350 font-semibold bg-concrete-50/50 dark:bg-blueprint-900/30">
                  <th className="p-4">Site Location</th>
                  <th className="p-4">Material</th>
                  <th className="p-4">Estimated Qty</th>
                  <th className="p-4">Wasted Qty</th>
                  <th className="p-4">Wastage %</th>
                  <th className="p-4">Cost Loss (₹)</th>
                  <th className="p-4">Overrun Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-concrete-50 dark:divide-white/5">
                {wastageLogs.map((item) => {
                  const ratio = (item.wastedQty / item.estimatedQty) * 100;
                  const critical = ratio >= 10;
                  const loss = item.wastedQty * item.unitCost;

                  return (
                    <tr key={item.id} className="hover:bg-concrete-50 dark:hover:bg-blueprint-900/30">
                      <td className="p-4 font-semibold">{item.siteName}</td>
                      <td className="p-4">{item.materialName}</td>
                      <td className="p-4">{item.estimatedQty} {item.unit}</td>
                      <td className="p-4 text-red-500 font-bold">{item.wastedQty} {item.unit}</td>
                      <td className="p-4 font-semibold">{ratio.toFixed(1)}%</td>
                      <td className="p-4 font-extrabold text-concrete-900 dark:text-blueprint-100">₹{loss.toLocaleString()}</td>
                      <td className="p-4">
                        {critical ? (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-lg dark:bg-red-950/30 dark:text-red-400 w-fit">
                            <ShieldAlert className="h-3 w-3" /> CRITICAL OVERRUN
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-lg dark:bg-green-950/30 dark:text-green-400 w-fit">
                            <CheckCircle2 className="h-3 w-3" /> NORMAL
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleEditWastageClick(item)} className="p-0.5 text-concrete-600 dark:text-blueprint-300 hover:text-signal-orange">
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => handleDeleteWastage(item.id)} className="p-0.5 text-red-500 hover:text-red-700">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Material Modal */}
=======
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
            Materials Ledger
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Monitor rates, units, supplier catalogs, and basic material costs.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Material
        </button>
      </div>

      <DataTable rows={materialsList} columns={columns} searchPlaceholder="Search materials..." />

>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedMaterial ? "Edit Material Details" : "Add New Material"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveMaterial} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Material Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Portland Cement"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Category *
              </label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Cement, Steel, Masonry"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Unit *
              </label>
              <input
                type="text"
                required
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="e.g. Bags, Tons, Nos, Cu.m"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Unit Cost (₹) *
              </label>
              <input
                type="number"
                step="any"
                required
                value={unitCost}
                onChange={(e) => setUnitCost(e.target.value)}
                placeholder="e.g. 385"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Warehouse Location *
              </label>
              <input
                type="text"
                required
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
                placeholder="e.g. Chennai Central Yard"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Current Stock *
              </label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="e.g. 1240"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Reorder Level *
              </label>
              <input
                type="number"
                required
                value={reorderLevel}
                onChange={(e) => setReorderLevel(e.target.value)}
                placeholder="e.g. 500"
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
              Save Material
            </button>
          </div>
        </form>
      </Modal>
<<<<<<< HEAD

      {/* Wastage Modal */}
      <Modal
        open={wastageModalOpen}
        onClose={() => setWastageModalOpen(false)}
        title={selectedWastage ? "Edit Wastage Log Details" : "Log Material Wastage / Discrepancy"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveWastage} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Site Location *
              </label>
              <select
                value={wasteSite}
                onChange={(e) => setWasteSite(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none"
              >
                <option value="Skyline Business Tower">Skyline Business Tower</option>
                <option value="Riverside Residency">Riverside Residency</option>
                <option value="Dharmapuri Highway Overpass">Dharmapuri Highway Overpass</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Material Item *
              </label>
              <select
                value={wasteMaterial}
                onChange={(e) => setWasteMaterial(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none"
              >
                <option value="Fe 550 TMT Steel Rebars">Fe 550 TMT Steel Rebars</option>
                <option value="Portland Cement (Grade 53)">Portland Cement (Grade 53)</option>
                <option value="Aggregate (20mm coarse)">Aggregate (20mm coarse)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2">
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Estimated Intended Qty *
              </label>
              <input
                type="number"
                required
                value={wasteEst}
                onChange={(e) => setWasteEst(e.target.value)}
                placeholder="e.g. 120"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Unit Cost (₹) *
              </label>
              <input
                type="number"
                required
                value={wasteCost}
                onChange={(e) => setWasteCost(e.target.value)}
                placeholder="58000"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Unit Measure
              </label>
              <input
                type="text"
                value={wasteUnit}
                onChange={(e) => setWasteUnit(e.target.value)}
                placeholder="Tons"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
              Actual Wasted / Damaged Qty *
            </label>
            <input
              type="number"
              required
              value={wasteQty}
              onChange={(e) => setWasteQty(e.target.value)}
              placeholder="e.g. 14.5"
              className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
              Reason / Source of Loss
            </label>
            <textarea
              value={wasteReason}
              onChange={(e) => setWasteReason(e.target.value)}
              placeholder="e.g. Over-cutting structural mesh rebars"
              className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none h-20"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-4">
            <button
              type="button"
              onClick={() => setWastageModalOpen(false)}
              className="rounded-xl border border-concrete-100 bg-white px-4 py-2.5 text-[12.5px] font-semibold text-concrete-600 hover:bg-concrete-50 dark:border-white/5 dark:bg-blueprint-850 dark:text-blueprint-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white hover:bg-signal-orange/90"
            >
              Log Wastage
            </button>
          </div>
        </form>
      </Modal>
=======
>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
    </div>
  );
}
