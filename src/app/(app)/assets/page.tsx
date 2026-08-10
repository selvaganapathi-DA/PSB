"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import StatusChip from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";

interface Asset {
  id: string;
  name: string;
  category: string;
  value: number;
  site: string;
  status: string;
}

export default function AssetsPage() {
  const { toast } = useToast();
  const [assetsList, setAssetsList] = useState<Asset[]>([
    { id: "1", name: "Leica TS16 Total Station", category: "Surveying", value: 450000, site: "Skyline Business Tower", status: "In Use" },
    { id: "2", name: "Bosch GBH 8-45 D Rotary Hammer", category: "Power Tools", value: 38000, site: "Riverside Residency Phase 2", status: "In Store" },
    { id: "3", name: "Dumpy Level Survey Kit", category: "Surveying", value: 12000, site: "Dharmapuri Highway Overpass", status: "Maintenance" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [site, setSite] = useState("");
  const [status, setStatus] = useState("In Store");

  const handleAddClick = () => {
    setSelectedAsset(null);
    setName("");
    setCategory("");
    setValue("");
    setSite("");
    setStatus("In Store");
    setModalOpen(true);
  };

  const handleEditClick = (ast: Asset) => {
    setSelectedAsset(ast);
    setName(ast.name);
    setCategory(ast.category);
    setValue(String(ast.value));
    setSite(ast.site);
    setStatus(ast.status);
    setModalOpen(true);
  };

  const handleDeleteAsset = (id: string) => {
    if (confirm("Are you sure you want to delete this asset?")) {
      setAssetsList((prev) => prev.filter((a) => a.id !== id));
      toast("Asset deleted successfully!");
    }
  };

  const handleSaveAsset = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !category.trim() || !value || !site.trim() || !status.trim()) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const astData = {
      name,
      category,
      value: parseFloat(value),
      site,
      status,
    };

    if (selectedAsset) {
      setAssetsList((prev) =>
        prev.map((a) => (a.id === selectedAsset.id ? { ...a, ...astData } : a))
      );
      toast("Asset updated successfully!");
    } else {
      const newAst: Asset = {
        id: `ast-${Date.now()}`,
        ...astData,
      };
      setAssetsList((prev) => [...prev, newAst]);
      toast("Asset added successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Asset Name", flex: 2 },
    { field: "category", headerName: "Category", flex: 1.2 },
    { field: "value", headerName: "Value (₹)", flex: 1.2, valueFormatter: (v: any) => `₹${v?.toLocaleString()}` },
    { field: "site", headerName: "Site Deployed", flex: 1.5 },
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
            onClick={() => handleEditClick(p.row as Asset)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Asset"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteAsset(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Asset"
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
            Small Assets & Tools
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Register and audit company tools, testing equipment, and surveying hardware.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Asset
        </button>
      </div>

      <DataTable rows={assetsList} columns={columns} searchPlaceholder="Search assets..." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedAsset ? "Edit Asset Details" : "Add New Asset"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveAsset} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Asset Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Leica TS16 Total Station"
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
                placeholder="e.g. Surveying, Power Tools"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Value (₹) *
              </label>
              <input
                type="number"
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g. 450000"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Site Deployed *
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
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              >
                <option value="In Use">In Use</option>
                <option value="In Store">In Store</option>
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
              Save Asset
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
