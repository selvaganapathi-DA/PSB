import clsx from "clsx";

const toneMap: Record<string, string> = {
  green: "bg-signal-green/10 text-signal-green ring-signal-green/20",
  orange: "bg-signal-orange/10 text-signal-orangeDark ring-signal-orange/20",
  amber: "bg-signal-amber/10 text-[#946200] ring-signal-amber/30",
  red: "bg-signal-red/10 text-signal-red ring-signal-red/20",
  blue: "bg-blueprint-500/10 text-blueprint-600 ring-blueprint-500/20",
  gray: "bg-concrete-100 text-concrete-500 ring-concrete-100",
};

const statusTone: Record<string, keyof typeof toneMap> = {
  Running: "blue",
  Planning: "gray",
  "On Hold": "amber",
  Delayed: "red",
  Completed: "green",
  Active: "green",
  Idle: "gray",
  Maintenance: "amber",
  "Out of Service": "red",
  Present: "green",
  Absent: "red",
  "On Leave": "amber",
  Draft: "gray",
  "Pending Approval": "amber",
  Approved: "blue",
  Delivered: "green",
  Cancelled: "red",
  Sent: "blue",
  Paid: "green",
  Overdue: "red",
  Low: "gray",
  Medium: "blue",
  High: "amber",
  Urgent: "red",
  "To Do": "gray",
  "In Progress": "blue",
  Review: "amber",
  Done: "green",
  Backlog: "gray",
  Won: "green",
  Lost: "red",
  Submitted: "blue",
  Awarded: "green",
  Open: "gray",
  New: "gray",
  Contacted: "blue",
  Proposal: "amber",
  Negotiation: "blue",
  Passed: "green",
  Failed: "red",
  Pending: "amber",
  Minor: "gray",
  Major: "amber",
  Critical: "red",
  "In Use": "green",
  "In Store": "gray",
  Reported: "amber",
  Investigating: "blue",
  Resolved: "green",
  "Low Stock": "red",
  Reorder: "red",
  Good: "green",
};

export default function StatusChip({ label }: { label: string }) {
  const tone = statusTone[label] ?? "gray";
  return (
    <div className="flex items-center h-full">
      <span
        className={clsx(
          "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset h-fit leading-none",
          toneMap[tone]
        )}
      >
        {label}
      </span>
    </div>
  );
}
