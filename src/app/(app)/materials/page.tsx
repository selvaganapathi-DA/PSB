"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { materials as initialMaterials } from "@/lib/mockData";
import { GridColDef } from "@mui/x-data-grid";
import StatusChip from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";
import { Material } from "@/types";

export default function MaterialsPage() {
  const { toast } = useToast();
  const [materialsList, setMaterialsList] = useState<Material[]>(initialMaterials);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [unitCost, setUnitCost] = useState("");
  const [stock, setStock] = useState("");
  const [reorderLevel, setReorderLevel] = useState("");
  const [warehouse, setWarehouse] = useState("");

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
      // Edit
      setMaterialsList((prev) =>
        prev.map((m) => (m.id === selectedMaterial.id ? { ...m, ...materialData } : m))
      );
      toast("Material updated successfully!");
    } else {
      // Add
      const newMaterial: Material = {
        id: `m-${Date.now()}`,
        ...materialData,
      };
      setMaterialsList((prev) => [...prev, newMaterial]);
      toast("Material added successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Material Name", flex: 2 },
    { field: "category", headerName: "Category", flex: 1.2 },
    { field: "unit", headerName: "Unit", flex: 0.8 },
    { field: "unitCost", headerName: "Unit Cost (₹)", flex: 1, valueFormatter: (v: any) => `₹${v}` },
    { field: "stock", headerName: "Current Stock", flex: 1.2, renderCell: (p) => {
        const isLow = p.row.stock <= p.row.reorderLevel;
        return (
          <div className="flex items-center gap-2 mt-1">
            <span>{p.value}</span>
            {isLow && (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 dark:bg-red-950/20 px-2 py-0.5 text-[11px] font-semibold text-red-600 dark:text-red-400 ring-1 ring-inset ring-red-600/20 dark:ring-red-500/20">
                <span className="relative flex h-1.5 w-1.5 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
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
    </div>
  );
}
