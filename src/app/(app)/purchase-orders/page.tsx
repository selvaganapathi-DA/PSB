"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "@/components/ui/DataTable";
import { purchaseOrders as initialPurchaseOrders } from "@/lib/mockData";
import { GridColDef } from "@mui/x-data-grid";
import StatusChip from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";
import { PurchaseOrder } from "@/types";

export default function PurchaseOrdersPage() {
  const { toast } = useToast();
  const [poList, setPoList] = useState<PurchaseOrder[]>(initialPurchaseOrders);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);

  // Form State
  const [poNumber, setPoNumber] = useState("");
  const [vendor, setVendor] = useState("");
  const [project, setProject] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Draft");

  const handleAddClick = () => {
    setSelectedPO(null);
    setPoNumber(`PO-${Math.floor(1000 + Math.random() * 9000)}`);
    setVendor("");
    setProject("");
    setAmount("");
    setDate("");
    setStatus("Draft");
    setModalOpen(true);
  };

  const handleEditClick = (po: PurchaseOrder) => {
    setSelectedPO(po);
    setPoNumber(po.poNumber);
    setVendor(po.vendor);
    setProject(po.project);
    setAmount(String(po.amount));
    setDate(po.date);
    setStatus(po.status);
    setModalOpen(true);
  };

  const handleDeletePO = (id: string) => {
    if (confirm("Are you sure you want to delete this purchase order?")) {
      setPoList((prev) => prev.filter((p) => p.id !== id));
      toast("Purchase Order deleted successfully!");
    }
  };

  const handleSavePO = (e: React.FormEvent) => {
    e.preventDefault();

    if (!poNumber.trim() || !vendor.trim() || !project.trim() || !amount || !date || !status.trim()) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const poData = {
      poNumber,
      vendor,
      project,
      amount: parseFloat(amount),
      date,
      status: status as any,
    };

    if (selectedPO) {
      setPoList((prev) =>
        prev.map((p) => (p.id === selectedPO.id ? { ...p, ...poData } : p))
      );
      toast("Purchase Order updated successfully!");
    } else {
      const newPO: PurchaseOrder = {
        id: `po-${Date.now()}`,
        ...poData,
      };
      setPoList((prev) => [...prev, newPO]);
      toast("Purchase Order created successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    {
      field: "poNumber",
      headerName: "PO Number",
      flex: 1,
      renderCell: (p) => (
        <Link to={`/purchase-orders/${p.row.id}`} className="text-signal-orange hover:underline font-semibold">
          {p.value}
        </Link>
      ),
    },
    { field: "vendor", headerName: "Vendor", flex: 1.5 },
    { field: "project", headerName: "Project", flex: 1.5 },
    { field: "amount", headerName: "Amount (₹)", flex: 1.2, valueFormatter: (v: any) => `₹${v?.toLocaleString()}` },
    { field: "date", headerName: "Order Date", flex: 1.2 },
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
            onClick={() => handleEditClick(p.row as PurchaseOrder)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit PO"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeletePO(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete PO"
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
            Purchase Orders (PO)
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Raise purchase orders to external suppliers and track material supply statuses.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Create PO
        </button>
      </div>

      <DataTable rows={poList} columns={columns} searchPlaceholder="Search POs..." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedPO ? "Edit Purchase Order" : "Create Purchase Order"}
        maxWidth="md"
      >
        <form onSubmit={handleSavePO} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                PO Number *
              </label>
              <input
                type="text"
                required
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
                placeholder="e.g. PO-3391"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Vendor *
              </label>
              <input
                type="text"
                required
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                placeholder="e.g. Sri Balaji Steel Traders"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Project *
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
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Amount (₹) *
              </label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 2480000"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Order Date *
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
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              >
                <option value="Draft">Draft</option>
                <option value="Pending Approval">Pending Approval</option>
                <option value="Approved">Approved</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
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
              Save PO
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
