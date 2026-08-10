import { Card, CardHeader } from "@/components/ui/Card";
import { employees } from "@/lib/mockData";
import clsx from "clsx";

export default function LabourAttendance() {
  const present = employees.filter((e) => e.status === "Present").length;
  const onLeave = employees.filter((e) => e.status === "On Leave").length;
  const absent = employees.filter((e) => e.status === "Absent").length;
  const total = employees.length;

  const rows = [
    { label: "Present", value: present, tone: "bg-signal-green" },
    { label: "On Leave", value: onLeave, tone: "bg-signal-amber" },
    { label: "Absent", value: absent, tone: "bg-signal-red" },
  ];

  return (
    <Card>
      <CardHeader title="Labour Attendance" subtitle={`${present}/${total} present today`} />
      <div className="mb-4 flex h-2.5 w-full overflow-hidden rounded-full bg-concrete-100 dark:bg-white/10">
        {rows.map((r) => (
          <div
            key={r.label}
            className={clsx(r.tone)}
            style={{ width: `${(r.value / total) * 100}%` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {rows.map((r) => (
          <div key={r.label} className="rounded-xl border border-concrete-100 p-3 text-center dark:border-white/5">
            <p className="font-display text-[20px] font-semibold text-concrete-900 dark:text-blueprint-100">
              {r.value}
            </p>
            <p className="mt-0.5 text-[11.5px] text-concrete-300">{r.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
