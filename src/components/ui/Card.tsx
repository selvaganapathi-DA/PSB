import clsx from "clsx";

export function Card({
  children,
  className,
  padded = true,
}: {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-concrete-100 bg-white shadow-card dark:border-white/5 dark:bg-blueprint-850",
        padded && "p-5",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-0.5 text-[12.5px] text-concrete-300">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
