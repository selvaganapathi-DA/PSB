"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/Calendar";
import { tasks } from "@/lib/mockData";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type?: "task" | "milestone" | "meeting";
}

export default function CalendarPage() {
  const { toast } = useToast();

  const [events, setEvents] = useState<CalendarEvent[]>(() =>
    tasks.map((t) => ({
      id: t.id,
      title: t.title,
      date: t.dueDate,
      type: "task" as const,
    }))
  );

  // Modal & Form State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState<"task" | "milestone" | "meeting">("task");

  const handleDateClick = (clickedDate: string) => {
    setSelectedEvent(null);
    setTitle("");
    setDate(clickedDate);
    setType("task");
    setModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setDate(event.date);
    setType(event.type || "task");
    setModalOpen(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !date) {
      toast("Please fill in all required fields.", "error");
      return;
    }

    if (selectedEvent) {
      // Edit Existing
      setEvents((prev) =>
        prev.map((evt) =>
          evt.id === selectedEvent.id
            ? { ...evt, title, date, type }
            : evt
        )
      );
      toast("Event updated successfully!");
    } else {
      // Create New
      const newEvent: CalendarEvent = {
        id: `evt-${Date.now()}`,
        title,
        date,
        type,
      };
      setEvents((prev) => [...prev, newEvent]);
      toast("Event scheduled successfully!");
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
          Work Calendar
        </h1>
        <p className="mt-1 text-[13px] text-concrete-300">
          View and schedule all site tasks, milestones, and meetings.
        </p>
      </div>

      <Calendar
        events={events}
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedEvent ? "Edit Plan / Event" : "Schedule Plan / Event"}
        maxWidth="sm"
      >
        <form onSubmit={handleSaveEvent} className="space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
              Event Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Concrete pouring - Section D"
              className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Event Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange"
              >
                <option value="task">Task</option>
                <option value="milestone">Milestone</option>
                <option value="meeting">Meeting</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
              {selectedEvent ? "Save Changes" : "Save Plan"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
