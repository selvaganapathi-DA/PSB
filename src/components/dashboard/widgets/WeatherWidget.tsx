import { Card } from "@/components/ui/Card";
import { CloudSun, Wind, Droplets, MapPin } from "lucide-react";

export default function WeatherWidget() {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-blueprint-800 to-blueprint-600 text-white">
      <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="flex items-center gap-1 text-[12px] text-blueprint-100">
            <MapPin size={12} /> Chennai Site — Skyline Tower
          </p>
          <p className="mt-2 font-display text-[32px] font-semibold">31°C</p>
          <p className="text-[12.5px] text-blueprint-100">Partly cloudy, light winds</p>
        </div>
        <CloudSun size={40} className="text-signal-amber" />
      </div>
      <div className="relative mt-4 flex items-center gap-4 text-[12px] text-blueprint-100">
        <span className="flex items-center gap-1">
          <Wind size={13} /> 14 km/h
        </span>
        <span className="flex items-center gap-1">
          <Droplets size={13} /> 62%
        </span>
      </div>
    </Card>
  );
}
