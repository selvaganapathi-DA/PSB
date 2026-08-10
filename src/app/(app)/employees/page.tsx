"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { employees as initialEmployees } from "@/lib/mockData";
import { GridColDef } from "@mui/x-data-grid";
import StatusChip from "@/components/ui/StatusChip";
import { Avatar } from "@/components/ui/Avatar";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";
import { Employee } from "@/types";

export default function EmployeesPage() {
  const { toast } = useToast();
  const [employeesList, setEmployeesList] = useState<Employee[]>(initialEmployees);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [site, setSite] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("Present");

  const handleAddClick = () => {
    setSelectedEmployee(null);
    setName("");
    setRole("");
    setDepartment("");
    setSite("");
    setPhone("");
    setStatus("Present");
    setModalOpen(true);
  };

  const handleEditClick = (emp: Employee) => {
    setSelectedEmployee(emp);
    setName(emp.name);
    setRole(emp.role);
    setDepartment(emp.department);
    setSite(emp.site);
    setPhone(emp.phone);
    setStatus(emp.status);
    setModalOpen(true);
  };

  const handleDeleteEmployee = (id: string) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      setEmployeesList((prev) => prev.filter((e) => e.id !== id));
      toast("Employee deleted successfully!");
    }
  };

  const handleSaveEmployee = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !role.trim() || !department.trim() || !site.trim() || !phone.trim() || !status.trim()) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const empData = {
      name,
      role,
      department,
      site,
      phone,
      status: status as any,
      avatar: name.split(" ").map((n) => n[0]).join(""),
    };

    if (selectedEmployee) {
      setEmployeesList((prev) =>
        prev.map((e) => (e.id === selectedEmployee.id ? { ...e, ...empData } : e))
      );
      toast("Employee updated successfully!");
    } else {
      const newEmp: Employee = {
        id: `e-${Date.now()}`,
        ...empData,
      };
      setEmployeesList((prev) => [...prev, newEmp]);
      toast("Employee added successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Employee Name",
      flex: 2,
      renderCell: (p) => (
        <div className="flex items-center gap-3 mt-1">
          <Avatar name={p.value} />
          <span className="font-semibold">{p.value}</span>
        </div>
      ),
    },
    { field: "role", headerName: "Role/Designation", flex: 1.5 },
    { field: "department", headerName: "Department", flex: 1.2 },
    { field: "site", headerName: "Assigned Site", flex: 2 },
    { field: "phone", headerName: "Contact Phone", flex: 1.5 },
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
            onClick={() => handleEditClick(p.row as Employee)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Employee"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteEmployee(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Employee"
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
            Employees Directory
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Manage profiles of site engineers, safety officers, supervisors, and administrative staff.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Employee
        </button>
      </div>

      <DataTable rows={employeesList} columns={columns} searchPlaceholder="Search staff..." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedEmployee ? "Edit Employee details" : "Add New Employee"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveEmployee} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Employee Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. PSB"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Role/Designation *
              </label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Site Engineer"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Department *
              </label>
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Civil, MEP, Estimations"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Assigned Site *
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Contact Phone *
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
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
              Save Employee
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
