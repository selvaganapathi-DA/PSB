"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { payrollRecords as initialPayrollRecords } from "@/lib/mockData";
import { GridColDef } from "@mui/x-data-grid";
import StatusChip from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";
import { Payroll } from "@/types";

export default function PayrollPage() {
  const { toast } = useToast();
  const [payrollList, setPayrollList] = useState<Payroll[]>(initialPayrollRecords);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState<Payroll | null>(null);

  // Form State
  const [employeeName, setEmployeeName] = useState("");
  const [month, setMonth] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [allowances, setAllowances] = useState("");
  const [deductions, setDeductions] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleAddClick = () => {
    setSelectedPayroll(null);
    setEmployeeName("");
    setMonth("June 2026");
    setBasicSalary("");
    setAllowances("");
    setDeductions("");
    setStatus("Pending");
    setModalOpen(true);
  };

  const handleEditClick = (pr: Payroll) => {
    setSelectedPayroll(pr);
    setEmployeeName(pr.employeeName);
    setMonth(pr.month);
    setBasicSalary(String(pr.basicSalary));
    setAllowances(String(pr.allowances));
    setDeductions(String(pr.deductions));
    setStatus(pr.status);
    setModalOpen(true);
  };

  const handleDeletePayroll = (id: string) => {
    if (confirm("Are you sure you want to delete this payroll record?")) {
      setPayrollList((prev) => prev.filter((p) => p.id !== id));
      toast("Payroll record deleted successfully!");
    }
  };

  const handleSavePayroll = (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeName.trim() || !month.trim() || !basicSalary || !allowances || !deductions || !status.trim()) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const basicVal = parseFloat(basicSalary);
    const allowancesVal = parseFloat(allowances);
    const deductionsVal = parseFloat(deductions);
    const netVal = basicVal + allowancesVal - deductionsVal;

    const prData = {
      employeeName,
      month,
      basicSalary: basicVal,
      allowances: allowancesVal,
      deductions: deductionsVal,
      netSalary: netVal,
      status: status as any,
      employeeId: selectedPayroll ? selectedPayroll.employeeId : `emp-${Date.now()}`,
    };

    if (selectedPayroll) {
      setPayrollList((prev) =>
        prev.map((p) => (p.id === selectedPayroll.id ? { ...p, ...prData } : p))
      );
      toast("Payroll record updated successfully!");
    } else {
      const newPr: Payroll = {
        id: `pr-${Date.now()}`,
        ...prData,
      };
      setPayrollList((prev) => [...prev, newPr]);
      toast("Payroll record added successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "employeeName", headerName: "Employee Name", flex: 2 },
    { field: "month", headerName: "Payroll Month", flex: 1.2 },
    { field: "basicSalary", headerName: "Basic (₹)", flex: 1.2, valueFormatter: (v: any) => `₹${v?.toLocaleString()}` },
    { field: "allowances", headerName: "Allowances (₹)", flex: 1.2, valueFormatter: (v: any) => `₹${v?.toLocaleString()}` },
    { field: "deductions", headerName: "Deductions (₹)", flex: 1.2, valueFormatter: (v: any) => `₹${v?.toLocaleString()}` },
    { field: "netSalary", headerName: "Net Salary (₹)", flex: 1.5, valueFormatter: (v: any) => `₹${v?.toLocaleString()}` },
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
            onClick={() => handleEditClick(p.row as Payroll)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Payroll"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeletePayroll(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Payroll"
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
            Workforce Payroll
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Generate monthly payslips, reconcile allowances/GST components, and review pay batches.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Payroll Record
        </button>
      </div>

      <DataTable rows={payrollList} columns={columns} searchPlaceholder="Search payroll..." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedPayroll ? "Edit Payroll Record" : "Add Payroll Record"}
        maxWidth="md"
      >
        <form onSubmit={handleSavePayroll} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Employee Name *
              </label>
              <input
                type="text"
                required
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                placeholder="e.g. Ravi Shankar"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Payroll Month *
              </label>
              <input
                type="text"
                required
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="e.g. June 2026"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Basic Salary (₹) *
              </label>
              <input
                type="number"
                required
                value={basicSalary}
                onChange={(e) => setBasicSalary(e.target.value)}
                placeholder="e.g. 45000"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Allowances (₹) *
              </label>
              <input
                type="number"
                required
                value={allowances}
                onChange={(e) => setAllowances(e.target.value)}
                placeholder="e.g. 8500"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Deductions (₹) *
              </label>
              <input
                type="number"
                required
                value={deductions}
                onChange={(e) => setDeductions(e.target.value)}
                placeholder="e.g. 4500"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
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
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
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
              Save Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
