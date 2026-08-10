"use client";

import React, { useState } from "react";
import { Coins, LineChart, FileText, CheckSquare, Plus, Edit2, Trash2, TrendingUp } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { Modal } from "@/components/ui/Modal";

interface CostCenter {
  id: string;
  code: string;
  name: string;
  budget: number;
  spent: number;
}

interface PaymentApproval {
  id: string;
  ref: string;
  project: string;
  cat: string;
  amount: number;
  stage: string;
  status: "Pending" | "Approved" | "Rejected";
}

export default function FinancePage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"accounting" | "cashflow" | "taxes" | "approvals">("accounting");

  // Cost Centers State
  const [costCenters, setCostCenters] = useState<CostCenter[]>([
    { id: "cc1", code: "CC-SKY-FOUND", name: "Skyline Foundation & Piling", budget: 4500000, spent: 4120000 },
    { id: "cc2", code: "CC-SKY-CEMENT", name: "Skyline Raw Cement Stockpile", budget: 8500000, spent: 9100000 },
    { id: "cc3", code: "CC-RIV-ROOFING", name: "Riverside Roof Slab Pouring", budget: 3200000, spent: 1850000 },
  ]);

  const [ccModalOpen, setCcModalOpen] = useState(false);
  const [selectedCc, setSelectedCc] = useState<CostCenter | null>(null);

  // Cost Center Form Fields
  const [ccCode, setCcCode] = useState("");
  const [ccName, setCcName] = useState("");
  const [ccBudget, setCcBudget] = useState("");
  const [ccSpent, setCcSpent] = useState("");

  // Payment Approvals State
  const [approvals, setApprovals] = useState<PaymentApproval[]>([
    { id: "pa1", ref: "PO-2201-09", project: "Skyline Business Tower", cat: "Materials Supply (Cement)", amount: 1240000, stage: "CEO Authorization Required", status: "Pending" },
    { id: "pa2", ref: "BILL-2244-12", project: "Riverside Residency", cat: "Subcontractor RA Bill 4", amount: 450000, stage: "Project Manager Approval", status: "Pending" },
    { id: "pa3", ref: "EXP-2289-01", project: "Dharmapuri Highway Overpass", cat: "Fuel Expense (Excavator)", amount: 85000, stage: "Accounts Desk Verification", status: "Pending" },
  ]);

  const [appModalOpen, setAppModalOpen] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState<PaymentApproval | null>(null);

  // Approval Form Fields
  const [appRef, setAppRef] = useState("");
  const [appProject, setAppProject] = useState("Skyline Business Tower");
  const [appCat, setAppCat] = useState("");
  const [appAmount, setAppAmount] = useState("");
  const [appStage, setAppStage] = useState("Accounts Desk Verification");

  // Cost Center Actions
  const handleAddCcClick = () => {
    setSelectedCc(null);
    setCcCode("");
    setCcName("");
    setCcBudget("");
    setCcSpent("0");
    setCcModalOpen(true);
  };

  const handleEditCcClick = (cc: CostCenter) => {
    setSelectedCc(cc);
    setCcCode(cc.code);
    setCcName(cc.name);
    setCcBudget(String(cc.budget));
    setCcSpent(String(cc.spent));
    setCcModalOpen(true);
  };

  const handleDeleteCc = (id: string) => {
    if (confirm("Are you sure you want to delete this cost center?")) {
      setCostCenters((prev) => prev.filter((c) => c.id !== id));
      toast("Cost center deleted successfully!");
    }
  };

  const handleSaveCc = (e: React.FormEvent) => {
    e.preventDefault();
    const budgetVal = parseFloat(ccBudget) || 0;
    const spentVal = parseFloat(ccSpent) || 0;

    const data: CostCenter = {
      id: selectedCc ? selectedCc.id : `cc-${Date.now()}`,
      code: ccCode,
      name: ccName,
      budget: budgetVal,
      spent: spentVal,
    };

    if (selectedCc) {
      setCostCenters((prev) => prev.map((c) => (c.id === selectedCc.id ? data : c)));
      toast("Cost center updated!");
    } else {
      setCostCenters((prev) => [...prev, data]);
      toast("Cost center created successfully!");
    }
    setCcModalOpen(false);
  };

  // Payment Approvals Actions
  const handleAddAppClick = () => {
    setSelectedApproval(null);
    setAppRef(`REQ-${Date.now().toString().slice(-4)}`);
    setAppProject("Skyline Business Tower");
    setAppCat("");
    setAppAmount("");
    setAppStage("Accounts Desk Verification");
    setAppModalOpen(true);
  };

  const handleEditAppClick = (pa: PaymentApproval) => {
    setSelectedApproval(pa);
    setAppRef(pa.ref);
    setAppProject(pa.project);
    setAppCat(pa.cat);
    setAppAmount(String(pa.amount));
    setAppStage(pa.stage);
    setAppModalOpen(true);
  };

  const handleDeleteApp = (id: string) => {
    if (confirm("Are you sure you want to delete this approval request?")) {
      setApprovals((prev) => prev.filter((a) => a.id !== id));
      toast("Approval request deleted successfully!");
    }
  };

  const handleSaveApproval = (e: React.FormEvent) => {
    e.preventDefault();
    const amtVal = parseFloat(appAmount) || 0;

    const data: PaymentApproval = {
      id: selectedApproval ? selectedApproval.id : `pa-${Date.now()}`,
      ref: appRef,
      project: appProject,
      cat: appCat,
      amount: amtVal,
      stage: appStage,
      status: selectedApproval ? selectedApproval.status : "Pending",
    };

    if (selectedApproval) {
      setApprovals((prev) => prev.map((a) => (a.id === selectedApproval.id ? data : a)));
      toast("Approval request updated!");
    } else {
      setApprovals((prev) => [...prev, data]);
      toast("Approval request created!");
    }
    setAppModalOpen(false);
  };

  const handleAuthorize = (id: string, authorize: boolean) => {
    setApprovals((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          return { ...a, status: authorize ? "Approved" : "Rejected", stage: authorize ? "Authorized" : "Disapproved" };
        }
        return a;
      })
    );
    toast(authorize ? "Payment request approved and passed to accounts!" : "Payment request rejected!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100 flex items-center gap-2">
          <Coins className="h-6 w-6 text-signal-orange" />
          Project Finance & Cost Centers
        </h1>
        <p className="mt-1 text-[13px] text-concrete-300">
          Monitor block/site-wise expenditure, analyze cash flows, calculate GST/TDS tax liabilities, and manage payment authorizations.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-concrete-100 dark:border-white/5">
        {[
          { id: "accounting", label: "Project Cost Centers", icon: FileText },
          { id: "cashflow", label: "Cash Flow (Planned vs Actual)", icon: LineChart },
          { id: "taxes", label: "GST & Tax Calculations", icon: Coins },
          { id: "approvals", label: "Multi-Level Approvals", icon: CheckSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 text-[13px] font-medium transition-all border-b-2 -mb-[2px] ${
                activeTab === tab.id
                  ? "border-signal-orange text-signal-orange font-semibold"
                  : "border-transparent text-concrete-300 hover:text-concrete-900 dark:hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Project Cost Centers */}
      {activeTab === "accounting" && (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
                Active Cost Center Allocations
              </h3>
              <button
                onClick={handleAddCcClick}
                className="flex items-center gap-1.5 rounded-xl bg-signal-orange px-3 py-1.5 text-[11px] font-semibold text-white shadow"
              >
                <Plus className="h-3 w-3" /> Add Cost Center
              </button>
            </div>

            {costCenters.map((cc) => {
              const overflow = cc.spent > cc.budget;
              const percent = Math.min(100, (cc.spent / cc.budget) * 100);

              return (
                <div key={cc.id} className="p-4 border border-concrete-100 dark:border-white/5 rounded-xl text-[12.5px] relative group">
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <span className="text-[10px] text-concrete-350 block font-bold">{cc.code}</span>
                      <span className="font-semibold text-concrete-800 dark:text-blueprint-100">{cc.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold block">₹{cc.spent.toLocaleString()} / ₹{cc.budget.toLocaleString()}</span>
                      <span className={`text-[10px] ${overflow ? "text-red-500 font-bold" : "text-concrete-350"}`}>
                        {overflow ? "BUDGET OVERRUN" : `${percent.toFixed(0)}% Consumed`}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-concrete-100 dark:bg-blueprint-900 rounded-full h-1.5 mt-2">
                    <div
                      className={`h-1.5 rounded-full ${overflow ? "bg-red-500" : "bg-signal-orange"}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-2 bg-white/95 dark:bg-blueprint-900/95 p-1 rounded shadow">
                    <button onClick={() => handleEditCcClick(cc)} className="text-concrete-600 dark:text-white">
                      <Edit2 className="h-3 w-3" />
                    </button>
                    <button onClick={() => handleDeleteCc(cc.id)} className="text-red-500">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850 h-fit space-y-4">
            <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
              Disbursements Summary
            </h3>
            <div className="space-y-3 text-[12.5px]">
              <div className="flex justify-between">
                <span>Total Allocated Budget</span>
                <span className="font-bold">₹{costCenters.reduce((acc, cc) => acc + cc.budget, 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Expended</span>
                <span className="font-bold text-green-600">₹{costCenters.reduce((acc, cc) => acc + cc.spent, 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cash Flow Forecast */}
      {activeTab === "cashflow" && (
        <div className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
                Cash Flow Projections (Q3 - Q4 2026)
              </h3>
              <p className="text-[12.5px] text-concrete-300">Planned disbursement vs actual receipts forecast</p>
            </div>
            <span className="text-[12.5px] text-concrete-350 flex items-center gap-1"><TrendingUp className="h-4 w-4 text-green-500" /> Positively Trended (+12%)</span>
          </div>

          <div className="space-y-4 text-[13px]">
            <div className="grid grid-cols-4 border-b border-concrete-100 dark:border-white/5 pb-2 text-concrete-350 font-bold">
              <span>Month</span>
              <span>Planned Outflow (₹)</span>
              <span>Projected Receipts (₹)</span>
              <span>Net Position (₹)</span>
            </div>
            {[
              { month: "August 2026", outflow: "45,00,000", receipts: "52,00,000", position: "+7,00,000", ok: true },
              { month: "September 2026", outflow: "60,00,000", receipts: "48,00,000", position: "-12,00,000", ok: false },
              { month: "October 2026", outflow: "35,00,000", receipts: "65,00,000", position: "+30,00,000", ok: true },
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-4 py-2 border-b border-concrete-50 dark:border-white/5">
                <span className="font-semibold">{row.month}</span>
                <span>₹{row.outflow}</span>
                <span>₹{row.receipts}</span>
                <span className={row.ok ? "text-green-600 font-bold" : "text-red-500 font-bold"}>₹{row.position}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GST & Taxes */}
      {activeTab === "taxes" && (
        <div className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850">
          <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100 mb-4">
            Tax Ledger & Compliance Filing
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-[13px]">
            <div className="p-4 border border-concrete-100 dark:border-white/5 rounded-xl space-y-3">
              <h4 className="font-bold text-signal-orange">GST Tracker</h4>
              <div className="flex justify-between">
                <span className="text-concrete-350">Output CGST (18% on Billings)</span>
                <span>₹8,45,200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-concrete-350">Input Tax Credit (ITC Claims)</span>
                <span className="text-green-600">-₹5,10,800</span>
              </div>
              <div className="flex justify-between border-t border-concrete-100 dark:border-white/5 pt-2 font-bold">
                <span>Net Payable GST</span>
                <span>₹3,34,400</span>
              </div>
            </div>

            <div className="p-4 border border-concrete-100 dark:border-white/5 rounded-xl space-y-3">
              <h4 className="font-bold text-signal-orange">TDS deduction logs</h4>
              <div className="flex justify-between">
                <span className="text-concrete-350">TDS u/s 194C (Subcontractors)</span>
                <span>₹1,88,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-concrete-350">TDS u/s 194I (Rent/Land lease)</span>
                <span>₹92,000</span>
              </div>
              <div className="flex justify-between border-t border-concrete-100 dark:border-white/5 pt-2 font-bold">
                <span>Total Deducted</span>
                <span>₹2,80,000</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Multi-level Approvals */}
      {activeTab === "approvals" && (
        <div className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
              Pending Payment Approvals Matrix
            </h3>
            <button
              onClick={handleAddAppClick}
              className="flex items-center gap-1.5 rounded-xl bg-signal-orange px-3.5 py-2 text-[12px] font-semibold text-white shadow"
            >
              <Plus className="h-3.5 w-3.5" />
              New Approval Request
            </button>
          </div>

          <div className="overflow-x-auto text-[13px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-concrete-100 dark:border-white/5 text-concrete-350 font-semibold">
                  <th className="py-2.5">Reference</th>
                  <th className="py-2.5">Project</th>
                  <th className="py-2.5">Category</th>
                  <th className="py-2.5">Amount (₹)</th>
                  <th className="py-2.5">Authority Stage</th>
                  <th className="py-2.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-concrete-50 dark:divide-white/5">
                {approvals.map((item) => (
                  <tr key={item.id} className="hover:bg-concrete-50 dark:hover:bg-blueprint-900/50">
                    <td className="py-3 font-semibold">{item.ref}</td>
                    <td className="py-3">{item.project}</td>
                    <td className="py-3">{item.cat}</td>
                    <td className="py-3 font-bold text-concrete-900 dark:text-blueprint-100">₹{item.amount.toLocaleString()}</td>
                    <td className="py-3 text-signal-orange font-medium">
                      {item.status === "Pending" ? item.stage : item.status}
                    </td>
                    <td className="py-3">
                      {item.status === "Pending" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAuthorize(item.id, true)}
                            className="px-2.5 py-1 text-[11px] font-semibold bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAuthorize(item.id, false)}
                            className="px-2.5 py-1 text-[11px] font-semibold bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                          >
                            Reject
                          </button>
                          <button onClick={() => handleEditAppClick(item)} className="p-1 text-concrete-400 hover:text-white">
                            <Edit2 className="h-3 w-3" />
                          </button>
                          <button onClick={() => handleDeleteApp(item.id)} className="p-1 text-red-500">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <span className={`text-[12px] font-bold ${item.status === "Approved" ? "text-green-600" : "text-red-500"}`}>
                          Decision Finalized
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cost Center Modal */}
      <Modal
        open={ccModalOpen}
        onClose={() => setCcModalOpen(false)}
        title={selectedCc ? "Edit Cost Center Details" : "Add Cost Center Allocation"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveCc} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Cost Center Code *
              </label>
              <input
                type="text"
                required
                disabled={!!selectedCc}
                value={ccCode}
                onChange={(e) => setCcCode(e.target.value)}
                placeholder="e.g. CC-SKY-TILE"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Allocation Target Name *
              </label>
              <input
                type="text"
                required
                value={ccName}
                onChange={(e) => setCcName(e.target.value)}
                placeholder="e.g. Skyline Tiling & Flooring"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Allocated Budget (₹) *
              </label>
              <input
                type="number"
                required
                value={ccBudget}
                onChange={(e) => setCcBudget(e.target.value)}
                placeholder="e.g. 500000"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Spent Amount (₹)
              </label>
              <input
                type="number"
                value={ccSpent}
                onChange={(e) => setCcSpent(e.target.value)}
                placeholder="e.g. 0"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-4">
            <button
              type="button"
              onClick={() => setCcModalOpen(false)}
              className="rounded-xl border border-concrete-100 bg-white px-4 py-2.5 text-[12.5px] font-semibold text-concrete-600 hover:bg-concrete-50 dark:border-white/5 dark:bg-blueprint-850 dark:text-blueprint-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white hover:bg-signal-orange/90"
            >
              Save Allocation
            </button>
          </div>
        </form>
      </Modal>

      {/* Payment Approval Modal */}
      <Modal
        open={appModalOpen}
        onClose={() => setAppModalOpen(false)}
        title={selectedApproval ? "Edit Payment Approval Details" : "Initiate Payment Request"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveApproval} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Reference Request ID *
              </label>
              <input
                type="text"
                required
                disabled={!!selectedApproval}
                value={appRef}
                onChange={(e) => setAppRef(e.target.value)}
                placeholder="e.g. PO-2201-10"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Project Site
              </label>
              <select
                value={appProject}
                onChange={(e) => setAppProject(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100"
              >
                <option value="Skyline Business Tower">Skyline Business Tower</option>
                <option value="Riverside Residency">Riverside Residency</option>
                <option value="Dharmapuri Highway Overpass">Dharmapuri Highway Overpass</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Category/Description *
              </label>
              <input
                type="text"
                required
                value={appCat}
                onChange={(e) => setAppCat(e.target.value)}
                placeholder="e.g. Electrical Conduit Fittings"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Request Amount (₹) *
              </label>
              <input
                type="number"
                required
                value={appAmount}
                onChange={(e) => setAppAmount(e.target.value)}
                placeholder="e.g. 150000"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
              Authority Stage Verification
            </label>
            <select
              value={appStage}
              onChange={(e) => setAppStage(e.target.value)}
              className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100"
            >
              <option value="Accounts Desk Verification">Accounts Desk Verification</option>
              <option value="Project Manager Approval">Project Manager Approval</option>
              <option value="CEO Authorization Required">CEO Authorization Required</option>
            </select>
          </div>

          <div className="flex justify-end gap-2.5 pt-4">
            <button
              type="button"
              onClick={() => setAppModalOpen(false)}
              className="rounded-xl border border-concrete-100 bg-white px-4 py-2.5 text-[12.5px] font-semibold text-concrete-600 hover:bg-concrete-50 dark:border-white/5 dark:bg-blueprint-850 dark:text-blueprint-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white hover:bg-signal-orange/90"
            >
              Save Request
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
