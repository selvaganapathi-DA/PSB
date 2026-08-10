"use client";

import React, { useState } from "react";
import { budgets as initialBudgets } from "@/lib/mockData";
import { Card, CardHeader } from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";

interface BudgetCategory {
  name: string;
  allocated: number;
  spent: number;
}

interface Budget {
  id: string;
  projectName: string;
  totalBudget: number;
  allocated: number;
  spent: number;
  categories: BudgetCategory[];
}

export default function BudgetPage() {
  const { toast } = useToast();
  const [budgetsList, setBudgetsList] = useState<Budget[]>(initialBudgets);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);

  // Form State
  const [projectName, setProjectName] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [allocated, setAllocated] = useState("");
  const [spent, setSpent] = useState("");

  // Category Breakdown State
  const [civilAlloc, setCivilAlloc] = useState("");
  const [civilSpent, setCivilSpent] = useState("");
  const [mepAlloc, setMepAlloc] = useState("");
  const [mepSpent, setMepSpent] = useState("");
  const [finishingAlloc, setFinishingAlloc] = useState("");
  const [finishingSpent, setFinishingSpent] = useState("");

  const handleAddClick = () => {
    setSelectedBudget(null);
    setProjectName("");
    setTotalBudget("");
    setAllocated("");
    setSpent("");
    setCivilAlloc("");
    setCivilSpent("");
    setMepAlloc("");
    setMepSpent("");
    setFinishingAlloc("");
    setFinishingSpent("");
    setModalOpen(true);
  };

  const handleEditClick = (b: Budget) => {
    setSelectedBudget(b);
    setProjectName(b.projectName);
    setTotalBudget(String(b.totalBudget));
    setAllocated(String(b.allocated));
    setSpent(String(b.spent));

    const civil = b.categories.find((c) => c.name === "Civil & Structural") || { allocated: 0, spent: 0 };
    const mep = b.categories.find((c) => c.name === "MEP Works") || { allocated: 0, spent: 0 };
    const finish = b.categories.find((c) => c.name === "Finishing & Interior") || { allocated: 0, spent: 0 };

    setCivilAlloc(String(civil.allocated));
    setCivilSpent(String(civil.spent));
    setMepAlloc(String(mep.allocated));
    setMepSpent(String(mep.spent));
    setFinishingAlloc(String(finish.allocated));
    setFinishingSpent(String(finish.spent));

    setModalOpen(true);
  };

  const handleDeleteBudget = (id: string) => {
    if (confirm("Are you sure you want to delete this budget profile?")) {
      setBudgetsList((prev) => prev.filter((b) => b.id !== id));
      toast("Budget profile deleted successfully!");
    }
  };

  const handleSaveBudget = (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectName.trim() || !totalBudget || !allocated || !spent) {
      toast("Please fill in all general fields.", "error");
      return;
    }

    const categoriesList = [
      {
        name: "Civil & Structural",
        allocated: parseFloat(civilAlloc) || 0,
        spent: parseFloat(civilSpent) || 0,
      },
      {
        name: "MEP Works",
        allocated: parseFloat(mepAlloc) || 0,
        spent: parseFloat(mepSpent) || 0,
      },
      {
        name: "Finishing & Interior",
        allocated: parseFloat(finishingAlloc) || 0,
        spent: parseFloat(finishingSpent) || 0,
      },
    ];

    const bData = {
      projectName,
      totalBudget: parseFloat(totalBudget),
      allocated: parseFloat(allocated),
      spent: parseFloat(spent),
      categories: categoriesList,
    };

    if (selectedBudget) {
      setBudgetsList((prev) =>
        prev.map((b) => (b.id === selectedBudget.id ? { ...b, ...bData } : b))
      );
      toast("Budget profile updated successfully!");
    } else {
      const newBudget: Budget = {
        id: `bud-${Date.now()}`,
        ...bData,
      };
      setBudgetsList((prev) => [...prev, newBudget]);
      toast("Budget profile added successfully!");
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
            Project Budgets & Allocations
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Monitor variance, cost overruns, and category spending allocations.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Budget Profile
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {budgetsList.map((b) => {
          const percentSpent = Math.round((b.spent / b.totalBudget) * 100);

          return (
            <Card key={b.id} className="space-y-4 relative group">
              <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEditClick(b)}
                  className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
                  title="Edit Budget"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteBudget(b.id)}
                  className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
                  title="Delete Budget"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <CardHeader
                title={b.projectName}
                subtitle={`Total Budget: ₹${(b.totalBudget / 10000000).toFixed(2)} Cr`}
              />

              <div className="space-y-1">
                <div className="flex justify-between text-[12px] font-medium">
                  <span className="text-concrete-350">Budget Spent</span>
                  <span>{percentSpent}%</span>
                </div>
                <ProgressBar value={percentSpent} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-[13px] pt-2 border-t border-concrete-100 dark:border-white/5">
                <div>
                  <p className="text-[11px] text-concrete-350">Allocated</p>
                  <p className="font-semibold text-concrete-900 dark:text-blueprint-100">
                    ₹{b.allocated.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-concrete-350">Total Spent</p>
                  <p className="font-semibold text-concrete-900 dark:text-blueprint-100">
                    ₹{b.spent.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <h4 className="text-[12px] font-semibold text-concrete-900 dark:text-blueprint-100 text-left">Category Breakdown</h4>
                {b.categories.map((cat, idx) => {
                  const catPercent = cat.allocated > 0 ? Math.round((cat.spent / cat.allocated) * 100) : 0;
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-concrete-350">{cat.name}</span>
                        <span>{catPercent}%</span>
                      </div>
                      <ProgressBar value={catPercent} />
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedBudget ? "Edit Budget details" : "Add Budget Profile"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveBudget} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. Skyline Business Tower"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Total Budget (₹) *
              </label>
              <input
                type="number"
                required
                value={totalBudget}
                onChange={(e) => setTotalBudget(e.target.value)}
                placeholder="e.g. 50000000"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Allocated (₹) *
              </label>
              <input
                type="number"
                required
                value={allocated}
                onChange={(e) => setAllocated(e.target.value)}
                placeholder="e.g. 48000000"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Total Spent (₹) *
              </label>
              <input
                type="number"
                required
                value={spent}
                onChange={(e) => setSpent(e.target.value)}
                placeholder="e.g. 24000000"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-concrete-100 dark:border-white/5 space-y-3">
            <h4 className="text-[12px] font-semibold text-concrete-900 dark:text-blueprint-100">Category Breakdown</h4>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                  Civil & Structural (Allocated)
                </label>
                <input
                  type="number"
                  value={civilAlloc}
                  onChange={(e) => setCivilAlloc(e.target.value)}
                  placeholder="Allocated"
                  className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                  MEP Works (Allocated)
                </label>
                <input
                  type="number"
                  value={mepAlloc}
                  onChange={(e) => setMepAlloc(e.target.value)}
                  placeholder="Allocated"
                  className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                  Finishing & Interior (Allocated)
                </label>
                <input
                  type="number"
                  value={finishingAlloc}
                  onChange={(e) => setFinishingAlloc(e.target.value)}
                  placeholder="Allocated"
                  className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                  Civil & Structural (Spent)
                </label>
                <input
                  type="number"
                  value={civilSpent}
                  onChange={(e) => setCivilSpent(e.target.value)}
                  placeholder="Spent"
                  className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                  MEP Works (Spent)
                </label>
                <input
                  type="number"
                  value={mepSpent}
                  onChange={(e) => setMepSpent(e.target.value)}
                  placeholder="Spent"
                  className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                  Finishing & Interior (Spent)
                </label>
                <input
                  type="number"
                  value={finishingSpent}
                  onChange={(e) => setFinishingSpent(e.target.value)}
                  placeholder="Spent"
                  className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none"
                />
              </div>
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
              Save Budget
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
