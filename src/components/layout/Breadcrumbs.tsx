import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = useLocation().pathname || "/dashboard";
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center gap-1.5 px-4 pt-4 text-[12.5px] text-concrete-300 sm:px-6">
      <Link to="/dashboard" className="flex items-center gap-1 hover:text-concrete-700 dark:hover:text-blueprint-100">
        <Home size={13} />
      </Link>
      {segments.map((seg, i) => {
        const href = "/" + segments.slice(0, i + 1).join("/");
        const label = seg.replace(/-/g, " ");
        const isLast = i === segments.length - 1;
        return (
          <span key={href} className="flex items-center gap-1.5">
            <ChevronRight size={12} />
            {isLast ? (
              <span className="font-medium capitalize text-concrete-700 dark:text-blueprint-100">
                {label}
              </span>
            ) : (
              <Link to={href} className="capitalize hover:text-concrete-700 dark:hover:text-blueprint-100">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
