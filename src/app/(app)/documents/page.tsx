"use client";

import React, { useState, useRef } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { documents as initialDocuments } from "@/lib/mockData";
import { GridColDef } from "@mui/x-data-grid";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2, Eye } from "lucide-react";
import { DocumentFile } from "@/types";

export default function DocumentsPage() {
  const { toast } = useToast();
  const [documentsList, setDocumentsList] = useState<DocumentFile[]>(initialDocuments as any);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentFile | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Other");
  const [size, setSize] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");
  const [fileUrl, setFileUrl] = useState("#");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddClick = () => {
    setSelectedDocument(null);
    setName("");
    setCategory("Other");
    setSize("");
    setUploadedBy("");
    setFileUrl("#");
    setModalOpen(true);
    // Reset file input element if it exists
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEditClick = (doc: DocumentFile) => {
    setSelectedDocument(doc);
    setName(doc.name);
    setCategory(doc.category);
    setSize(doc.size);
    setUploadedBy(doc.uploadedBy);
    setFileUrl(doc.url);
    setModalOpen(true);
  };

  const handleDeleteDocument = (id: string) => {
    if (confirm("Are you sure you want to delete this document?")) {
      setDocumentsList((prev) => prev.filter((d) => d.id !== id));
      toast("Document deleted successfully!");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if it's a PDF
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      toast("Please select a valid PDF file", "error");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Auto-populate document name
    setName(file.name);

    // Calculate file size
    const sizeInBytes = file.size;
    let formattedSize = "";
    if (sizeInBytes >= 1024 * 1024) {
      formattedSize = `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
    } else {
      formattedSize = `${Math.round(sizeInBytes / 1024)} KB`;
    }
    setSize(formattedSize);

    // Create Object URL
    const objectUrl = URL.createObjectURL(file);
    setFileUrl(objectUrl);
  };

  const handleSaveDocument = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !category.trim() || !size.trim() || !uploadedBy.trim()) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const now = new Date();
    const uploadedAtStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours() % 12 || 12).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;

    const docData = {
      name,
      category: category as any,
      size,
      uploadedBy,
      uploadedAt: uploadedAtStr,
      url: fileUrl,
    };

    if (selectedDocument) {
      setDocumentsList((prev) =>
        prev.map((d) => (d.id === selectedDocument.id ? { ...d, ...docData } : d))
      );
      toast("Document updated successfully!");
    } else {
      const newDoc: DocumentFile = {
        id: `doc-${Date.now()}`,
        ...docData,
      };
      setDocumentsList((prev) => [newDoc, ...prev]);
      toast("Document uploaded successfully!");
    }

    setModalOpen(false);
  };

  const handleOpenPdf = (doc: DocumentFile) => {
    const url = doc.url === "#" ? "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" : doc.url;
    window.open(url, "_blank");
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Document Name", flex: 2 },
    { field: "category", headerName: "Category", flex: 1.2 },
    { field: "size", headerName: "File Size", flex: 0.8 },
    { field: "uploadedBy", headerName: "Uploaded By", flex: 1.2 },
    { field: "uploadedAt", headerName: "Uploaded At", flex: 1.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.2,
      sortable: false,
      renderCell: (p) => (
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => handleOpenPdf(p.row as DocumentFile)}
            className="rounded p-1 text-signal-orange hover:bg-signal-orange/10 dark:hover:bg-signal-orange/20"
            title="Open Document PDF"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleEditClick(p.row as DocumentFile)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Document"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteDocument(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Document"
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
            Document Management
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Store, categorize, and archive project contracts, safety protocols, and quality certificates.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Upload Document
        </button>
      </div>

      <DataTable rows={documentsList} columns={columns} searchPlaceholder="Search documents..." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedDocument ? "Edit Document Details" : "Upload Document"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveDocument} className="space-y-4">
          
          {!selectedDocument && (
            <div className="border border-dashed border-concrete-100 dark:border-white/5 rounded-xl p-4 bg-concrete-50/50 dark:bg-blueprint-900/30">
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Select PDF File
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full text-[13px] text-concrete-600 dark:text-blueprint-200 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[12.5px] file:font-semibold file:bg-signal-orange/10 file:text-signal-orange hover:file:bg-signal-orange/20 cursor-pointer"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Document Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Structure Design Blueprints"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              >
                <option value="Contract">Contract</option>
                <option value="Drawing">Drawing</option>
                <option value="Safety">Safety</option>
                <option value="Quality">Quality</option>
                <option value="Invoice">Invoice</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                File Size *
              </label>
              <input
                type="text"
                required
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="e.g. 14.2 MB"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Uploaded By *
              </label>
              <input
                type="text"
                required
                value={uploadedBy}
                onChange={(e) => setUploadedBy(e.target.value)}
                placeholder="e.g. Selvam V"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
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
              Save Document
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
