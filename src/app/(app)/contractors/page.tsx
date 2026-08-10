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

  const [activeTab, setActiveTab] = useState<"directory" | "bills" | "retention">("directory");
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
            Subcontractors & Billing
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Coordinate contracting firms, verify Running Account (RA) bills, track advances, and monitor retention deductions.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Contractor
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-concrete-100 dark:border-white/5">
        {[
          { id: "directory", label: "Contractor Directory" },
          { id: "bills", label: "RA Bills & Valuations" },
          { id: "retention", label: "Advances & Retention Ledger" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-3 text-[13px] font-medium border-b-2 -mb-[2px] transition-all ${
              activeTab === tab.id
                ? "border-signal-orange text-signal-orange font-semibold"
                : "border-transparent text-concrete-300 hover:text-concrete-900 dark:hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "directory" && (
        <DataTable rows={contractorsList} columns={columns} searchPlaceholder="Search contractors..." />
      )}

      {activeTab === "bills" && (
        <div className="overflow-x-auto text-[13px] bg-white dark:bg-blueprint-850 p-5 rounded-2xl border border-concrete-100 dark:border-white/5 shadow-card">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-concrete-950 dark:text-blueprint-100">Submitted Running Account (RA) Bills</h4>
            <button onClick={() => toast("Creating RA bill draft...")} className="px-3 py-1.5 bg-signal-orange text-[11px] font-bold text-white rounded-lg">New RA Bill</button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-concrete-100 dark:border-white/5 text-concrete-350 font-semibold">
                <th className="py-2.5">Bill No</th>
                <th className="py-2.5">Contractor</th>
                <th className="py-2.5">Scope of Work</th>
                <th className="py-2.5">Gross Certified (₹)</th>
                <th className="py-2.5">Deductions (₹)</th>
                <th className="py-2.5">Net Payable (₹)</th>
                <th className="py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-concrete-50 dark:divide-white/5">
              {[
                { no: "RA-NPS-04", name: "NPS Foundations", scope: "Excavation & Piling works", gross: "8,50,000", ded: "85,000 (10% Ret)", net: "7,65,000", status: "Approved" },
                { no: "RA-JAI-02", name: "Jai Steel Erectors", scope: "Slab structure steel layout", gross: "14,00,000", ded: "1,40,000 (10% Ret)", net: "12,60,000", status: "Under Audit" },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-concrete-50 dark:hover:bg-blueprint-900/50">
                  <td className="py-3 font-semibold">{item.no}</td>
                  <td className="py-3 font-bold">{item.name}</td>
                  <td className="py-3">{item.scope}</td>
                  <td className="py-3">₹{item.gross}</td>
                  <td className="py-3 text-red-500">₹{item.ded}</td>
                  <td className="py-3 font-bold text-green-600">₹{item.net}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      item.status === "Approved" ? "bg-green-100 text-green-700 dark:bg-green-950/30" : "bg-amber-100 text-amber-700 dark:bg-amber-950/30"
                    }`}>{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "retention" && (
        <div className="grid gap-6 md:grid-cols-2 text-[13px]">
          <div className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850 space-y-4">
            <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
              Contractor Advances Tracker
            </h3>
            {[
              { contractor: "NPS Foundations", advance: "₹2,50,000", recovered: "₹1,25,000", balance: "₹1,25,000" },
              { contractor: "Jai Steel Erectors", advance: "₹5,00,050", recovered: "₹1,50,000", balance: "₹3,50,000" },
            ].map((item, idx) => (
              <div key={idx} className="p-3 border border-concrete-100 dark:border-white/5 rounded-xl space-y-2">
                <span className="font-bold text-concrete-800 dark:text-blueprint-100 block">{item.contractor}</span>
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <div>
                    <span className="text-concrete-350 block">Initial Advance</span>
                    <span className="font-medium">{item.advance}</span>
                  </div>
                  <div>
                    <span className="text-concrete-350 block">Recovered (Deducted)</span>
                    <span className="font-medium text-green-600">{item.recovered}</span>
                  </div>
                  <div>
                    <span className="text-concrete-350 block">Outstanding Bal</span>
                    <span className="font-bold text-signal-orange">{item.balance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850 h-fit space-y-4">
            <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
              Retention Fund Ledger
            </h3>
            <p className="text-[12.5px] text-concrete-300">Total retention deductions held (to be released post defect liability period).</p>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>NPS Foundations (Piling stage)</span>
                <span className="font-bold">₹2,45,000 (Valid till Jan 2027)</span>
              </div>
              <div className="flex justify-between">
                <span>Jai Steel Erectors (Structures)</span>
                <span className="font-bold">₹1,40,000 (Valid till Mar 2027)</span>
              </div>
            </div>
          </div>
        </div>
      )}

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
