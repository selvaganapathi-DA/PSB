"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import StatusChip from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";

interface Expense {
  id: string;
  reference: string;
  category: string;
  project: string;
  amount: number;
  date: string;
  status: string;
}

export default function ExpensesPage() {
  const { toast } = useToast();
  const [expensesList, setExpensesList] = useState<Expense[]>([
    { id: "1", reference: "EXP-5011", category: "Fuel & Transit", project: "Skyline Business Tower", amount: 15400, date: "2026-07-07", status: "Approved" },
    { id: "2", reference: "EXP-5012", category: "Safety Helmets & Jackets", project: "Riverside Residency Phase 2", amount: 28000, date: "2026-07-08", status: "Pending" },
    { id: "3", reference: "EXP-5013", category: "Office Equipment & Stationery", project: "GreenLeaf IT Park", amount: 4800, date: "2026-07-08", status: "Draft" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  // Form State
  const [reference, setReference] = useState("");
  const [category, setCategory] = useState("");
  const [project, setProject] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Draft");

  const handleAddClick = () => {
    setSelectedExpense(null);
    setReference(`EXP-${Date.now().toString().slice(-4)}`);
    setCategory("");
    setProject("");
    setAmount("");
    setDate("");
    setStatus("Draft");
    setModalOpen(true);
  };

  const handleEditClick = (exp: Expense) => {
    setSelectedExpense(exp);
    setReference(exp.reference);
    setCategory(exp.category);
    setProject(exp.project);
    setAmount(String(exp.amount));
    setDate(exp.date);
    setStatus(exp.status);
    setModalOpen(true);
  };

  const handleDeleteExpense = (id: string) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      setExpensesList((prev) => prev.filter((e) => e.id !== id));
      toast("Expense deleted successfully!");
    }
  };

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();

    if (!reference.trim() || !category.trim() || !project.trim() || !amount || !date || !status.trim()) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const expData = {
      reference,
      category,
      project,
      amount: parseFloat(amount),
      date,
      status: status as any,
    };

    if (selectedExpense) {
      setExpensesList((prev) =>
        prev.map((e) => (e.id === selectedExpense.id ? { ...e, ...expData } : e))
      );
      toast("Expense updated successfully!");
    } else {
      const newExp: Expense = {
        id: `exp-${Date.now()}`,
        ...expData,
      };
      setExpensesList((prev) => [...prev, newExp]);
      toast("Expense added successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "reference", headerName: "Reference No", flex: 1 },
    { field: "category", headerName: "Category", flex: 1.2 },
    { field: "project", headerName: "Project", flex: 1.8 },
    { field: "amount", headerName: "Amount (₹)", flex: 1.2, valueFormatter: (v: any) => `₹${v?.toLocaleString()}` },
    { field: "date", headerName: "Expense Date", flex: 1.2 },
    { field: "status", headerName: "Status", flex: 1, renderCell: (p) => <StatusChip label={p.value} /> },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (p) => (
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => handleEditClick(p.row as Expense)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Expense"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteExpense(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Expense"
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
            Site Expenses Ledger
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Audit site petty cash bills, fuel expenditures, safety equipment, and logistics costs.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Expense
        </button>
      </div>

      <DataTable rows={expensesList} columns={columns} searchPlaceholder="Search expenses..." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedExpense ? "Edit Expense Details" : "Add New Expense"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveExpense} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Reference No *
              </label>
              <input
                type="text"
                required
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="e.g. EXP-5011"
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
                placeholder="e.g. Fuel, Safety Equipment"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Project Site *
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
                placeholder="e.g. 15400"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Expense Date *
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
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
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
              Save Expense
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
