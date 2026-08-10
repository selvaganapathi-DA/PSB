import { Card, CardHeader } from "@/components/ui/Card";
import { recentActivity } from "@/lib/mockData";
import { CheckCircle2, FileText, IndianRupee, HardHat, ClipboardCheck } from "lucide-react";
import clsx from "clsx";

const typeIcon = {
  task: CheckCircle2,
  document: FileText,
  payment: IndianRupee,
  site: HardHat,
  approval: ClipboardCheck,
};

const typeTone = {
  task: "bg-blueprint-500/10 text-blueprint-600",
  document: "bg-signal-amber/10 text-[#946200]",
  payment: "bg-signal-green/10 text-signal-green",
  site: "bg-signal-orange/10 text-signal-orangeDark",
  approval: "bg-blueprint-700/10 text-blueprint-700 dark:text-blueprint-200",
};

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader title="Recent Activity" subtitle="Latest updates across your projects" />
      <ul className="space-y-4">
        {recentActivity.map((a) => {
          const Icon = typeIcon[a.type];
          return (
            <li key={a.id} className="flex items-start gap-3">
              <span
                className={clsx(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  typeTone[a.type]
                )}
              >
                <Icon size={14} />
              </span>
              <div className="min-w-0">
                <p className="text-[13px] leading-snug text-concrete-700 dark:text-blueprint-100">
                  <span className="font-semibold text-concrete-900 dark:text-white">{a.user}</span>{" "}
                  {a.action}{" "}
                  <span className="font-semibold text-concrete-900 dark:text-white">{a.target}</span>
                </p>
                <p className="mt-0.5 text-[11.5px] text-concrete-300">{a.time}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
