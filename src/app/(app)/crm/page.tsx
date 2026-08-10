"use client";

import React, { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { leads as initialLeads } from "@/lib/mockData";
import { DollarSign, Target, Award, Plus } from "lucide-react";
import { Kanban } from "@/components/ui/Kanban";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Lead } from "@/types";

export default function CrmPage() {
  const { toast } = useToast();
  const [leadsList, setLeadsList] = useState<Lead[]>(initialLeads);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [value, setValue] = useState("");
  const [source, setSource] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState<"New" | "Contacted" | "Proposal" | "Negotiation" | "Won" | "Lost">("New");

  // Dynamic calculations
  const totalValue = leadsList.reduce((acc, lead) => acc + lead.value, 0);
  const wonLeads = leadsList.filter((l) => l.status === "Won").length;

  const handleAddClick = (defaultStatus: any = "New") => {
    setSelectedLead(null);
    setName("");
    setCompany("");
    setEmail("");
    setPhone("");
    setValue("");
    setSource("");
    setAssignedTo("");
    setStatus(defaultStatus);
    setModalOpen(true);
  };

  const handleEditClick = (taskId: string) => {
    const lead = leadsList.find((l) => l.id === taskId);
    if (!lead) return;
    setSelectedLead(lead);
    setName(lead.name);
    setCompany(lead.company);
    setEmail(lead.email);
    setPhone(lead.phone);
    setValue(String(lead.value));
    setSource(lead.source);
    setAssignedTo(lead.assignedTo);
    setStatus(lead.status);
    setModalOpen(true);
  };

  const handleDeleteLead = (taskId: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      setLeadsList((prev) => prev.filter((l) => l.id !== taskId));
      toast("Lead deleted successfully!");
    }
  };

  const handleSaveLead = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !company.trim() || !email.trim() || !phone.trim() || !value || !source.trim() || !assignedTo.trim()) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const leadValue = parseFloat(value);
    if (isNaN(leadValue) || leadValue < 0) {
      toast("Value must be a positive number.", "error");
      return;
    }

    const leadData = {
      name,
      company,
      email,
      phone,
      value: leadValue,
      source,
      assignedTo,
      status,
    };

    if (selectedLead) {
      setLeadsList((prev) =>
        prev.map((l) => (l.id === selectedLead.id ? { ...l, ...leadData } : l))
      );
      toast("Lead updated successfully!");
    } else {
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        ...leadData,
      };
      setLeadsList((prev) => [...prev, newLead]);
      toast("Lead added successfully!");
    }

    setModalOpen(false);
  };

  const handleTaskMove = (taskId: string, fromColId: string, toColId: string) => {
    setLeadsList((prev) =>
      prev.map((lead) => {
        if (lead.id === taskId) {
          return { ...lead, status: toColId as any };
        }
        return lead;
      })
    );
    toast(`Lead stage updated to ${toColId}`);
  };

  const stages: ("New" | "Contacted" | "Proposal" | "Negotiation" | "Won" | "Lost")[] = [
    "New",
    "Contacted",
    "Proposal",
    "Negotiation",
    "Won",
    "Lost",
  ];

  const kanbanColumns = stages.map((stage) => {
    return {
      id: stage,
      title: stage,
      tasks: leadsList
        .filter((lead) => lead.status === stage)
        .map((lead) => ({
          id: lead.id,
          title: lead.company,
          subtitle: `${lead.name} • ₹${lead.value.toLocaleString()} (${lead.source})`,
          dueDate: `Assignee: ${lead.assignedTo}`,
          priority: lead.value > 5000000 ? ("Urgent" as const) : lead.value > 2000000 ? ("High" as const) : ("Medium" as const),
        })),
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
            CRM Sales Dashboard
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Track customer pipelines, contract valuations, and prospective tenders.
          </p>
        </div>
        <button
          onClick={() => handleAddClick("New")}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card flex items-center gap-1.5"
        >
          <Plus className="h-4 w-4" />
          Add Lead
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-signal-orange/10 text-signal-orange">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11.5px] text-concrete-300">Pipeline Value</p>
            <p className="text-[18px] font-bold text-concrete-900 dark:text-blueprint-100">
              ₹{(totalValue / 10000000).toFixed(2)} Cr
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-signal-orange/10 text-signal-orange">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11.5px] text-concrete-300">Active Leads</p>
            <p className="text-[18px] font-bold text-concrete-900 dark:text-blueprint-100">
              {leadsList.length}
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-signal-orange/10 text-signal-orange">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11.5px] text-concrete-300">Won Leads</p>
            <p className="text-[18px] font-bold text-concrete-900 dark:text-blueprint-100">
              {wonLeads}
            </p>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Pipeline Stages Overview" subtitle="Drag and drop leads to advance stages" />
        <div className="p-4">
          <Kanban
            initialColumns={kanbanColumns}
            onTaskMove={handleTaskMove}
            onAddTask={(colId) => handleAddClick(colId)}
            onEditTask={(taskId) => handleEditClick(taskId)}
            onDeleteTask={(taskId) => handleDeleteLead(taskId)}
          />
        </div>
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedLead ? "Edit Lead Details" : "Add New Lead"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveLead} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Lead Contact Person *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Company *
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Skyline Builders"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. ramesh@skyline.com"
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
                placeholder="e.g. +91 94440 98765"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Estimate Value (₹) *
              </label>
              <input
                type="number"
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g. 5000000"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Acquisition Source *
              </label>
              <input
                type="text"
                required
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g. Referral, Website"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Assigned Executive *
              </label>
              <input
                type="text"
                required
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="e.g. Dinesh M"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
              Pipeline Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Proposal">Proposal</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
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
              Save Lead
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
