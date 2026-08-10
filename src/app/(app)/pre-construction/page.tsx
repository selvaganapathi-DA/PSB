"use client";

import React, { useState } from "react";
import { Compass, Landmark, LineChart, Plus, Calculator, FileText, Edit2, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { Modal } from "@/components/ui/Modal";
import { FileUpload } from "@/components/ui/FileUpload";

interface LandParcel {
  id: string;
  title: string;
  survey: string;
  owner: string;
  area: string;
  cost: string;
  status: string;
  docs: string[];
}

interface FeasibilityModel {
  id: string;
  name: string;
  cost: number;
  revenue: number;
  roi: number;
}

export default function PreConstructionPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"land" | "feasibility" | "rates" >("land");

  // Land Parcels CRUD State
  const [parcels, setParcels] = useState<LandParcel[]>([
    {
      id: "lp1",
      title: "Skyline Phase 3 Extension",
      survey: "SF No. 142/2A, 142/2B",
      owner: "K. R. Ramasamy & Partners",
      area: "4.8 Acres",
      cost: "184500000",
      status: "Approved",
      docs: ["Land Deed.pdf", "Survey Map.dwg"],
    },
    {
      id: "lp2",
      title: "Riverside North Block",
      survey: "SF No. 89/1, 90/3",
      owner: "Anjali Devi Holdings",
      area: "2.1 Acres",
      cost: "92000000",
      status: "Pending Approval",
      docs: ["Draft Agreement.pdf"],
    },
  ]);
  const [landModalOpen, setLandModalOpen] = useState(false);
  const [selectedLand, setSelectedLand] = useState<LandParcel | null>(null);
  
  // Land Form Fields
  const [landTitle, setLandTitle] = useState("");
  const [landSurvey, setLandSurvey] = useState("");
  const [landOwner, setLandOwner] = useState("");
  const [landArea, setLandArea] = useState("");
  const [landCost, setLandCost] = useState("");
  const [landStatus, setLandStatus] = useState("Approved");
  const [landDocs, setLandDocs] = useState<string[]>([]);

  // Feasibility CRUD State
  const [feasibilityModels, setFeasibilityModels] = useState<FeasibilityModel[]>([
    { id: "fm1", name: "Project Skyline Commercial Tower", cost: 350000000, revenue: 520000000, roi: 48 },
    { id: "fm2", name: "Riverside Premium Residential Complex", cost: 180000000, revenue: 260000000, roi: 44 },
  ]);
  const [feasibilityModalOpen, setFeasibilityModalOpen] = useState(false);
  const [selectedFeasibility, setSelectedFeasibility] = useState<FeasibilityModel | null>(null);

  // Feasibility Form Fields
  const [feasName, setFeasName] = useState("");
  const [feasCost, setFeasCost] = useState("");
  const [feasRevenue, setFeasRevenue] = useState("");
  const [feasRoi, setFeasRoi] = useState("");

  // Rate Analysis Calculator State
  const [rateMaterial, setRateMaterial] = useState("1200");
  const [rateLabour, setRateLabour] = useState("450");
  const [rateMachinery, setRateMachinery] = useState("300");
  const [overheadPercent, setOverheadPercent] = useState("15");

  const materialCost = parseFloat(rateMaterial) || 0;
  const labourCost = parseFloat(rateLabour) || 0;
  const machineryCost = parseFloat(rateMachinery) || 0;
  const overhead = parseFloat(overheadPercent) || 0;

  const baseCost = materialCost + labourCost + machineryCost;
  const totalCost = baseCost + (baseCost * overhead) / 100;

  // Land Actions
  const handleAddLandClick = () => {
    setSelectedLand(null);
    setLandTitle("");
    setLandSurvey("");
    setLandOwner("");
    setLandArea("");
    setLandCost("");
    setLandStatus("Approved");
    setLandDocs([]);
    setLandModalOpen(true);
  };

  const handleEditLandClick = (lp: LandParcel) => {
    setSelectedLand(lp);
    setLandTitle(lp.title);
    setLandSurvey(lp.survey);
    setLandOwner(lp.owner);
    setLandArea(lp.area);
    setLandCost(lp.cost);
    setLandStatus(lp.status);
    setLandDocs(lp.docs || []);
    setLandModalOpen(true);
  };

  const handleDeleteLand = (id: string) => {
    if (confirm("Are you sure you want to delete this land parcel?")) {
      setParcels((prev) => prev.filter((p) => p.id !== id));
      toast("Land parcel deleted successfully!");
    }
  };

  const handleSaveLand = (e: React.FormEvent) => {
    e.preventDefault();
    const data: LandParcel = {
      id: selectedLand ? selectedLand.id : `lp-${Date.now()}`,
      title: landTitle,
      survey: landSurvey,
      owner: landOwner,
      area: landArea,
      cost: landCost,
      status: landStatus,
      docs: landDocs,
    };

    if (selectedLand) {
      setParcels((prev) => prev.map((p) => (p.id === selectedLand.id ? data : p)));
      toast("Land parcel updated successfully!");
    } else {
      setParcels((prev) => [...prev, data]);
      toast("Land parcel added successfully!");
    }
    setLandModalOpen(false);
  };

  // Feasibility Actions
  const handleAddFeasClick = () => {
    setSelectedFeasibility(null);
    setFeasName("");
    setFeasCost("");
    setFeasRevenue("");
    setFeasRoi("");
    setFeasibilityModalOpen(true);
  };

  const handleEditFeasClick = (fm: FeasibilityModel) => {
    setSelectedFeasibility(fm);
    setFeasName(fm.name);
    setFeasCost(String(fm.cost));
    setFeasRevenue(String(fm.revenue));
    setFeasRoi(String(fm.roi));
    setFeasibilityModalOpen(true);
  };

  const handleDeleteFeas = (id: string) => {
    if (confirm("Are you sure you want to delete this feasibility model?")) {
      setFeasibilityModels((prev) => prev.filter((f) => f.id !== id));
      toast("Feasibility model deleted successfully!");
    }
  };

  const handleSaveFeas = (e: React.FormEvent) => {
    e.preventDefault();
    const costVal = parseFloat(feasCost) || 0;
    const revVal = parseFloat(feasRevenue) || 0;
    const roiVal = parseFloat(feasRoi) || Math.round(((revVal - costVal) / costVal) * 100) || 0;

    const data: FeasibilityModel = {
      id: selectedFeasibility ? selectedFeasibility.id : `fm-${Date.now()}`,
      name: feasName,
      cost: costVal,
      revenue: revVal,
      roi: roiVal,
    };

    if (selectedFeasibility) {
      setFeasibilityModels((prev) => prev.map((f) => (f.id === selectedFeasibility.id ? data : f)));
      toast("Feasibility study updated!");
    } else {
      setFeasibilityModels((prev) => [...prev, data]);
      toast("Feasibility study added!");
    }
    setFeasibilityModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100 flex items-center gap-2">
          <Compass className="h-6 w-6 text-signal-orange" />
          Pre-Construction Planning
        </h1>
        <p className="mt-1 text-[13px] text-concrete-300">
          Manage land parcels, conduct feasibility studies, and perform cost rate analysis.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-concrete-100 dark:border-white/5">
        {[
          { id: "land", label: "Land & Property", icon: Landmark },
          { id: "feasibility", label: "Feasibility Study", icon: LineChart },
          { id: "rates", label: "Rate Analysis", icon: Calculator },
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

      {/* Land & Property Management */}
      {activeTab === "land" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
              Land Parcels & Property Acquisition
            </h3>
            <button
              onClick={handleAddLandClick}
              className="flex items-center gap-1.5 rounded-xl bg-signal-orange px-3.5 py-2 text-[12px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Land Parcel
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {parcels.map((parcel) => (
              <div
                key={parcel.id}
                className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850 hover:border-signal-orange/20 transition-all relative group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-concrete-900 dark:text-blueprint-100 text-[14px]">
                      {parcel.title}
                    </h4>
                    <p className="text-[12px] text-concrete-300 mt-0.5">{parcel.survey}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        parcel.status === "Approved"
                          ? "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                      }`}
                    >
                      {parcel.status}
                    </span>
                    <button
                      onClick={() => handleEditLandClick(parcel)}
                      className="text-concrete-400 hover:text-concrete-600 dark:hover:text-white p-1"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteLand(parcel.id)}
                      className="text-red-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-concrete-100 dark:border-white/5 text-[12px] my-3">
                  <div>
                    <span className="text-concrete-350 block">Area</span>
                    <span className="font-medium text-concrete-800 dark:text-blueprint-200">{parcel.area}</span>
                  </div>
                  <div>
                    <span className="text-concrete-350 block">Cost</span>
                    <span className="font-medium text-concrete-800 dark:text-blueprint-200">
                      ₹{parseFloat(parcel.cost || "0").toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-concrete-350 block">Seller</span>
                    <span className="font-medium text-concrete-800 dark:text-blueprint-200 truncate block">{parcel.owner}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-concrete-300 block mb-1.5">ATTACHED DOCUMENTS</span>
                  <div className="flex flex-wrap gap-2">
                    {parcel.docs.map((doc, dIdx) => (
                      <span
                        key={dIdx}
                        className="flex items-center gap-1 text-[11px] bg-concrete-50 dark:bg-blueprint-900 border border-concrete-100 dark:border-white/5 px-2 py-1 rounded-lg text-concrete-600 dark:text-blueprint-300 cursor-pointer hover:bg-concrete-100"
                        onClick={() => toast(`Opening ${doc}`)}
                      >
                        <FileText className="h-3 w-3 text-signal-orange" />
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feasibility Study */}
      {activeTab === "feasibility" && (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
                  Active Feasibility Modeling
                </h3>
                <button
                  onClick={handleAddFeasClick}
                  className="flex items-center gap-1 bg-signal-orange text-[11px] font-semibold text-white px-2.5 py-1.5 rounded-lg"
                >
                  <Plus className="h-3 w-3" /> Add Model
                </button>
              </div>
              <div className="space-y-4">
                {feasibilityModels.map((item) => (
                  <div key={item.id} className="p-4 border border-concrete-100 dark:border-white/5 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-concrete-900 dark:text-blueprint-100 text-[13.5px]">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[12.5px] font-bold text-signal-orange">ROI: {item.roi}%</span>
                        <button
                          onClick={() => handleEditFeasClick(item)}
                          className="text-concrete-400 hover:text-concrete-600 dark:hover:text-white p-0.5"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteFeas(item.id)}
                          className="text-red-400 hover:text-red-600 p-0.5"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-[12px] my-3">
                      <div>
                        <span className="text-concrete-350">Estimated Cost</span>
                        <p className="font-medium text-concrete-800 dark:text-blueprint-200">₹{item.cost.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-concrete-350">Projected Revenue</span>
                        <p className="font-medium text-concrete-800 dark:text-blueprint-200">₹{item.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="w-full bg-concrete-100 dark:bg-blueprint-900 rounded-full h-1.5 mt-2">
                      <div className="bg-signal-orange h-1.5 rounded-full" style={{ width: `${Math.min(100, item.roi)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850 h-fit">
            <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100 mb-3">
              Feasibility Parameters
            </h3>
            <p className="text-[12.5px] text-concrete-300 mb-4">
              Enter target parameters to run instant cash-flow projections and feasibility models.
            </p>
            <div className="space-y-3 text-[12px]">
              <div>
                <label className="block text-concrete-350 mb-1">Land Acquisition Cost (₹)</label>
                <input type="text" defaultValue="12,00,00,000" className="w-full rounded-xl border border-concrete-100 bg-concrete-50 p-2 dark:border-white/5 dark:bg-blueprint-900" />
              </div>
              <div>
                <label className="block text-concrete-350 mb-1">Target Saleable Area (SFT)</label>
                <input type="text" defaultValue="85,000" className="w-full rounded-xl border border-concrete-100 bg-concrete-50 p-2 dark:border-white/5 dark:bg-blueprint-900" />
              </div>
              <button
                onClick={() => toast("Running Monte Carlo simulation...")}
                className="w-full rounded-xl bg-blueprint-950 py-2.5 text-[12px] font-semibold text-white hover:bg-blueprint-900 transition-all mt-2"
              >
                Run Forecast Simulation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rate Analysis */}
      {activeTab === "rates" && (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850">
            <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100 mb-4">
              Rate Calculator (Per Unit SFT/CFT)
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                  Material Component (₹)
                </label>
                <input
                  type="number"
                  value={rateMaterial}
                  onChange={(e) => setRateMaterial(e.target.value)}
                  className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 focus:border-signal-orange outline-none"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                  Labour Component (₹)
                </label>
                <input
                  type="number"
                  value={rateLabour}
                  onChange={(e) => setRateLabour(e.target.value)}
                  className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 focus:border-signal-orange outline-none"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                  Machinery & Equipment (₹)
                </label>
                <input
                  type="number"
                  value={rateMachinery}
                  onChange={(e) => setRateMachinery(e.target.value)}
                  className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 focus:border-signal-orange outline-none"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                  Overheads & Profit (%)
                </label>
                <input
                  type="number"
                  value={overheadPercent}
                  onChange={(e) => setOverheadPercent(e.target.value)}
                  className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 focus:border-signal-orange outline-none"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100 mb-4">
                Analysis Results & Breakdown
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-concrete-100 dark:border-white/5">
                <div>
                  <span className="text-[11px] text-concrete-350 block">Materials</span>
                  <span className="font-bold text-[16px] text-concrete-800 dark:text-blueprint-100">₹{materialCost}</span>
                </div>
                <div>
                  <span className="text-[11px] text-concrete-350 block">Labour</span>
                  <span className="font-bold text-[16px] text-concrete-800 dark:text-blueprint-100">₹{labourCost}</span>
                </div>
                <div>
                  <span className="text-[11px] text-concrete-350 block">Machinery</span>
                  <span className="font-bold text-[16px] text-concrete-800 dark:text-blueprint-100">₹{machineryCost}</span>
                </div>
                <div>
                  <span className="text-[11px] text-concrete-350 block">Overhead Cost</span>
                  <span className="font-bold text-[16px] text-concrete-800 dark:text-blueprint-100">₹{((baseCost * overhead) / 100).toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-signal-orange/10 border border-signal-orange/20 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-[14px] text-concrete-950 dark:text-blueprint-100">Analyzed Rate / SFT</h4>
                  <p className="text-[11px] text-concrete-300">Composite rate calculated automatically</p>
                </div>
                <span className="text-[22px] font-extrabold text-signal-orange">₹{totalCost.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => toast("Exporting Analysis PDF...")}
                className="rounded-xl border border-concrete-100 px-4 py-2.5 text-[12.5px] font-semibold text-concrete-600 hover:bg-concrete-50 dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-200"
              >
                Export PDF
              </button>
              <button
                onClick={() => toast("Composite rate saved to cost sheets!")}
                className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white hover:bg-signal-orange/90"
              >
                Apply to Master Estimate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Land Acquisition Modal */}
      <Modal
        open={landModalOpen}
        onClose={() => setLandModalOpen(false)}
        title={selectedLand ? "Edit Land Parcel Details" : "Add New Land Parcel"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveLand} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Land Parcel Name *
              </label>
              <input
                type="text"
                required
                value={landTitle}
                onChange={(e) => setLandTitle(e.target.value)}
                placeholder="e.g. Skyline Phase 3 Extension"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Survey Number *
              </label>
              <input
                type="text"
                required
                value={landSurvey}
                onChange={(e) => setLandSurvey(e.target.value)}
                placeholder="e.g. SF No. 142/2A"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Owner Name *
              </label>
              <input
                type="text"
                required
                value={landOwner}
                onChange={(e) => setLandOwner(e.target.value)}
                placeholder="e.g. K. R. Ramasamy"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Land Area *
              </label>
              <input
                type="text"
                required
                value={landArea}
                onChange={(e) => setLandArea(e.target.value)}
                placeholder="e.g. 4.8 Acres"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Acquisition Cost (₹) *
              </label>
              <input
                type="number"
                required
                value={landCost}
                onChange={(e) => setLandCost(e.target.value)}
                placeholder="e.g. 184500000"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
              Acquisition Status
            </label>
            <select
              value={landStatus}
              onChange={(e) => setLandStatus(e.target.value)}
              className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100"
            >
              <option value="Approved">Approved</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1.5">
              Attach Documents (PDF, DWG, images, etc.)
            </label>
            <FileUpload
              accept=".pdf,.dwg,.jpg,.jpeg,.png,.gif"
              onFileSelect={(file) => {
                setLandDocs((prev) => [...prev, file.name]);
                toast(`Attached ${file.name} successfully!`, "success");
              }}
            />
            {landDocs.length > 0 && (
              <div className="mt-3 space-y-1">
                <span className="text-[11px] font-bold text-concrete-350 block">PENDING ATTACHED LIST:</span>
                <div className="flex flex-wrap gap-2">
                  {landDocs.map((doc, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1 text-[11px] bg-concrete-50 dark:bg-blueprint-900 border border-concrete-100 dark:border-white/5 px-2.5 py-1 rounded-lg"
                    >
                      {doc}
                      <button
                        type="button"
                        onClick={() => setLandDocs((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-red-500 font-bold ml-1.5 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2.5 pt-4">
            <button
              type="button"
              onClick={() => setLandModalOpen(false)}
              className="rounded-xl border border-concrete-100 bg-white px-4 py-2.5 text-[12.5px] font-semibold text-concrete-600 hover:bg-concrete-50 dark:border-white/5 dark:bg-blueprint-850 dark:text-blueprint-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white hover:bg-signal-orange/90"
            >
              Save Details
            </button>
          </div>
        </form>
      </Modal>

      {/* Feasibility Study Modal */}
      <Modal
        open={feasibilityModalOpen}
        onClose={() => setFeasibilityModalOpen(false)}
        title={selectedFeasibility ? "Edit Feasibility Model" : "Add Feasibility Model"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveFeas} className="space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
              Project Model Name *
            </label>
            <input
              type="text"
              required
              value={feasName}
              onChange={(e) => setFeasName(e.target.value)}
              placeholder="e.g. Project Skyline Commercial Tower"
              className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Estimated Cost (₹) *
              </label>
              <input
                type="number"
                required
                value={feasCost}
                onChange={(e) => setFeasCost(e.target.value)}
                placeholder="350000000"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Projected Revenue (₹) *
              </label>
              <input
                type="number"
                required
                value={feasRevenue}
                onChange={(e) => setFeasRevenue(e.target.value)}
                placeholder="520000000"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                ROI % (Optional)
              </label>
              <input
                type="number"
                value={feasRoi}
                onChange={(e) => setFeasRoi(e.target.value)}
                placeholder="Calculated automatically"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-4">
            <button
              type="button"
              onClick={() => setFeasibilityModalOpen(false)}
              className="rounded-xl border border-concrete-100 bg-white px-4 py-2.5 text-[12.5px] font-semibold text-concrete-600 hover:bg-concrete-50 dark:border-white/5 dark:bg-blueprint-850 dark:text-blueprint-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white hover:bg-signal-orange/90"
            >
              Save Model
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
