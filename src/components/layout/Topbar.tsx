import * as React from "react";
import { Link } from "react-router-dom";
import { Menu, Search, Bell, Sun, Moon, Settings, LogOut, User, Network } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMobileSidebarOpen } from "@/store/slices/uiSlice";
import { toggleMode } from "@/store/slices/themeSlice";
import clsx from "clsx";

export default function Topbar() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((s) => s.theme.mode);
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-concrete-100 bg-white/80 px-4 backdrop-blur-md dark:border-white/5 dark:bg-blueprint-900/80 sm:px-6">
      <button
        onClick={() => dispatch(setMobileSidebarOpen(true))}
        className="rounded-lg p-2 text-concrete-500 hover:bg-concrete-50 dark:text-blueprint-200 dark:hover:bg-white/5 lg:hidden"
      >
        <Menu size={20} />
      </button>

      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-concrete-300"
        />
        <input
          type="text"
          placeholder="Search projects, tasks, vendors…"
          className="w-full rounded-lg border border-concrete-100 bg-concrete-50 py-2 pl-9 pr-3 text-[13px] text-concrete-900 outline-none transition placeholder:text-concrete-300 focus:border-blueprint-400 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-blueprint-100 dark:focus:bg-white/10"
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-concrete-100 bg-white px-1.5 py-0.5 text-[10px] text-concrete-300 dark:border-white/10 dark:bg-white/5">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <Link
          to="/"
          aria-label="View Sitemap"
          className="rounded-lg p-2 text-concrete-500 transition hover:bg-concrete-50 dark:text-blueprint-200 dark:hover:bg-white/5 flex items-center gap-1.5"
        >
          <Network size={18} />
          <span className="hidden sm:inline text-[13px] font-semibold">Sitemap</span>
        </Link>

        <button
          onClick={() => dispatch(toggleMode())}
          aria-label="Toggle theme"
          className="rounded-lg p-2 text-concrete-500 transition hover:bg-concrete-50 dark:text-blueprint-200 dark:hover:bg-white/5"
        >
          {mode === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            aria-label="Notifications"
            className="relative rounded-lg p-2 text-concrete-500 transition hover:bg-concrete-50 dark:text-blueprint-200 dark:hover:bg-white/5"
          >
            <Bell size={18} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-signal-orange" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-11 w-80 rounded-xl border border-concrete-100 bg-white p-2 shadow-elevated dark:border-white/10 dark:bg-blueprint-800">
              <p className="px-2 py-1.5 text-[12px] font-semibold text-concrete-500 dark:text-blueprint-200">
                Notifications
              </p>
              {[
                { t: "BOQ revision approved", d: "Skyline Business Tower · 12m ago" },
                { t: "Purchase order pending approval", d: "PO-3393 · 1h ago" },
                { t: "Safety inspection overdue", d: "Tower B · 3h ago" },
              ].map((n) => (
                <div
                  key={n.t}
                  className="rounded-lg px-2 py-2 text-[13px] hover:bg-concrete-50 dark:hover:bg-white/5"
                >
                  <p className="font-medium text-concrete-900 dark:text-blueprint-100">{n.t}</p>
                  <p className="text-[11.5px] text-concrete-300">{n.d}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2 transition hover:bg-concrete-50 dark:hover:bg-white/5"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blueprint-700 text-[12px] font-bold text-white">
              PSB
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-[12.5px] font-semibold text-concrete-900 dark:text-blueprint-100">
                PSB
              </span>
              <span className="block text-[11px] text-concrete-300">Project Director</span>
            </span>
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-12 w-52 rounded-xl border border-concrete-100 bg-white p-1.5 shadow-elevated dark:border-white/10 dark:bg-blueprint-800">
              {[
                { icon: User, label: "My Profile" },
                { icon: Settings, label: "Account Settings" },
                { icon: LogOut, label: "Sign Out" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className={clsx(
                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] text-concrete-700 hover:bg-concrete-50 dark:text-blueprint-100 dark:hover:bg-white/5"
                  )}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
