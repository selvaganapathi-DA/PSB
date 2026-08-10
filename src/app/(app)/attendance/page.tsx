"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { attendanceRecords as initialAttendanceRecords } from "@/lib/mockData";
import { GridColDef } from "@mui/x-data-grid";
import StatusChip from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";
import { Attendance } from "@/types";

export default function AttendancePage() {
  const { toast } = useToast();
  const [attendanceList, setAttendanceList] = useState<Attendance[]>(initialAttendanceRecords);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState<Attendance | null>(null);

  // Form State
  const [employeeName, setEmployeeName] = useState("");
  const [date, setDate] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [status, setStatus] = useState("Present");

  const handleAddClick = () => {
    setSelectedAttendance(null);
    setEmployeeName("");
    setDate("");
    setCheckIn("");
    setCheckOut("");
    setStatus("Present");
    setModalOpen(true);
  };

  const handleEditClick = (att: Attendance) => {
    setSelectedAttendance(att);
    setEmployeeName(att.employeeName);
    setDate(att.date);
    setCheckIn(att.checkIn || "");
    setCheckOut(att.checkOut || "");
    setStatus(att.status);
    setModalOpen(true);
  };

  const handleDeleteAttendance = (id: string) => {
    if (confirm("Are you sure you want to delete this attendance record?")) {
      setAttendanceList((prev) => prev.filter((a) => a.id !== id));
      toast("Attendance record deleted successfully!");
    }
  };

  const handleSaveAttendance = (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeName.trim() || !date || !status.trim()) {
      toast("Please fill in all required fields.", "error");
      return;
    }

    const attData = {
      employeeName,
      date,
      checkIn: status === "Present" ? checkIn || undefined : undefined,
      checkOut: status === "Present" ? checkOut || undefined : undefined,
      status: status as any,
      employeeId: selectedAttendance ? selectedAttendance.employeeId : `emp-${Date.now()}`,
    };

    if (selectedAttendance) {
      setAttendanceList((prev) =>
        prev.map((a) => (a.id === selectedAttendance.id ? { ...a, ...attData } : a))
      );
      toast("Attendance record updated successfully!");
    } else {
      const newAtt: Attendance = {
        id: `att-${Date.now()}`,
        ...attData,
      };
      setAttendanceList((prev) => [newAtt, ...prev]);
      toast("Attendance record added successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "employeeName", headerName: "Employee Name", flex: 2 },
    { field: "date", headerName: "Date", flex: 1.2 },
    { field: "checkIn", headerName: "Check In", flex: 1.2, valueFormatter: (v: any) => v || "--:--" },
    { field: "checkOut", headerName: "Check Out", flex: 1.2, valueFormatter: (v: any) => v || "--:--" },
    {
      field: "status",
      headerName: "Attendance Status",
      flex: 1.5,
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
            onClick={() => handleEditClick(p.row as Attendance)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Record"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteAttendance(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Record"
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
            Attendance Log
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Check daily login hours, site geo-fenced logs, and leave entries.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Attendance Record
        </button>
      </div>

      <DataTable rows={attendanceList} columns={columns} searchPlaceholder="Search attendance..." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedAttendance ? "Edit Attendance Record" : "Add Attendance Record"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveAttendance} className="space-y-4">
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
                placeholder="e.g. PSB"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Check In
              </label>
              <input
                type="text"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                placeholder="e.g. 08:15 AM"
                disabled={status !== "Present"}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Check Out
              </label>
              <input
                type="text"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                placeholder="e.g. 05:45 PM"
                disabled={status !== "Present"}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Attendance Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="On Leave">On Leave</option>
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
              Save Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
