import { Card, CardHeader } from "@/components/ui/Card";
import StatusChip from "@/components/ui/StatusChip";
import ProgressBar from "@/components/ui/ProgressBar";
import { equipmentList } from "@/lib/mockData";

export default function EquipmentStatus() {
  return (
    <Card>
      <CardHeader title="Equipment Status" subtitle="Utilization across active sites" />
      <div className="space-y-4">
        {equipmentList.map((eq) => (
          <div key={eq.id}>
            <div className="mb-1 flex items-center justify-between">
              <p className="text-[13px] font-medium text-concrete-900 dark:text-blueprint-100">
                {eq.name}
              </p>
              <StatusChip label={eq.status} />
            </div>
            <ProgressBar
              value={eq.utilization}
              tone={eq.status === "Maintenance" ? "orange" : "green"}
              showLabel
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
