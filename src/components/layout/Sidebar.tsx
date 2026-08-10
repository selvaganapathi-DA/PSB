import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronsLeft, ChevronsRight, ChevronDown, HardHat, X } from "lucide-react";
import { navSections } from "@/lib/nav";
import { getIcon } from "@/lib/iconMap";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleSidebarCollapsed, setMobileSidebarOpen } from "@/store/slices/uiSlice";
import clsx from "clsx";

function WorkspaceSwitcher({ collapsed }: { collapsed: boolean }) {
  const workspace = useAppSelector((s) => s.ui.activeWorkspace);
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative px-3 pt-4 pb-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          "flex w-full items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-2.5 text-left transition hover:bg-white/10",
          collapsed && "justify-center"
        )}
      >
<img
  src={`${import.meta.env.BASE_URL}logo.png`}
  className="h-8 w-8 shrink-0 rounded-lg object-contain bg-white p-0.5"
  alt="Varuvi Logo"
/>        {!collapsed && (
          <>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-display text-[13px] font-semibold text-white">
                {workspace}
              </span>
              <span className="block text-[11px] text-blueprint-200">Trading &amp; Sites</span>
            </span>
            <ChevronDown size={15} className="text-blueprint-200" />
          </>
        )}
      </button>
      {open && !collapsed && (
        <div className="absolute left-3 right-3 top-[62px] z-30 rounded-xl border border-white/10 bg-blueprint-800 p-1.5 shadow-elevated">
          {["Varuvi Sitemap", "Varuvi Infrastructure"].map((w) => (
            <button
              key={w}
              onClick={() => setOpen(false)}
              className="block w-full truncate rounded-lg px-2.5 py-2 text-left text-[13px] text-blueprint-100 hover:bg-white/10"
            >
              {w}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarContent() {
  const pathname = useLocation().pathname;
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);
  const dispatch = useAppDispatch();

  return (
    <div className="flex h-full flex-col bg-blueprint-900">
      <div className="bg-blueprint-grid bg-grid bg-blueprint-900">
        <WorkspaceSwitcher collapsed={collapsed} />
      </div>

      <nav className="scrollbar-thin flex-1 overflow-y-auto px-2.5 pb-4">
        {navSections.map((section) => (
          <div key={section.section} className="mb-3">
            {!collapsed && (
              <p className="px-2.5 pb-1.5 pt-3 text-[10.5px] font-semibold uppercase tracking-wider text-blueprint-400">
                {section.section}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = getIcon(item.icon);
                const active =
                  pathname === item.href || pathname?.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      title={collapsed ? item.label : undefined}
                      className={clsx(
                        "group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors",
                        active
                          ? "bg-signal-orange/15 text-white"
                          : "text-blueprint-200 hover:bg-white/5 hover:text-white",
                        collapsed && "justify-center"
                      )}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 h-[18px] w-[3px] -translate-y-1/2 rounded-r-full bg-signal-orange" />
                      )}
                      <Icon size={17} className={active ? "text-signal-orange" : ""} />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                      {!collapsed && item.badge ? (
                        <span className="ml-auto rounded-full bg-signal-orange px-1.5 py-0.5 text-[10px] font-bold text-white">
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-2.5">
        <button
          onClick={() => dispatch(toggleSidebarCollapsed())}
          className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-blueprint-200 transition hover:bg-white/5 hover:text-white"
        >
          {collapsed ? <ChevronsRight size={17} /> : <ChevronsLeft size={17} />}
          {!collapsed && <span className="text-[12px] font-medium">Collapse</span>}
        </button>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);
  const mobileOpen = useAppSelector((s) => s.ui.mobileSidebarOpen);
  const dispatch = useAppDispatch();

  return (
    <>
      {/* Desktop */}
      <motion.aside
        animate={{ width: collapsed ? 76 : 264 }}
        transition={{ type: "tween", duration: 0.2 }}
        className="sticky top-0 hidden h-screen shrink-0 overflow-hidden border-r border-blueprint-700/40 lg:block"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => dispatch(setMobileSidebarOpen(false))}
          />
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="relative h-full w-[264px]"
          >
            <button
              onClick={() => dispatch(setMobileSidebarOpen(false))}
              className="absolute right-[-40px] top-3 rounded-lg bg-blueprint-900 p-2 text-white"
            >
              <X size={18} />
            </button>
            <SidebarContent />
          </motion.div>
        </div>
      )}
    </>
  );
}
