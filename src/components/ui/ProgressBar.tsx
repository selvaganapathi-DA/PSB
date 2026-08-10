import clsx from "clsx";

export default function ProgressBar({
  value,
  tone = "blue",
  showLabel = false,
}: {
  value: number;
  tone?: "blue" | "orange" | "green" | "red";
  showLabel?: boolean;
}) {
  const toneClass = {
    blue: "bg-blueprint-500",
    orange: "bg-signal-orange",
    green: "bg-signal-green",
    red: "bg-signal-red",
  }[tone];

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-concrete-100 dark:bg-white/10">
        <div
          className={clsx("h-full rounded-full transition-all", toneClass)}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <span className="w-9 shrink-0 text-right font-mono text-[11.5px] text-concrete-500">
          {value}%
        </span>
      )}
    </div>
  );
}
