"use client";

import React, { useState } from "react";
import { UserCheck, Camera, HelpCircle, HardHat, FileText, Send } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function CustomerPortalPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"milestones" | "progress" | "support">("milestones");

  // Support / Service Request Form State
  const [requestSubject, setRequestSubject] = useState("");
  const [requestCategory, setRequestCategory] = useState("Electrical");
  const [requestDesc, setRequestDesc] = useState("");

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestSubject.trim() || !requestDesc.trim()) {
      toast("Please fill in subject and details.", "error");
      return;
    }
    toast("Service request lodged successfully! Tracking ID: SR-9943");
    setRequestSubject("");
    setRequestDesc("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-blueprint-900 text-white rounded-2xl p-6 relative overflow-hidden shadow-card border border-blueprint-700/50">
        <div className="absolute inset-0 bg-blueprint-grid bg-grid opacity-10" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <span className="text-[10px] text-blueprint-200 uppercase tracking-widest font-bold">CLIENT BUYER PORTAL</span>
            <h1 className="font-display text-[22px] font-bold mt-1">Welcome, Rajesh Kumar</h1>
            <p className="text-[13px] text-blueprint-200 mt-0.5">Unit Allocated: Flat 401, Skyline Business Tower (Block A)</p>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10 text-right shrink-0">
            <span className="text-[11px] text-blueprint-200 block">Total Paid to Date</span>
            <span className="text-[16px] font-bold text-signal-orange">₹35,50,000</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-concrete-100 dark:border-white/5">
        {[
          { id: "milestones", label: "My Payments & Milestones", icon: FileText },
          { id: "progress", label: "Construction Updates", icon: Camera },
          { id: "support", label: "Raise Service Request", icon: HelpCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 text-[13px] font-medium transition-all border-b-2 -mb-[2px] ${
                activeTab === tab.id
                  ? "border-signal-orange text-signal-orange font-semibold"
                  : "border-transparent text-concrete-300 hover:text-concrete-900 dark:hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Payments & Milestones */}
      {activeTab === "milestones" && (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850 space-y-4">
            <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
              Payment Schedule & Milestone Status
            </h3>

            {[
              { title: "Token Advance (Booking)", status: "Paid", amount: "₹5,00,000", date: "Jan 10, 2026" },
              { title: "Foundation Slab Casting completed", status: "Paid", amount: "₹15,25,000", date: "Mar 22, 2026" },
              { title: "First Floor Roof casted", status: "Overdue", amount: "₹15,25,000", date: "Jul 15, 2026" },
              { title: "Brickwork & Partition finishing", status: "Pending", amount: "₹10,50,000", date: "Upcoming" },
            ].map((milestone, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 border-b border-concrete-50 dark:border-white/5 text-[12.5px]">
                <div>
                  <h4 className="font-bold text-concrete-800 dark:text-blueprint-100">{milestone.title}</h4>
                  <p className="text-[11px] text-concrete-300 mt-0.5">Target: {milestone.date}</p>
                </div>
                <div className="text-right">
                  <span className="font-semibold block">{milestone.amount}</span>
                  <span className={`text-[10px] font-bold ${
                    milestone.status === "Paid" ? "text-green-600" : milestone.status === "Overdue" ? "text-red-500" : "text-concrete-350"
                  }`}>{milestone.status.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850 h-fit space-y-3">
            <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
              Booking Documents
            </h3>
            <p className="text-[12.5px] text-concrete-300">Download registration files and allotment letters.</p>
            <div className="space-y-2 text-[12px]">
              {["Allotment_Letter_401.pdf", "Receipt_Token_5L.pdf", "Agreement_of_Sale.pdf"].map((file, idx) => (
                <div key={idx} className="p-2.5 border border-concrete-100 dark:border-white/5 rounded-xl flex justify-between items-center cursor-pointer hover:bg-concrete-50 dark:hover:bg-blueprint-900">
                  <span className="font-medium text-concrete-800 dark:text-blueprint-200">{file}</span>
                  <span className="text-[10px] text-signal-orange font-bold">DOWNLOAD</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Construction Updates */}
      {activeTab === "progress" && (
        <div className="space-y-6">
          <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
            Latest Construction Milestone Photos (July 2026)
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              { title: "Floor Slab Casted (B-Block)", date: "July 24, 2026", desc: "Tower-level scaffolding and concrete pour complete." },
              { title: "Interior Brick Wall Partition", date: "July 15, 2026", desc: "First floor partition layout finalized as scheduled." },
              { title: "MEP Conduit Laying", date: "June 29, 2026", desc: "Conduit layouts verified for smart grid integration." },
            ].map((p, idx) => (
              <div key={idx} className="rounded-2xl border border-concrete-100 bg-white overflow-hidden shadow-card dark:border-white/5 dark:bg-blueprint-850">
                <div className="h-40 bg-concrete-100 dark:bg-blueprint-900 flex items-center justify-center relative border-b border-concrete-100 dark:border-white/5">
                  <Camera className="h-10 w-10 text-concrete-300" />
                  <span className="absolute bottom-2 left-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded">SIMULATED PHOTO</span>
                </div>
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] text-concrete-350">{p.date}</span>
                  <h4 className="font-bold text-[13.5px] text-concrete-950 dark:text-blueprint-100">{p.title}</h4>
                  <p className="text-[12px] text-concrete-300 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Support / Service Request */}
      {activeTab === "support" && (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850">
            <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100 mb-4">
              Lodge a Post-Handover / Maintenance Complaint
            </h3>
            <form onSubmit={handleSendRequest} className="space-y-4">
              <div>
                <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                  Subject / Concern *
                </label>
                <input
                  type="text"
                  required
                  value={requestSubject}
                  onChange={(e) => setRequestSubject(e.target.value)}
                  placeholder="e.g. Minor wall crack in bedroom partition"
                  className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 focus:border-signal-orange outline-none"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                  Issue Category
                </label>
                <select
                  value={requestCategory}
                  onChange={(e) => setRequestCategory(e.target.value)}
                  className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 focus:border-signal-orange outline-none"
                >
                  <option value="Electrical">Electrical / Wiring</option>
                  <option value="Plumbing">Plumbing & Drainage</option>
                  <option value="Civil">Civil / Crack Correction</option>
                  <option value="Finishing">Carpentry & Paint Finishing</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                  Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={requestDesc}
                  onChange={(e) => setRequestDesc(e.target.value)}
                  placeholder="Describe the complaint in detail for our engineering audit desk."
                  className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 focus:border-signal-orange outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white hover:bg-signal-orange/90 shadow-card"
              >
                <Send className="h-3.5 w-3.5" />
                Submit Request
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850 h-fit space-y-4">
            <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
              Active Service Tickets
            </h3>
            <div className="space-y-3 text-[12px]">
              {[
                { ticket: "SR-9831", cat: "Plumbing", status: "Resolved", title: "Faucet pressure calibration" },
                { ticket: "SR-9902", cat: "Civil", status: "Investigating", title: "Wall trim alignment" },
              ].map((t, idx) => (
                <div key={idx} className="p-3 border border-concrete-100 dark:border-white/5 rounded-xl flex justify-between items-start">
                  <div>
                    <span className="font-bold block text-concrete-800 dark:text-blueprint-100">{t.ticket} - {t.title}</span>
                    <span className="text-[10px] text-concrete-350 block mt-0.5">Category: {t.cat}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                    t.status === "Resolved" ? "bg-green-100 text-green-700 dark:bg-green-950/30" : "bg-amber-100 text-amber-700 dark:bg-amber-950/30"
                  }`}>{t.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
