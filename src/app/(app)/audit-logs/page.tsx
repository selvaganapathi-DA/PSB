"use client";

import React from "react";
import { DataTable } from "@/components/ui/DataTable";
import { GridColDef } from "@mui/x-data-grid";

export default function AuditLogsPage() {
  const auditLogs = [
    { id: "1", user: "PSB", action: "Updated general settings", ipAddress: "192.168.1.42", timestamp: "2026-07-08 17:15" },
    { id: "2", user: "Priya Ramachandran", action: "Approved purchase order PO-3391", ipAddress: "192.168.1.15", timestamp: "2026-07-08 16:40" },
    { id: "3", user: "System", action: "Sent automated invoice INV-9022", ipAddress: "127.0.0.1", timestamp: "2026-07-08 12:00" },
    { id: "4", user: "Kavitha Iyer", action: "Logged safety hazard checklist", ipAddress: "192.168.1.99", timestamp: "2026-07-07 14:15" },
  ];

  const columns: GridColDef[] = [
    { field: "timestamp", headerName: "Timestamp", flex: 1.2 },
    { field: "user", headerName: "System User", flex: 1.2 },
    { field: "action", headerName: "Operation Action", flex: 2 },
    { field: "ipAddress", headerName: "IP Address", flex: 1 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
          System Audit Logs
        </h1>
        <p className="mt-1 text-[13px] text-concrete-300">
          Comprehensive ledger of actions, security events, and database changes.
        </p>
      </div>

      <DataTable rows={auditLogs} columns={columns} searchPlaceholder="Search audit log..." />
    </div>
  );
}
