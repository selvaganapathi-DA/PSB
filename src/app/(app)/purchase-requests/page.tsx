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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
            Purchase Requests (PR)
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Create, audit, and authorize internal site material purchase requests.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Create Request
        </button>
      </div>

      <DataTable rows={mockRequests} columns={columns} searchPlaceholder="Search requests..." />

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
