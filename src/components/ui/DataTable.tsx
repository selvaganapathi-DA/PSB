"use client";

import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
} from "@mui/x-data-grid";
import { Search, Download, Printer } from "lucide-react";

interface DataTableProps {
  rows: any[];
  columns: GridColDef[];
  loading?: boolean;
  searchPlaceholder?: string;
  bulkActions?: (selectedIds: string[]) => React.ReactNode;
}

export function DataTable({
  rows,
  columns,
  loading = false,
  searchPlaceholder = "Search...",
  bulkActions,
}: DataTableProps) {
  const [searchText, setSearchText] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filter rows based on search text
  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (val) =>
        val !== null &&
        val !== undefined &&
        val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handlePrint = () => {
    const targetRows = filteredRows.filter((row) => selectedIds.includes(String(row.id)));
    if (targetRows.length === 0) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const headers = columns.filter((col) => col.field !== "actions").map((col) => col.headerName || col.field);
    const rowsHtml = targetRows
      .map(
        (row) =>
          `<tr>${columns
            .filter((col) => col.field !== "actions")
            .map((col) => `<td>${row[col.field] ?? ""}</td>`)
            .join("")}</tr>`
      )
      .join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>Printed Report</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2>Report</h2>
          <table>
            <thead>
              <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
          <script>
            window.onload = function() {
              window.print();
              window.close();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleExportCSV = () => {
    const targetRows = filteredRows.filter((row) => selectedIds.includes(String(row.id)));
    if (targetRows.length === 0) return;

    const exportCols = columns.filter((col) => col.field !== "actions");
    const headers = exportCols.map((col) => col.headerName || col.field);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        headers.join(","),
        ...targetRows.map((row) =>
          exportCols
            .map((col) => {
              const val = row[col.field];
              return typeof val === "string" ? `"${val.replace(/"/g, '""')}"` : val;
            })
            .join(",")
        ),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Table Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-concrete-300 dark:text-blueprint-400" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-xl border border-concrete-100 bg-white py-2 pl-10 pr-4 text-[13px] text-concrete-900 outline-none transition-all placeholder:text-concrete-300 focus:border-signal-orange focus:ring-1 focus:ring-signal-orange dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 dark:placeholder:text-blueprint-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {selectedIds.length > 0 && bulkActions && (
            <div className="mr-2 flex items-center gap-2 rounded-xl bg-signal-orange/10 px-3 py-1.5 text-[12.5px] font-semibold text-signal-orange">
              <span>{selectedIds.length} selected</span>
              {bulkActions(selectedIds)}
            </div>
          )}

          {selectedIds.length > 0 && (
            <>
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 rounded-xl border border-concrete-100 bg-white px-3 py-2 text-[12.5px] font-medium text-concrete-600 shadow-card transition-all hover:bg-concrete-50 dark:border-white/5 dark:bg-blueprint-850 dark:text-blueprint-200 dark:hover:bg-blueprint-800"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Excel/CSV</span>
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-xl border border-concrete-100 bg-white px-3 py-2 text-[12.5px] font-medium text-concrete-600 shadow-card transition-all hover:bg-concrete-50 dark:border-white/5 dark:bg-blueprint-850 dark:text-blueprint-200 dark:hover:bg-blueprint-800"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Table grid wrapper */}
      <div className="w-full overflow-hidden rounded-2xl border border-concrete-100 bg-white dark:border-white/5 dark:bg-blueprint-850">
        <DataGrid
          rows={filteredRows}
          columns={columns}
          loading={loading}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => {
            setSelectedIds(newSelection.map(String));
          }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50]}
          sx={{
            border: 0,
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            color: "inherit",
            backgroundColor: "transparent",
            "& .MuiDataGrid-main": {
              borderColor: "transparent",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "rgba(0, 0, 0, 0.02)",
              borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
              color: "var(--concrete-900)",
              fontWeight: 600,
              ".dark &": {
                backgroundColor: "rgba(255, 255, 255, 0.02)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                color: "var(--blueprint-100)",
              },
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid rgba(0, 0, 0, 0.04)",
              alignContent: "center",
              ".dark &": {
                borderBottom: "1px solid rgba(255, 255, 255, 0.03)",
              },
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.01)",
              ".dark &": {
                backgroundColor: "rgba(255, 255, 255, 0.01)",
              },
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid rgba(0, 0, 0, 0.06)",
              ".dark &": {
                borderTop: "1px solid rgba(255, 255, 255, 0.05)",
              },
            },
            "& .MuiTablePagination-root": {
              color: "inherit",
            },
            "& .MuiCheckbox-root": {
              color: "rgba(0,0,0,0.2)",
              "&.Mui-checked": {
                color: "var(--signal-orange, #ff6b00)",
              },
              ".dark &": {
                color: "rgba(255,255,255,0.2)",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
