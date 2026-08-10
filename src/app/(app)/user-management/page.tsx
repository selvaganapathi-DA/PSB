"use client";

import React from "react";
import { DataTable } from "@/components/ui/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import StatusChip from "@/components/ui/StatusChip";
import { Avatar } from "@/components/ui/Avatar";

export default function UserManagementPage() {
  const users = [
    { id: "1", name: "PSB", role: "Super Admin", email: "psb@buildforge.in", status: "Active" },
    { id: "2", name: "Priya Ramachandran", role: "Project Manager", email: "priya@buildforge.in", status: "Active" },
    { id: "3", name: "Suresh Kumar", role: "Supervisor", email: "suresh@buildforge.in", status: "Active" },
    { id: "4", name: "Kavitha Iyer", role: "HSE Auditor", email: "kavitha@buildforge.in", status: "Inactive" },
  ];

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "User Name",
      flex: 1.8,
      renderCell: (p) => (
        <div className="flex items-center gap-3 mt-1">
          <Avatar name={p.value} />
          <span className="font-semibold">{p.value}</span>
        </div>
      ),
    },
    { field: "role", headerName: "Role Privilege", flex: 1.5 },
    { field: "email", headerName: "System Email", flex: 2 },
    {
      field: "status",
      headerName: "Account Status",
      flex: 1.2,
      renderCell: (p) => (
        <StatusChip label={p.value} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
          User Privilege & Management
        </h1>
        <p className="mt-1 text-[13px] text-concrete-300">
          Manage system administrative access levels, roles, and credential activations.
        </p>
      </div>

      <DataTable rows={users} columns={columns} searchPlaceholder="Search users..." />
    </div>
  );
}
