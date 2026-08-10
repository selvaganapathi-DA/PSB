import { Card, CardHeader } from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import StatusChip from "@/components/ui/StatusChip";
import { projects } from "@/lib/mockData";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function ProjectProgressList() {
  const running = projects.filter((p) => p.status !== "Completed").slice(0, 5);

  return (
    <Card>
      <CardHeader
        title="Project Progress"
        subtitle="Live status of ongoing sites"
        action={
          <Link
            to="/projects"
            className="flex items-center gap-1 text-[12.5px] font-semibold text-blueprint-600 hover:underline dark:text-blueprint-300"
          >
            View all <ArrowUpRight size={13} />
          </Link>
        }
      />
      <div className="space-y-4">
        {running.map((p) => (
          <div key={p.id} className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center justify-between gap-2">
                <p className="truncate text-[13px] font-semibold text-concrete-900 dark:text-blueprint-100">
                  {p.name}
                </p>
                <StatusChip label={p.status} />
              </div>
              <div className="flex items-center gap-2">
                <ProgressBar
                  value={p.progress}
                  tone={p.status === "Delayed" ? "red" : "blue"}
                  showLabel
                />
              </div>
              <p className="mt-1 text-[11.5px] text-concrete-300">
                {p.location} · Manager: {p.manager}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
