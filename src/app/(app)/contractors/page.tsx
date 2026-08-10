"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { contractors as initialContractors } from "@/lib/mockData";
import { GridColDef } from "@mui/x-data-grid";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Edit2, Trash2 } from "lucide-react";
import { Contractor } from "@/types";

export default function ContractorsPage() {
  const { toast } = useToast();
  const [contractorsList, setContractorsList] = useState<Contractor[]>(initialContractors);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [activeWorkers, setActiveWorkers] = useState("");
  const [rating, setRating] = useState("");

  const handleAddClick = () => {
    setSelectedContractor(null);
    setName("");
    setSpecialty("");
    setContactPerson("");
    setPhone("");
    setEmail("");
    setActiveWorkers("");
    setRating("");
    setModalOpen(true);
  };

  const handleEditClick = (c: Contractor) => {
    setSelectedContractor(c);
    setName(c.name);
    setSpecialty(c.specialty);
    setContactPerson(c.contactPerson);
    setPhone(c.phone);
    setEmail(c.email);
    setActiveWorkers(String(c.activeWorkers));
    setRating(String(c.rating));
    setModalOpen(true);
  };

  const handleDeleteContractor = (id: string) => {
    if (confirm("Are you sure you want to delete this contractor?")) {
      setContractorsList((prev) => prev.filter((c) => c.id !== id));
      toast("Contractor deleted successfully!");
    }
  };

  const handleSaveContractor = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !specialty.trim() || !contactPerson.trim() || !phone.trim() || !email.trim() || !activeWorkers || !rating) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const cData = {
      name,
      specialty,
      contactPerson,
      phone,
      email,
      activeWorkers: parseInt(activeWorkers, 10),
      rating: parseFloat(rating),
    };

    if (selectedContractor) {
      setContractorsList((prev) =>
        prev.map((c) => (c.id === selectedContractor.id ? { ...c, ...cData } : c))
      );
      toast("Contractor updated successfully!");
    } else {
      const newContractor: Contractor = {
        id: `c-${Date.now()}`,
        ...cData,
      };
      setContractorsList((prev) => [...prev, newContractor]);
      toast("Contractor added successfully!");
    }

    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Contractor Company", flex: 2 },
    { field: "specialty", headerName: "Specialty", flex: 1.5 },
    { field: "contactPerson", headerName: "Contact Person", flex: 1.5 },
    { field: "phone", headerName: "Phone Number", flex: 1.2 },
    { field: "email", headerName: "Email Address", flex: 1.8 },
    { field: "activeWorkers", headerName: "Active Workers Deployed", flex: 1.5 },
    { field: "rating", headerName: "Evaluation Rating", flex: 1, valueFormatter: (v: any) => `${v} ⭐` },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (p) => (
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => handleEditClick(p.row as Contractor)}
            className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
            title="Edit Contractor"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteContractor(p.row.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            title="Delete Contractor"
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
            Subcontractors Directory
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Coordinate specialized piling, masonry, finishing, and MEP third-party contracting firms.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Contractor
        </button>
      </div>

      <DataTable rows={contractorsList} columns={columns} searchPlaceholder="Search contractors..." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedContractor ? "Edit Contractor details" : "Add New Contractor"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveContractor} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Contractor Company Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vanguard Foundations Ltd"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Specialty *
              </label>
              <input
                type="text"
                required
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                placeholder="e.g. Piling & Earthworks"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Contact Person *
              </label>
              <input
                type="text"
                required
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="e.g. Magesh Varadhan"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Phone Number *
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 98410 77651"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. magesh@vanguard.in"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Active Workers Deployed *
              </label>
              <input
                type="number"
                required
                value={activeWorkers}
                onChange={(e) => setActiveWorkers(e.target.value)}
                placeholder="e.g. 18"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Evaluation Rating (1-5) *
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                required
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="e.g. 4.5"
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
              Save Contractor
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
