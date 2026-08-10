"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { materials as initialMaterials } from "@/lib/mockData";
import { Card, CardHeader } from "@/components/ui/Card";
import { GridColDef } from "@mui/x-data-grid";
import StatusChip from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";
import { Material } from "@/types";

export default function InventoryPage() {
  const { toast } = useToast();
  const [materialsList, setMaterialsList] = useState<Material[]>(initialMaterials);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [unit, setUnit] = useState("");
  const [reorderLevel, setReorderLevel] = useState("");
  const [warehouse, setWarehouse] = useState("");

  const totalStockItems = materialsList.length;
  const lowStockItems = materialsList.filter((m) => m.stock <= m.reorderLevel).length;

  const handleAddClick = () => {
    setSelectedMaterial(null);
    setName("");
    setCategory("");
    setStock("");
    setUnit("");
    setReorderLevel("");
    setWarehouse("");
    setModalOpen(true);
  };

  const handleEditClick = (material: Material) => {
    setSelectedMaterial(material);
    setName(material.name);
    setCategory(material.category);
    setStock(String(material.stock));
    setUnit(material.unit);
    setReorderLevel(String(material.reorderLevel));
    setWarehouse(material.warehouse);
    setModalOpen(true);
  };

  const handleDeleteMaterial = (id: string) => {
    if (confirm("Are you sure you want to delete this inventory item?")) {
      setMaterialsList((prev) => prev.filter((m) => m.id !== id));
      toast("Inventory item deleted successfully!");
    }
  };

  const handleSaveMaterial = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !category.trim() || !stock || !unit.trim() || !reorderLevel || !warehouse.trim()) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const materialData = {
      name,
      category,
      stock: parseInt(stock, 10),
      unit,
      reorderLevel: parseInt(reorderLevel, 10),
      warehouse,
      unitCost: selectedMaterial ? selectedMaterial.unitCost : 0, // preserve or default
    };

    if (selectedMaterial) {
      setMaterialsList((prev) =>
        prev.map((m) => (m.id === selectedMaterial.id ? { ...m, ...materialData } : m))
      );
      toast("Inventory item updated successfully!");
    } else {
      const newMaterial: Material = {
        id: `m-${Date.now()}`,
        ...materialData,
      };
      setMaterialsList((prev) => [...prev, newMaterial]);
      toast("Inventory item added successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Item Name", flex: 2 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "stock", headerName: "In Stock", flex: 1 },
    { field: "unit", headerName: "Unit", flex: 0.8 },
    { field: "reorderLevel", headerName: "Reorder Level", flex: 1 },
    { field: "warehouse", headerName: "Warehouse", flex: 1.5 },
    { field: "status", headerName: "Status", flex: 1, renderCell: (p) => {
        const isLow = p.row.stock <= p.row.reorderLevel;
        return isLow ? <StatusChip label="Reorder" /> : <StatusChip label="Good" />;
      }
    },
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
            title="Edit Item"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteMaterial(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Item"
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
            Inventory Control
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Track stock levels, reorder thresholds, and active storage allocations.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader title="Total Stock Items" />
          <p className="text-[24px] font-bold text-concrete-900 dark:text-blueprint-100">{totalStockItems}</p>
        </Card>
        <Card>
          <CardHeader title="Low Stock Alerts" />
          <p className="text-[24px] font-bold text-red-500">{lowStockItems}</p>
        </Card>
      </div>

      <DataTable rows={materialsList} columns={columns} searchPlaceholder="Search inventory..." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedMaterial ? "Edit Inventory Details" : "Add Inventory Item"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveMaterial} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Item Name *
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
                placeholder="e.g. Cement, Steel"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                In Stock *
              </label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="e.g. 1200"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Unit *
              </label>
              <input
                type="text"
                required
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="e.g. Bags, Tons"
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

          <div>
            <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
              Warehouse *
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
              Save Item
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
