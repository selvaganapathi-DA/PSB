"use client";

import React, { useState } from "react";
import { drawings as initialDrawings } from "@/lib/mockData";
import { Card, CardHeader } from "@/components/ui/Card";
import StatusChip from "@/components/ui/StatusChip";
import { ZoomIn, ZoomOut, Edit2, Trash2, Plus } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Drawing } from "@/types";

export default function DrawingsPage() {
  const { toast } = useToast();
  const [drawingsList, setDrawingsList] = useState<Drawing[]>(initialDrawings);
  const [selectedDrawing, setSelectedDrawing] = useState<Drawing>(initialDrawings[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEditDrawing, setSelectedEditDrawing] = useState<Drawing | null>(null);

  // Form State
  const [drawingNumber, setDrawingNumber] = useState("");
  const [title, setTitle] = useState("");
  const [version, setVersion] = useState("");
  const [discipline, setDiscipline] = useState<"Architecture" | "Structural" | "MEP" | "HVAC" | "Civil">("Architecture");
  const [approved, setApproved] = useState(false);

  const handleAddClick = () => {
    setSelectedEditDrawing(null);
    setDrawingNumber(`DWG-${Date.now().toString().slice(-4)}`);
    setTitle("");
    setVersion("R0");
    setDiscipline("Architecture");
    setApproved(false);
    setModalOpen(true);
  };

  const handleEditClick = (e: React.MouseEvent, draw: Drawing) => {
    e.stopPropagation();
    setSelectedEditDrawing(draw);
    setDrawingNumber(draw.drawingNumber);
    setTitle(draw.title);
    setVersion(draw.version);
    setDiscipline(draw.discipline);
    setApproved(draw.approved);
    setModalOpen(true);
  };

  const handleDeleteDrawing = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this drawing?")) {
      const updated = drawingsList.filter((d) => d.id !== id);
      setDrawingsList(updated);
      toast("Drawing deleted successfully!");
      if (selectedDrawing.id === id && updated.length > 0) {
        setSelectedDrawing(updated[0]);
      }
    }
  };

  const handleSaveDrawing = (e: React.FormEvent) => {
    e.preventDefault();

    if (!drawingNumber.trim() || !title.trim() || !version.trim() || !discipline) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const drawData = {
      drawingNumber,
      title,
      version,
      discipline,
      approved,
      projectId: selectedDrawing?.projectId || "1",
      uploadedAt: new Date().toISOString().slice(0, 10),
    };

    let updatedList: Drawing[];
    if (selectedEditDrawing) {
      updatedList = drawingsList.map((d) =>
        d.id === selectedEditDrawing.id ? { ...d, ...drawData } : d
      );
      toast("Drawing updated successfully!");
    } else {
      const newDraw: Drawing = {
        id: `dwg-${Date.now()}`,
        ...drawData,
      };
      updatedList = [...drawingsList, newDraw];
      toast("Drawing added successfully!");
    }

    setDrawingsList(updatedList);
    const updatedSelected = updatedList.find((d) => d.drawingNumber === drawingNumber);
    if (updatedSelected) {
      setSelectedDrawing(updatedSelected);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
            Blueprints & Drawing Viewer
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Access architectural, structural, and electrical CAD layouts.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Sheet
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          <Card className="relative overflow-hidden">
            {selectedDrawing ? (
              <>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100 text-left">
                      {selectedDrawing.title}
                    </h3>
                    <p className="text-[12px] text-concrete-300 text-left">
                      No: {selectedDrawing.drawingNumber} | Version: {selectedDrawing.version}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-concrete-50 p-1 rounded-lg dark:bg-blueprint-900">
                    <button className="rounded p-1.5 hover:bg-concrete-100 dark:hover:bg-blueprint-800">
                      <ZoomIn className="h-4 w-4 text-concrete-600 dark:text-blueprint-300" />
                    </button>
                    <button className="rounded p-1.5 hover:bg-concrete-100 dark:hover:bg-blueprint-800">
                      <ZoomOut className="h-4 w-4 text-concrete-600 dark:text-blueprint-300" />
                    </button>
                  </div>
                </div>

                {/* Mock Vector Canvas */}
                <div className="relative h-96 w-full rounded-xl border border-concrete-100 bg-concrete-50/50 flex flex-col items-center justify-center dark:border-white/5 dark:bg-blueprint-900/30">
                  <svg className="w-full h-full p-6 text-concrete-300 dark:text-blueprint-800" viewBox="0 0 100 100">
                    <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2" />
                    <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2" />
                    <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <text x="52" y="45" fontSize="3" fill="currentColor">Column Axis C-12</text>
                  </svg>
                  <div className="absolute bottom-3 left-3 bg-blueprint-950/70 text-white text-[11px] px-2.5 py-1 rounded-lg">
                    Blueprint Render Mode: Vector CAD ({selectedDrawing.discipline})
                  </div>
                </div>
              </>
            ) : (
              <div className="flex h-96 items-center justify-center text-concrete-300">
                No drawing sheets available. Click 'Add Sheet' to upload one.
              </div>
            )}
          </Card>
        </div>

        <div className="h-full">
          <Card className="h-full flex flex-col">
            <CardHeader title="Sheets List" subtitle="Select drawing to load in canvas" />
            <div className="overflow-y-auto max-h-[400px] divide-y divide-concrete-100 dark:divide-white/5">
              {drawingsList.map((draw) => (
                <div
                  key={draw.id}
                  onClick={() => setSelectedDrawing(draw)}
                  className={`p-3 cursor-pointer hover:bg-concrete-50/50 dark:hover:bg-blueprint-900/50 transition-all flex items-center justify-between group ${
                    selectedDrawing?.id === draw.id ? "bg-signal-orange/10 border-l-4 border-signal-orange" : ""
                  }`}
                >
                  <div className="text-left">
                    <p className="text-[12.5px] font-semibold text-concrete-900 dark:text-blueprint-100 line-clamp-1">
                      {draw.title}
                    </p>
                    <p className="text-[10px] text-concrete-300 mt-0.5">
                      {draw.drawingNumber} ({draw.discipline})
                    </p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleEditClick(e, draw)}
                      className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
                      title="Edit Sheet"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteDrawing(e, draw.id)}
                      className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
                      title="Delete Sheet"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedEditDrawing ? "Edit Drawing Details" : "Add New Sheet"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveDrawing} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Drawing No *
              </label>
              <input
                type="text"
                required
                value={drawingNumber}
                onChange={(e) => setDrawingNumber(e.target.value)}
                placeholder="e.g. AR-001"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Drawing Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Ground Floor Plan"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Discipline *
              </label>
              <select
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value as any)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              >
                <option value="Architecture">Architecture</option>
                <option value="Structural">Structural</option>
                <option value="MEP">MEP</option>
                <option value="HVAC">HVAC</option>
                <option value="Civil">Civil</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Revision Version *
              </label>
              <input
                type="text"
                required
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="e.g. R0, R1"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="approved"
              checked={approved}
              onChange={(e) => setApproved(e.target.checked)}
              className="rounded text-signal-orange focus:ring-signal-orange"
            />
            <label htmlFor="approved" className="text-[13px] font-medium text-concrete-600 dark:text-blueprint-200">
              Approved & Released for Construction
            </label>
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
              Save Drawing
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
