"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { projects as initialProjects } from "@/lib/mockData";
import { Card } from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import StatusChip from "@/components/ui/StatusChip";
import { Avatar } from "@/components/ui/Avatar";
import { MapPin, Calendar, Edit2, Trash2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

interface Project {
  id: string;
  code: string;
  name: string;
  client: string;
  location: string;
  startDate: string;
  endDate: string;
  progress: number;
  manager: string;
  budget: number;
  status: string;
}

export default function ProjectsPage() {
  const { toast } = useToast();
  const [projectsList, setProjectsList] = useState<Project[]>(initialProjects);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Form State
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [progress, setProgress] = useState("");
  const [manager, setManager] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState("Planning");

  const handleAddClick = () => {
    setSelectedProject(null);
    setCode(`PRJ-${Date.now().toString().slice(-4)}`);
    setName("");
    setClient("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setProgress("0");
    setManager("");
    setBudget("");
    setStatus("Planning");
    setModalOpen(true);
  };

  const handleEditClick = (e: React.MouseEvent, proj: Project) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProject(proj);
    setCode(proj.code);
    setName(proj.name);
    setClient(proj.client);
    setLocation(proj.location);
    setStartDate(proj.startDate);
    setEndDate(proj.endDate);
    setProgress(String(proj.progress));
    setManager(proj.manager);
    setBudget(String(proj.budget));
    setStatus(proj.status);
    setModalOpen(true);
  };

  const handleDeleteProject = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this project?")) {
      setProjectsList((prev) => prev.filter((p) => p.id !== id));
      toast("Project deleted successfully!");
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim() || !name.trim() || !client.trim() || !location.trim() || !startDate || !endDate || !progress || !manager.trim() || !budget || !status.trim()) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const projData = {
      code,
      name,
      client,
      location,
      startDate,
      endDate,
      progress: parseInt(progress, 10),
      manager,
      budget: parseFloat(budget),
      status,
    };

    if (selectedProject) {
      setProjectsList((prev) =>
        prev.map((p) => (p.id === selectedProject.id ? { ...p, ...projData } : p))
      );
      toast("Project updated successfully!");
    } else {
      const newProj: Project = {
        id: `prj-${Date.now()}`,
        ...projData,
      };
      setProjectsList((prev) => [...prev, newProj]);
      toast("Project created successfully!");
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
            Projects Portfolio
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Manage, coordinate, and track construction progress across Tamil Nadu.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projectsList.map((proj) => (
          <Link to={`/projects/${proj.id}`} key={proj.id}>
            <Card className="hover:border-signal-orange/30 transition-all cursor-pointer h-full flex flex-col justify-between group relative">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11.5px] font-mono font-semibold text-concrete-300 dark:text-blueprint-400">
                    {proj.code}
                  </span>
                  <div className="flex items-center gap-2">
                    <StatusChip label={proj.status} />
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleEditClick(e, proj)}
                        className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
                        title="Edit Project"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteProject(e, proj.id)}
                        className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
                        title="Delete Project"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
                <h3 className="font-display text-[15.5px] font-semibold text-concrete-900 dark:text-blueprint-100 mb-2">
                  {proj.name}
                </h3>
                <p className="text-[12.5px] text-concrete-300 dark:text-blueprint-400 mb-4 line-clamp-1">
                  Client: {proj.client}
                </p>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-[12px] text-concrete-600 dark:text-blueprint-200">
                    <MapPin className="h-3.5 w-3.5 text-concrete-300 dark:text-blueprint-400" />
                    <span>{proj.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-concrete-600 dark:text-blueprint-200">
                    <Calendar className="h-3.5 w-3.5 text-concrete-300 dark:text-blueprint-400" />
                    <span>{proj.startDate} to {proj.endDate}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="space-y-1 mb-4">
                  <div className="flex items-center justify-between text-[11.5px]">
                    <span className="text-concrete-300 dark:text-blueprint-400">Progress</span>
                    <span className="font-semibold text-concrete-900 dark:text-blueprint-100">{proj.progress}%</span>
                  </div>
                  <ProgressBar value={proj.progress} />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-concrete-100 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <Avatar name={proj.manager} />
                    <div className="text-left">
                      <p className="text-[11.5px] font-semibold text-concrete-900 dark:text-blueprint-100">
                        {proj.manager}
                      </p>
                      <p className="text-[10px] text-concrete-300 dark:text-blueprint-400">Project Manager</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[11.5px] font-semibold text-concrete-900 dark:text-blueprint-100">
                      ₹{(proj.budget / 10000000).toFixed(2)} Cr
                    </p>
                    <p className="text-[10px] text-concrete-300 dark:text-blueprint-400">Budget</p>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedProject ? "Edit Project Details" : "Create New Project"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveProject} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Project Code *
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. PRJ-102"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Skyline Business Tower"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Client Name *
              </label>
              <input
                type="text"
                required
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. Ganga Housing"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Project Site Location *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. OMR, Chennai"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Start Date *
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                End Date *
              </label>
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Budget (₹) *
              </label>
              <input
                type="number"
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. 150000000"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Project Manager *
              </label>
              <input
                type="text"
                required
                value={manager}
                onChange={(e) => setManager(e.target.value)}
                placeholder="e.g. Selvam V"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Progress (%) *
              </label>
              <input
                type="number"
                required
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                placeholder="e.g. 45"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
              Project Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
            >
              <option value="Planning">Planning</option>
              <option value="Active">Active</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
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
              Save Project
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
