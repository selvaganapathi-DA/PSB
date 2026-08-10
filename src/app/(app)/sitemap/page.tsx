import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Settings,
  ListChecks,
  FileBarChart,
  MessageSquare,
  TrendingUp,
  LayoutDashboard,
  ShieldAlert,
  GitBranch,
  FileSignature,
  Compass,
  Coins,
  Home,
  Smartphone,
  UserCheck,
} from "lucide-react";

interface SitemapNode {
  id: string;
  label: string;
  subLabel: string;
  icon: React.ComponentType<any>;
  href: string;
  // Visual positions based on a 1000x680 coordinate space
  x: number; // Node starting X
  y: number; // Node starting Y
  width: number;
  height: number;
  color: string;
}

export default function SitemapPage() {
  const navigate = useNavigate();

  // Nodes configurations scaled to a 1000x680 coordinate space
  const leftNodes: SitemapNode[] = [
    {
      id: "pre-con",
      label: "PRE-CONSTRUCTION",
      subLabel: "Land, feasibility & rate analysis",
      icon: Compass,
      href: "/pre-construction",
      x: 20,
      y: 20,
      width: 280,
      height: 60,
      color: "border-signal-amber text-signal-amber shadow-signal-amber/10",
    },
    {
      id: "leads",
      label: "ENQUIRIES & LEAD CAPTURE",
      subLabel: "Leads pipeline and conversion",
      icon: Users,
      href: "/leads",
      x: 20,
      y: 110,
      width: 280,
      height: 60,
      color: "border-signal-orange text-signal-orange shadow-signal-orange/10",
    },
    {
      id: "customers",
      label: "CLIENT DATABASE",
      subLabel: "Customer directory and files",
      icon: Users,
      href: "/customers",
      x: 20,
      y: 200,
      width: 280,
      height: 60,
      color: "border-blueprint-500 text-blueprint-400 shadow-blueprint-500/10",
    },
    {
      id: "site-visits",
      label: "SITE VISITS & SCHEDULING",
      subLabel: "Daily site logs and check-ins",
      icon: Calendar,
      href: "/site-reports",
      x: 20,
      y: 290,
      width: 280,
      height: 60,
      color: "border-signal-amber text-signal-amber shadow-signal-amber/10",
    },
    {
      id: "quotes",
      label: "QUOTES & ESTIMATES",
      subLabel: "Client proposals and BOQ details",
      icon: FileSignature,
      href: "/quotations",
      x: 20,
      y: 380,
      width: 280,
      height: 60,
      color: "border-signal-green text-signal-green shadow-signal-green/10",
    },
  ];

  const rightNodes: SitemapNode[] = [
    {
      id: "re-sales",
      label: "REAL ESTATE SALES",
      subLabel: "Property inventory & bookings",
      icon: Home,
      href: "/real-estate-sales",
      x: 700,
      y: 20,
      width: 280,
      height: 60,
      color: "border-signal-green text-signal-green shadow-signal-green/10",
    },
    {
      id: "finance",
      label: "FINANCE & COST CENTERS",
      subLabel: "Cash flow & tax configuration",
      icon: Coins,
      href: "/finance",
      x: 700,
      y: 110,
      width: 280,
      height: 60,
      color: "border-signal-orange text-signal-orange shadow-signal-orange/10",
    },
    {
      id: "automation",
      label: "AUTOMATION WORKFLOWS",
      subLabel: "System configurations",
      icon: Settings,
      href: "/settings",
      x: 700,
      y: 200,
      width: 280,
      height: 60,
      color: "border-blueprint-500 text-blueprint-400 shadow-blueprint-500/10",
    },
    {
      id: "tasks",
      label: "TASKS & FOLLOW-UPS",
      subLabel: "Milestones and kanban cards",
      icon: ListChecks,
      href: "/tasks",
      x: 700,
      y: 290,
      width: 280,
      height: 60,
      color: "border-blueprint-500 text-blueprint-400 shadow-blueprint-500/10",
    },
    {
      id: "reporting",
      label: "REPORTING & VISIBILITY",
      subLabel: "Commercial analytics and audits",
      icon: FileBarChart,
      href: "/reports",
      x: 700,
      y: 380,
      width: 280,
      height: 60,
      color: "border-signal-amber text-signal-amber shadow-signal-amber/10",
    },

  ];

  const bottomNodes: SitemapNode[] = [
    {
      id: "integrations",
      label: "INTEGRATIONS",
      subLabel: "Third party API vendors",
      icon: GitBranch,
      href: "/vendors",
      x: 15,
      y: 530,
      width: 180,
      height: 60,
      color: "border-concrete-300 text-concrete-600 dark:text-blueprint-200 shadow-concrete-500/5",
    },
    {
      id: "pipeline",
      label: "SALES PIPELINE",
      subLabel: "CRM contracts",
      icon: TrendingUp,
      href: "/crm",
      x: 210,
      y: 530,
      width: 180,
      height: 60,
      color: "border-concrete-300 text-concrete-600 dark:text-blueprint-200 shadow-concrete-500/5",
    },
    {
      id: "dashboard",
      label: "KPI DASHBOARDS",
      subLabel: "Project overviews",
      icon: LayoutDashboard,
      href: "/dashboard",
      x: 410,
      y: 530,
      width: 180,
      height: 60,
      color: "border-concrete-300 text-concrete-600 dark:text-blueprint-200 shadow-concrete-500/5",
    },
    {
      id: "mobile-app",
      label: "MOBILE SITE APP",
      subLabel: "GPS attendance & DPR",
      icon: Smartphone,
      href: "/mobile-site-app",
      x: 610,
      y: 530,
      width: 180,
      height: 60,
      color: "border-concrete-300 text-concrete-600 dark:text-blueprint-200 shadow-concrete-500/5",
    },
    {
      id: "customer-portal",
      label: "CUSTOMER PORTAL",
      subLabel: "Buyer milestones",
      icon: UserCheck,
      href: "/customer-portal",
      x: 810,
      y: 530,
      width: 180,
      height: 60,
      color: "border-concrete-300 text-concrete-600 dark:text-blueprint-200 shadow-concrete-500/5",
    },
  ];

  const centerNode = { x: 420, y: 155, width: 160, height: 160 };

  return (
    <div className="flex flex-col items-center justify-start p-2 sm:p-4 lg:p-6">
      <div className="text-center mb-8 max-w-xl">
        <h1 className="font-display text-[26px] font-bold text-concrete-900 dark:text-blueprint-100">
          Connected Operations Sitemap
        </h1>
      </div>
      {/* Connected Diagram Map Container */}
      <div className="relative w-[1000px] h-[630px] bg-white/40 dark:bg-blueprint-900/30 border border-concrete-100 dark:border-white/5 rounded-2xl p-6 backdrop-blur-md shadow-card">

        {/* Animated SVG Connections Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 630" style={{ zIndex: 0 }}>
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b22e2" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#00bfff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#00fad2" stopOpacity="0.45" />
            </linearGradient>
          </defs>

          {/* Left Nodes Connection Paths */}
          {leftNodes.map((node) => {
            const startX = node.x + node.width;
            const startY = node.y + (node.height / 2);
            const endX = centerNode.x;
            const endY = centerNode.y + (centerNode.height / 2);

            return (
              <g key={`line-left-${node.id}`}>
                <path
                  d={`M ${startX} ${startY} C ${startX + 80} ${startY}, ${endX - 80} ${endY}, ${endX} ${endY}`}
                  fill="none"
                  stroke="url(#line-gradient)"
                  strokeWidth="2"
                />
                <circle cx={startX} cy={startY} r="4.5" className="fill-signal-orange" />
              </g>
            );
          })}

          {/* Right Nodes Connection Paths */}
          {rightNodes.map((node) => {
            const startX = node.x;
            const startY = node.y + (node.height / 2);
            const endX = centerNode.x + centerNode.width;
            const endY = centerNode.y + (centerNode.height / 2);

            return (
              <g key={`line-right-${node.id}`}>
                <path
                  d={`M ${startX} ${startY} C ${startX - 80} ${startY}, ${endX + 80} ${endY}, ${endX} ${endY}`}
                  fill="none"
                  stroke="url(#line-gradient)"
                  strokeWidth="2"
                />
                <circle cx={startX} cy={startY} r="4.5" className="fill-blueprint-400" />
              </g>
            );
          })}

          {/* Bottom Nodes Connection Paths */}
          {bottomNodes.map((node) => {
            const startX = node.x + (node.width / 2);
            const startY = node.y;
            const endX = startX;
            const endY = centerNode.y + centerNode.height;
            const centerBaseX = centerNode.x + (centerNode.width / 2);
            const centerBaseY = centerNode.y + centerNode.height;

            return (
              <g key={`line-bottom-${node.id}`}>
                {/* Horizontal flow line routing bottom nodes to center bottom anchor */}
                <path
                  d={`M ${startX} ${startY} L ${startX} 420 M ${startX} 420 L ${centerBaseX} 420 L ${centerBaseX} ${centerBaseY}`}
                  fill="none"
                  stroke="url(#line-gradient)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <circle cx={startX} cy={startY} r="4.5" className="fill-concrete-500 dark:fill-blueprint-200" />
              </g>
            );
          })}
        </svg>

        {/* Central Core Node */}
        <div
          className="absolute z-10 flex flex-col items-center"
          style={{
            left: `${centerNode.x}px`,
            top: `${centerNode.y}px`,
            width: `${centerNode.width}px`,
            height: `${centerNode.height}px`,
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center w-full h-full rounded-2xl border border-blueprint-200 bg-blueprint-900 text-white p-4 shadow-glass text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-blueprint-grid bg-grid opacity-10" />
            <img src="/logo.png" className="h-16 w-16 object-contain mb-2 bg-white rounded-xl p-1 shadow-md" alt="Logo" />
            <h2 className="font-display text-[16px] font-bold tracking-wide">
              VARUVI
            </h2>
            <p className="text-[10px] text-blueprint-200 uppercase tracking-widest mt-0.5">
              Operations System
            </p>
          </motion.div>
        </div>

        {/* Outer Nodes - Left, Right and Bottom render */}
        {[...leftNodes, ...rightNodes, ...bottomNodes].map((node) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={node.id}
              onClick={() => navigate(node.href)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={`absolute cursor-pointer z-10 flex items-center gap-3 border bg-white dark:bg-blueprint-800 rounded-xl px-3 py-2.5 shadow-card hover:shadow-elevated transition-shadow ${node.color}`}
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
                width: `${node.width}px`,
                height: `${node.height}px`,
              }}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-concrete-50 dark:bg-white/5 border border-concrete-100 dark:border-white/10">
                <Icon size={18} />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h3 className="truncate font-display text-[12px] font-bold tracking-wide text-concrete-900 dark:text-blueprint-100 uppercase">
                  {node.label}
                </h3>
                <p className="truncate text-[10px] text-concrete-300 dark:text-blueprint-400 mt-0.5">
                  {node.subLabel}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
