import { Card, CardHeader } from "@/components/ui/Card";
import StatusChip from "@/components/ui/StatusChip";
import { tasks } from "@/lib/mockData";
import { CalendarDays } from "lucide-react";

export default function UpcomingTasks() {
  const upcoming = [...tasks]
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 5);

  return (
    <Card>
      <CardHeader title="Upcoming Tasks" subtitle="Sorted by nearest due date" />
      <ul className="space-y-3">
        {upcoming.map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-concrete-100 p-3 dark:border-white/5"
          >
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-concrete-900 dark:text-blueprint-100">
                {t.title}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-[11.5px] text-concrete-300">
                <CalendarDays size={12} /> {t.dueDate} · {t.assignee}
              </p>
            </div>
            <StatusChip label={t.priority} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
