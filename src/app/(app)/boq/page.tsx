"use client";

import React, { useState } from "react";
import { boqs as initialBoqs } from "@/lib/mockData";
import { DataTable } from "@/components/ui/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";

interface BoqItem {
  id: string;
  srNo: string;
  description: string;
  unit: string;
  quantity: number;
  rate: number;
  amount: number;
}

export default function BoqPage() {
  const { toast } = useToast();
  const [activeBoq, setActiveBoq] = useState(initialBoqs[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BoqItem | null>(null);

  // Form State
  const [srNo, setSrNo] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState("");

  const handleAddClick = () => {
    setSelectedItem(null);
    setSrNo(String(activeBoq.items.length + 1));
    setDescription("");
    setUnit("SFT");
    setQuantity("");
    setRate("");
    setModalOpen(true);
  };

  const handleEditClick = (item: BoqItem) => {
    setSelectedItem(item);
    setSrNo(item.srNo);
    setDescription(item.description);
    setUnit(item.unit);
    setQuantity(String(item.quantity));
    setRate(String(item.rate));
    setModalOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this BOQ item?")) {
      const updatedItems = activeBoq.items.filter((i) => i.id !== id);
      const total = updatedItems.reduce((acc, curr) => acc + curr.amount, 0);
      setActiveBoq((prev) => ({
        ...prev,
        items: updatedItems,
        totalAmount: total,
      }));
      toast("BOQ item deleted successfully!");
    }
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (!srNo.trim() || !description.trim() || !unit.trim() || !quantity || !rate) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const qtyVal = parseFloat(quantity);
    const rateVal = parseFloat(rate);
    const amountVal = qtyVal * rateVal;

    const itemData = {
      srNo,
      description,
      unit,
      quantity: qtyVal,
      rate: rateVal,
      amount: amountVal,
    };

    let updatedItems: BoqItem[];
    if (selectedItem) {
      updatedItems = activeBoq.items.map((i) =>
        i.id === selectedItem.id ? { ...i, ...itemData } : i
      );
      toast("BOQ item updated successfully!");
    } else {
      const newItem: BoqItem = {
        id: `boq-${Date.now()}`,
        ...itemData,
      };
      updatedItems = [...activeBoq.items, newItem];
      toast("BOQ item added successfully!");
    }

    const total = updatedItems.reduce((acc, curr) => acc + curr.amount, 0);
    setActiveBoq((prev) => ({
      ...prev,
      items: updatedItems,
      totalAmount: total,
    }));

    setModalOpen(false);
  };

  const [activeTab, setActiveTab] = useState<"master" | "contractor" | "variance">("master");

  const columns: GridColDef[] = [
    { field: "srNo", headerName: "Sr No", flex: 0.5 },
    { field: "description", headerName: "Item Description", flex: 2 },
    { field: "unit", headerName: "Unit", flex: 0.6 },
    { field: "quantity", headerName: "Quantity", flex: 0.8 },
    { field: "rate", headerName: "Unit Rate (₹)", flex: 1, valueFormatter: (v: any) => `₹${v}` },
    { field: "amount", headerName: "Total Amount (₹)", flex: 1.2, valueFormatter: (v: any) => `₹${v?.toLocaleString()}` },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (p) => (
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => handleEditClick(p.row as BoqItem)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Item"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteItem(p.row.id)}
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
            Bill of Quantities (BOQ)
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Check civil, architectural, and structural work line items rates, contractor bids, and quantity deviations.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add BOQ Item
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-concrete-100 dark:border-white/5">
        {[
          { id: "master", label: "Master BOQ" },
          { id: "contractor", label: "Contractor Bids & Rates" },
          { id: "variance", label: "Actual vs BOQ Variance" },
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

      <div className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
              {activeBoq.projectName}
            </h3>
            <p className="text-[12.5px] text-concrete-300">
              {activeTab === "master"
                ? "Master estimate sheet"
                : activeTab === "contractor"
                ? "Contractor BOQ schedule & pricing"
                : "Quantity variance analysis & deviation cost"}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[11.5px] text-concrete-350">BOQ Value</span>
            <p className="text-[18px] font-bold text-signal-orange">
              ₹{activeBoq.totalAmount.toLocaleString()}
            </p>
          </div>
        </div>

        {activeTab === "master" && (
          <DataTable rows={activeBoq.items} columns={columns} searchPlaceholder="Search BOQ items..." />
        )}

        {activeTab === "contractor" && (
          <div className="overflow-x-auto text-[13px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-concrete-100 dark:border-white/5 text-concrete-350 font-semibold">
                  <th className="py-2.5">Sr No</th>
                  <th className="py-2.5">Item Description</th>
                  <th className="py-2.5">Contractor Name</th>
                  <th className="py-2.5">Bid Rate (₹)</th>
                  <th className="py-2.5">Master Rate (₹)</th>
                  <th className="py-2.5">Difference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-concrete-50 dark:divide-white/5">
                {[
                  { sr: "1.1", desc: "Earthwork excavation in soil", contractor: "NPS Foundations", bid: "42", master: "45", diff: "-6.6%" },
                  { sr: "1.2", desc: "RCC M25 concrete mix", contractor: "NPS Foundations", bid: "6,200", master: "5,800", diff: "+6.8%" },
                  { sr: "2.1", desc: "Premium Grade steel rebar", contractor: "Jai Steel Erectors", bid: "68", master: "65", diff: "+4.6%" },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-concrete-50 dark:hover:bg-blueprint-900/50">
                    <td className="py-3 font-semibold">{item.sr}</td>
                    <td className="py-3">{item.desc}</td>
                    <td className="py-3">{item.contractor}</td>
                    <td className="py-3 font-bold text-concrete-900 dark:text-blueprint-100">₹{item.bid}</td>
                    <td className="py-3">₹{item.master}</td>
                    <td className={`py-3 font-bold ${item.diff.startsWith("-") ? "text-green-600" : "text-red-500"}`}>{item.diff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "variance" && (
          <div className="overflow-x-auto text-[13px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-concrete-100 dark:border-white/5 text-concrete-350 font-semibold">
                  <th className="py-2.5">Sr No</th>
                  <th className="py-2.5">Item Description</th>
                  <th className="py-2.5">BOQ Qty</th>
                  <th className="py-2.5">Actual Qty</th>
                  <th className="py-2.5">Deviation Qty</th>
                  <th className="py-2.5">Cost Impact (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-concrete-50 dark:divide-white/5">
                {[
                  { sr: "1.1", desc: "Earthwork excavation in soil", boq: "1,500", actual: "1,620", dev: "+120", impact: "+₹5,400" },
                  { sr: "1.2", desc: "RCC M25 concrete mix", boq: "240", actual: "255", dev: "+15", impact: "+₹87,000" },
                  { sr: "2.1", desc: "Premium Grade steel rebar", boq: "8,500", actual: "8,200", dev: "-300", impact: "-₹19,500" },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-concrete-50 dark:hover:bg-blueprint-900/50">
                    <td className="py-3 font-semibold">{item.sr}</td>
                    <td className="py-3">{item.desc}</td>
                    <td className="py-3">{item.boq}</td>
                    <td className="py-3">{item.actual}</td>
                    <td className="py-3 text-red-500">{item.dev}</td>
                    <td className={`py-3 font-bold ${item.impact.startsWith("-") ? "text-green-600" : "text-red-500"}`}>{item.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedItem ? "Edit BOQ Item Details" : "Add New BOQ Item"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveItem} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Sr No *
              </label>
              <input
                type="text"
                required
                value={srNo}
                onChange={(e) => setSrNo(e.target.value)}
                placeholder="e.g. 1.1"
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
                placeholder="e.g. SFT, CFT, KG, MT"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
              Item Description *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Earthwork excavation in all types of soils..."
              className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Quantity *
              </label>
              <input
                type="number"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 1500"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Unit Rate (₹) *
              </label>
              <input
                type="number"
                required
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="e.g. 45"
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
              Save Item
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
