"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { Card, CardHeader } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Stepper } from "@/components/ui/Stepper";
import { GridColDef } from "@mui/x-data-grid";
import StatusChip from "@/components/ui/StatusChip";
import { useToast } from "@/components/ui/Toast";

export default function PurchaseRequestsPage() {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const mockRequests = [
    { id: "1", prNumber: "PR-8801", project: "Skyline Business Tower", item: "Cement (400 Bags)", requestedBy: "Ravi Shankar", date: "2026-07-07", status: "Approved" },
    { id: "2", prNumber: "PR-8802", project: "Riverside Residency Phase 2", item: "Steel Reinforcement 16mm (5 Tons)", requestedBy: "Lakshmi Narayanan", date: "2026-07-08", status: "Pending" },
    { id: "3", prNumber: "PR-8803", project: "Dharmapuri Highway Overpass", item: "Fine Aggregate River Sand (50 Cu.m)", requestedBy: "Suresh Kumar", date: "2026-07-08", status: "Draft" },
  ];

  const columns: GridColDef[] = [
    { field: "prNumber", headerName: "PR Number", flex: 1 },
    { field: "project", headerName: "Project", flex: 1.5 },
    { field: "item", headerName: "Requested Item(s)", flex: 2 },
    { field: "requestedBy", headerName: "Requested By", flex: 1.2 },
    { field: "date", headerName: "Request Date", flex: 1 },
    { field: "status", headerName: "Status", flex: 1, renderCell: (p) => <StatusChip label={p.value} /> },
  ];

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setModalOpen(false);
      setCurrentStep(0);
      toast("Purchase Request created and forwarded for approval!");
    }
  };

  const [activeTab, setActiveTab] = useState<"requisitions" | "rfq" | "grn" | "returns">("requisitions");
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
            Material Requisitions & Procurement
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Verify site material requests, generate RFQs, compare vendor terms, log Goods Receipt Notes (GRN), and track returns.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Create Request
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-concrete-100 dark:border-white/5">
        {[
          { id: "requisitions", label: "Material Requisitions" },
          { id: "rfq", label: "RFQ & Vendor Comparison" },
          { id: "grn", label: "Goods Receipt Note (GRN)" },
          { id: "returns", label: "Purchase Returns" },
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

      {activeTab === "requisitions" && (
        <DataTable rows={mockRequests} columns={columns} searchPlaceholder="Search requests..." />
      )}

      {activeTab === "rfq" && (
        <div className="overflow-x-auto text-[13px] bg-white dark:bg-blueprint-850 p-5 rounded-2xl border border-concrete-100 dark:border-white/5 shadow-card">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-concrete-950 dark:text-blueprint-100">Vendor Rate Comparison Matrix</h4>
            <button onClick={() => toast("Generating new RFQ broadcast...")} className="px-3 py-1.5 bg-signal-orange text-[11px] font-bold text-white rounded-lg">BroadCast RFQ</button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-concrete-100 dark:border-white/5 text-concrete-350 font-semibold">
                <th className="py-2.5">Material</th>
                <th className="py-2.5">Vendor A (Maha Steel)</th>
                <th className="py-2.5">Vendor B (Deccan Steel)</th>
                <th className="py-2.5">Vendor C (Ultra Steel)</th>
                <th className="py-2.5">Best Option</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-concrete-50 dark:divide-white/5">
              {[
                { mat: "TMT Steel Rebar (Fe500)", vA: "₹65,000 / Ton (+18% GST)", vB: "₹64,500 / Ton (+18% GST)", vC: "₹66,200 / Ton (Inclusive)", best: "Deccan Steel (Lowest Bid)" },
                { mat: "OPC Cement (53 Grade)", vA: "₹420 / Bag (Free Delivery)", vB: "₹415 / Bag (+₹10 Delivery)", vC: "₹430 / Bag (Free Delivery)", best: "Maha Steel (Best Terms)" },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-concrete-50 dark:hover:bg-blueprint-900/50">
                  <td className="py-3 font-semibold">{item.mat}</td>
                  <td className="py-3">{item.vA}</td>
                  <td className="py-3">{item.vB}</td>
                  <td className="py-3">{item.vC}</td>
                  <td className="py-3 font-bold text-green-600">{item.best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "grn" && (
        <div className="overflow-x-auto text-[13px] bg-white dark:bg-blueprint-850 p-5 rounded-2xl border border-concrete-100 dark:border-white/5 shadow-card">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-concrete-100 dark:border-white/5 text-concrete-350 font-semibold">
                <th className="py-2.5">GRN No</th>
                <th className="py-2.5">Received Date</th>
                <th className="py-2.5">Material & Qty Received</th>
                <th className="py-2.5">Supplier</th>
                <th className="py-2.5">Quality Check</th>
                <th className="py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-concrete-50 dark:divide-white/5">
              {[
                { no: "GRN-2201-44", date: "2026-08-10", mat: "OPC Cement - 400 Bags", supplier: "Maha Cement Dist", qc: "Pass (No moisture)", status: "Inwarded" },
                { no: "GRN-2201-45", date: "2026-08-08", mat: "TMT Steel Rebar - 15 Tons", supplier: "Deccan Steel Traders", qc: "Pass (Visual audit OK)", status: "Inwarded" },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-concrete-50 dark:hover:bg-blueprint-900/50">
                  <td className="py-3 font-semibold">{item.no}</td>
                  <td className="py-3">{item.date}</td>
                  <td className="py-3">{item.mat}</td>
                  <td className="py-3">{item.supplier}</td>
                  <td className="py-3 text-green-600 font-bold">{item.qc}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-green-100 text-green-700 dark:bg-green-950/30">{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "returns" && (
        <div className="overflow-x-auto text-[13px] bg-white dark:bg-blueprint-850 p-5 rounded-2xl border border-concrete-100 dark:border-white/5 shadow-card">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-concrete-100 dark:border-white/5 text-concrete-350 font-semibold">
                <th className="py-2.5">Return ID</th>
                <th className="py-2.5">Supplier</th>
                <th className="py-2.5">Material & Qty Returned</th>
                <th className="py-2.5">Reason for Return</th>
                <th className="py-2.5">Refund/Credit note status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-concrete-50 dark:divide-white/5">
              {[
                { id: "RET-901", supplier: "Maha Cement Dist", qty: "Cement - 15 Bags", reason: "Damaged / Moisture hardened during transit", status: "Credit Note Issued" },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-concrete-50 dark:hover:bg-blueprint-900/50">
                  <td className="py-3 font-semibold">{item.id}</td>
                  <td className="py-3 font-bold">{item.supplier}</td>
                  <td className="py-3 text-red-500">{item.qty}</td>
                  <td className="py-3">{item.reason}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/30">{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setCurrentStep(0); }} title="Create Material Purchase Request" maxWidth="md">
        <div className="space-y-6">
          <Stepper steps={["Material Details", "Site Allocation", "Review & Submit"]} currentStep={currentStep} />

          <div className="mt-4 border-t border-concrete-100 pt-4 dark:border-white/5">
            {currentStep === 0 && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                    Select Material Category
                  </label>
                  <select className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100">
                    <option>Cement</option>
                    <option>Steel & Reinforcement</option>
                    <option>Aggregates (Sand / Blue Metal)</option>
                    <option>Masonry (Bricks / Blocks)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                    Required Quantity & Unit
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Quantity"
                      className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100"
                    />
                    <input
                      type="text"
                      placeholder="e.g. Bags / Tons / Cu.m"
                      className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                    Allocated Project Site
                  </label>
                  <select className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100">
                    <option>Skyline Business Tower</option>
                    <option>Riverside Residency Phase 2</option>
                    <option>Dharmapuri Highway Overpass</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                    Required By Date
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-2 text-[13px]">
                <p className="font-semibold text-concrete-900 dark:text-blueprint-100">Please review the details:</p>
                <div className="bg-concrete-50/50 p-4 rounded-xl dark:bg-blueprint-900/30 space-y-2">
                  <div className="flex justify-between"><span className="text-concrete-350">Material:</span> <span className="font-medium text-concrete-900 dark:text-blueprint-100">Cement</span></div>
                  <div className="flex justify-between"><span className="text-concrete-350">Quantity:</span> <span className="font-medium text-concrete-900 dark:text-blueprint-100">400 Bags</span></div>
                  <div className="flex justify-between"><span className="text-concrete-350">Allocation:</span> <span className="font-medium text-concrete-900 dark:text-blueprint-100">Skyline Business Tower</span></div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4 mt-6 border-t border-concrete-100 dark:border-white/5">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="rounded-xl border border-concrete-100 bg-white px-4 py-2.5 text-[12.5px] font-semibold text-concrete-600 dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-200"
                >
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white hover:bg-signal-orange/95"
              >
                {currentStep === 2 ? "Submit Request" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
