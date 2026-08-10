import { Card, CardHeader } from "@/components/ui/Card";
import { projects } from "@/lib/mockData";
import { MapPin } from "lucide-react";

const pins = [
  { top: "28%", left: "62%" },
  { top: "58%", left: "40%" },
  { top: "70%", left: "70%" },
  { top: "22%", left: "30%" },
  { top: "45%", left: "78%" },
  { top: "80%", left: "22%" },
];

export default function ProjectMapWidget() {
  return (
    <Card>
      <CardHeader title="Active Sites" subtitle="Tamil Nadu project footprint" />
      <div className="relative h-64 w-full overflow-hidden rounded-xl bg-blueprint-grid bg-grid bg-blueprint-50 dark:bg-blueprint-800">
        {projects.slice(0, 6).map((p, i) => (
          <div
            key={p.id}
            className="group absolute -translate-x-1/2 -translate-y-full"
            style={pins[i]}
          >
            <MapPin
              size={22}
              className="fill-signal-orange text-blueprint-900 drop-shadow"
              strokeWidth={1.5}
            />
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-blueprint-900 px-2 py-1 text-[11px] text-white group-hover:block">
              {p.name}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
