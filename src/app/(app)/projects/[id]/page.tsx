"use client";

import React, { useState } from "react";
import { projects, tasks, invoices, documents } from "@/lib/mockData";
import { Card, CardHeader } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import ProgressBar from "@/components/ui/ProgressBar";
import StatusChip from "@/components/ui/StatusChip";
import { DataTable } from "@/components/ui/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { Building2, MapPin, DollarSign, FileText } from "lucide-react";

import { useParams } from "react-router-dom";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id) || projects[0];

  const [activeTab, setActiveTab] = useState("overview");

  const projectTasks = tasks.filter((t) => t.projectId === project.id);
  const projectInvoices = invoices.filter((i) => i.project === project.name);
  const projectDocs = documents.filter((d) => d.category === "Contract" || d.category === "Drawing");

  const taskCols: GridColDef[] = [
    { field: "title", headerName: "Task Description", flex: 2 },
    { field: "assignee", headerName: "Assignee", flex: 1 },
    { field: "priority", headerName: "Priority", flex: 1, renderCell: (p) => <StatusChip label={p.value} /> },
    { field: "status", headerName: "Status", flex: 1, renderCell: (p) => <StatusChip label={p.value} /> },
    { field: "dueDate", headerName: "Due Date", flex: 1 },
  ];

  const invCols: GridColDef[] = [
    { field: "invoiceNumber", headerName: "Invoice No", flex: 1 },
    { field: "amount", headerName: "Amount (₹)", flex: 1, valueFormatter: (v: any) => `₹${v?.toLocaleString()}` },
    { field: "status", headerName: "Status", flex: 1, renderCell: (p) => <StatusChip label={p.value} /> },
    { field: "dueDate", headerName: "Due Date", flex: 1 },
  ];

  const docCols: GridColDef[] = [
    { field: "name", headerName: "Document Name", flex: 2 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "size", headerName: "Size", flex: 1 },
    { field: "uploadedBy", headerName: "Uploaded By", flex: 1 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11.5px] font-mono font-semibold text-concrete-300 dark:text-blueprint-400">
              {project.code}
            </span>
            <StatusChip label={project.status} />
          </div>
          <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
            {project.name}
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span>{project.location}</span>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: "overview", label: "Overview" },
          { id: "tasks", label: "Tasks" },
          { id: "financials", label: "Financials" },
          { id: "documents", label: "Documents" },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-5">
            <Card>
              <CardHeader title="Project Description" />
              <p className="text-[13px] text-concrete-600 dark:text-blueprint-200 leading-relaxed">
                BuildForge project portfolio execution for {project.name}. Undertaken for {project.client}, this project is managed by {project.manager} with strict compliance to safety regulations, materials control, and site scheduling rules.
              </p>
            </Card>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Card>
                <CardHeader title="Dates & Progress" />
                <div className="space-y-4">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-concrete-300">Start Date</span>
                    <span className="font-medium text-concrete-900 dark:text-blueprint-100">{project.startDate}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-concrete-300">Estimated End</span>
                    <span className="font-medium text-concrete-900 dark:text-blueprint-100">{project.endDate}</span>
                  </div>
                  <div className="space-y-1 pt-2">
                    <div className="flex justify-between text-[11.5px]">
                      <span className="text-concrete-300">Progress</span>
                      <span className="font-semibold text-concrete-900 dark:text-blueprint-100">{project.progress}%</span>
                    </div>
                    <ProgressBar value={project.progress} />
                  </div>
                </div>
              </Card>

              <Card>
                <CardHeader title="Key Metrics" />
                <div className="space-y-4">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-concrete-300">Manager</span>
                    <span className="font-medium text-concrete-900 dark:text-blueprint-100">{project.manager}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-concrete-300">Risk Level</span>
                    <span className="font-medium text-concrete-900 dark:text-blueprint-100">{project.riskLevel}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-concrete-300">Client</span>
                    <span className="font-medium text-concrete-900 dark:text-blueprint-100">{project.client}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="space-y-5">
            <Card>
              <CardHeader title="Financial Summary" />
              <div className="space-y-4">
                <div>
                  <p className="text-[11.5px] text-concrete-300">Total Budget</p>
                  <p className="text-[18px] font-bold text-concrete-900 dark:text-blueprint-100">
                    ₹{project.budget.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[11.5px] text-concrete-300">Total Spent</p>
                  <p className="text-[18px] font-bold text-signal-orange">
                    ₹{project.spent.toLocaleString()}
                  </p>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between text-[11.5px] mb-1">
                    <span className="text-concrete-300">Budget Consumed</span>
                    <span className="font-semibold text-concrete-900 dark:text-blueprint-100">
                      {((project.spent / project.budget) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <ProgressBar value={Math.round((project.spent / project.budget) * 100)} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "tasks" && (
        <DataTable rows={projectTasks} columns={taskCols} searchPlaceholder="Search project tasks..." />
      )}

      {activeTab === "financials" && (
        <DataTable rows={projectInvoices} columns={invCols} searchPlaceholder="Search project invoices..." />
      )}

      {activeTab === "documents" && (
        <DataTable rows={projectDocs} columns={docCols} searchPlaceholder="Search project documents..." />
      )}
    </div>
  );
}
