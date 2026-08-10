"use client";

import React, { useState } from "react";
import { Kanban } from "@/components/ui/Kanban";
import { tasks as initialTasks } from "@/lib/mockData";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

interface Task {
  id: string;
  title: string;
  assignee: string;
  status: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  dueDate: string;
  project?: string;
}

export default function KanbanPage() {
  const { toast } = useToast();
  const [tasksList, setTasksList] = useState<Task[]>(initialTasks as any);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("To Do");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High" | "Urgent">("Medium");
  const [dueDate, setDueDate] = useState("");

  const handleTaskMove = (taskId: string, fromColId: string, toColId: string) => {
    setTasksList((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: toColId } : t))
    );
    toast(`Moved task to ${toColId}`);
  };

  const handleAddTaskClick = (colId: string) => {
    setSelectedTask(null);
    setTitle("");
    setAssignee("");
    setStatus(colId);
    setPriority("Medium");
    setDueDate("");
    setModalOpen(true);
  };

  const handleEditTaskClick = (taskId: string, colId: string) => {
    const task = tasksList.find((t) => t.id === taskId);
    if (!task) return;
    setSelectedTask(task);
    setTitle(task.title);
    setAssignee(task.assignee);
    setStatus(task.status);
    setPriority(task.priority);
    setDueDate(task.dueDate);
    setModalOpen(true);
  };

  const handleDeleteTask = (taskId: string, colId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasksList((prev) => prev.filter((t) => t.id !== taskId));
      toast("Task deleted successfully!");
    }
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !assignee.trim() || !status.trim() || !dueDate) {
      toast("Please fill in all fields.", "error");
      return;
    }

    const tData = {
      title,
      assignee,
      status,
      priority,
      dueDate,
    };

    if (selectedTask) {
      setTasksList((prev) =>
        prev.map((t) => (t.id === selectedTask.id ? { ...t, ...tData } : t))
      );
      toast("Task updated successfully!");
    } else {
      const newTask: Task = {
        id: `tsk-${Date.now()}`,
        ...tData,
      };
      setTasksList((prev) => [...prev, newTask]);
      toast("Task added successfully!");
    }

    setModalOpen(false);
  };

  // Group tasks by their status
  const statuses = ["Backlog", "To Do", "In Progress", "Review", "Done"];

  const columns = statuses.map((st) => ({
    id: st,
    title: st,
    tasks: tasksList
      .filter((t) => t.status === st)
      .map((t) => ({
        id: t.id,
        title: t.title,
        subtitle: t.assignee,
        priority: t.priority,
        dueDate: t.dueDate,
      })),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
            Kanban Task Board
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Drag and drop tasks between columns to update their completion status.
          </p>
        </div>
        <button
          onClick={() => handleAddTaskClick("To Do")}
          className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
        >
          Add Task
        </button>
      </div>

      <div className="overflow-x-auto min-h-[500px]">
        <Kanban
          initialColumns={columns}
          onTaskMove={handleTaskMove}
          onAddTask={handleAddTaskClick}
          onEditTask={handleEditTaskClick}
          onDeleteTask={handleDeleteTask}
        />
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedTask ? "Edit Task Details" : "Add New Task"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveTask} className="space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Pour Slab Concrete"
              className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Assignee Name *
              </label>
              <input
                type="text"
                required
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                placeholder="e.g. Selvam PM"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Due Date *
              </label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Status Column
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              >
                {statuses.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
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
              Save Task
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
