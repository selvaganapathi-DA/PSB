"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type?: "task" | "milestone" | "meeting";
}

interface CalendarProps {
  events: CalendarEvent[];
  onDateClick?: (date: string) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

export function Calendar({ events, onDateClick, onEventClick }: CalendarProps) {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 8)); // July 2026 based on local time context

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((e) => e.date === dateStr);
  };

  return (
    <div className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
          {monthNames[month]} {year}
        </h3>
        <div className="flex items-center gap-1.5">
          <button
            onClick={prevMonth}
            className="rounded-lg p-1.5 text-concrete-300 hover:bg-concrete-50 dark:text-blueprint-400 dark:hover:bg-blueprint-800"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextMonth}
            className="rounded-lg p-1.5 text-concrete-300 hover:bg-concrete-50 dark:text-blueprint-400 dark:hover:bg-blueprint-800"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-[11.5px] font-semibold text-concrete-300 dark:text-blueprint-400 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Fill leading empty days */}
        {Array.from({ length: firstDay }).map((_, idx) => (
          <div key={`empty-${idx}`} className="h-24 rounded-xl bg-concrete-50/20 dark:bg-blueprint-900/10" />
        ))}

        {/* Calendar Days */}
        {Array.from({ length: totalDays }).map((_, idx) => {
          const day = idx + 1;
          const dayEvents = getEventsForDay(day);
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

          return (
            <div
              key={day}
              onClick={() => {
                if (onDateClick) {
                  onDateClick(dateStr);
                } else {
                  toast("Edit options are not available for this feature", "info");
                }
              }}
              className="h-24 p-2 rounded-xl border border-concrete-100 bg-white hover:border-signal-orange/30 transition-all dark:border-white/5 dark:bg-blueprint-900/40 cursor-pointer flex flex-col justify-between"
            >
              <span className="text-[12px] font-semibold text-concrete-900 dark:text-blueprint-100">
                {day}
              </span>
              <div className="flex flex-col gap-1 overflow-y-auto max-h-[60px] mt-1 pr-0.5">
                {dayEvents.map((e) => (
                  <div
                    key={e.id}
                    onClick={(evt) => {
                      evt.stopPropagation();
                      if (onEventClick) {
                        onEventClick(e);
                      } else {
                        toast("Edit options are not available for this feature", "info");
                      }
                    }}
                    className="text-[9.5px] font-medium px-1.5 py-0.5 rounded bg-signal-orange/10 text-signal-orange border border-signal-orange/20 truncate cursor-pointer hover:bg-signal-orange/20 transition-colors"
                    title={e.title}
                  >
                    {e.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
