import { NavSection } from "@/types";

export const navSections: NavSection[] = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
      { label: "Analytics", href: "/analytics", icon: "BarChart3" },
      { label: "Reports", href: "/reports", icon: "FileBarChart" },
    ],
  },
  {
    section: "Project Delivery",
    items: [
      { label: "Projects", href: "/projects", icon: "Building2" },
<<<<<<< HEAD
      { label: "Pre-Construction", href: "/pre-construction", icon: "Compass" },
=======
>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
      { label: "Timeline", href: "/timeline", icon: "GanttChartSquare" },
      { label: "Gantt Chart", href: "/gantt", icon: "AlignHorizontalDistributeCenter" },
      { label: "Calendar", href: "/calendar", icon: "CalendarDays" },
      { label: "Tasks", href: "/tasks", icon: "ListChecks" },
      { label: "Kanban Board", href: "/kanban", icon: "Kanban" },
      { label: "Daily Site Report", href: "/site-reports", icon: "ClipboardList" },
<<<<<<< HEAD
      { label: "Mobile Site App", href: "/mobile-site-app", icon: "Smartphone" },
=======
>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
    ],
  },
  {
    section: "Materials & Assets",
    items: [
      { label: "Materials", href: "/materials", icon: "Boxes" },
      { label: "Inventory", href: "/inventory", icon: "Warehouse" },
      { label: "Purchase Requests", href: "/purchase-requests", icon: "FileInput" },
      { label: "Purchase Orders", href: "/purchase-orders", icon: "FileText", badge: 3 },
      { label: "Warehouse", href: "/warehouse", icon: "Package" },
      { label: "Equipment", href: "/equipment", icon: "Truck" },
      { label: "Assets", href: "/assets", icon: "HardHat" },
      { label: "Vehicle Tracking", href: "/vehicle-tracking", icon: "MapPinned" },
    ],
  },
  {
    section: "Workforce",
    items: [
      { label: "Labour Management", href: "/labour", icon: "Users" },
      { label: "Attendance", href: "/attendance", icon: "CalendarCheck2" },
      { label: "Payroll", href: "/payroll", icon: "Wallet" },
      { label: "Employees", href: "/employees", icon: "IdCard" },
      { label: "Contractors", href: "/contractors", icon: "HardHat" },
    ],
  },
  {
    section: "Commercial",
    items: [
      { label: "Vendors", href: "/vendors", icon: "Store" },
      { label: "Customers", href: "/customers", icon: "UserSquare2" },
      { label: "CRM", href: "/crm", icon: "Handshake" },
      { label: "Leads", href: "/leads", icon: "Target" },
<<<<<<< HEAD
      { label: "Real Estate Sales", href: "/real-estate-sales", icon: "Home" },
      { label: "Finance & Tax", href: "/finance", icon: "Coins" },
=======
>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
      { label: "Quotations", href: "/quotations", icon: "FileSignature" },
      { label: "Invoices", href: "/invoices", icon: "Receipt", badge: 2 },
      { label: "Expenses", href: "/expenses", icon: "ReceiptText" },
      { label: "Budget", href: "/budget", icon: "PiggyBank" },
      { label: "BOQ", href: "/boq", icon: "FileSpreadsheet" },
      { label: "Tender Management", href: "/tenders", icon: "Gavel" },
    ],
  },
  {
    section: "Compliance & Docs",
    items: [
      { label: "Documents", href: "/documents", icon: "FolderOpen" },
      { label: "Drawing Viewer", href: "/drawings", icon: "Layers" },
      { label: "Safety", href: "/safety", icon: "ShieldCheck" },
      { label: "Quality Inspection", href: "/quality", icon: "BadgeCheck" },
      { label: "Site Issues", href: "/site-issues", icon: "AlertTriangle" },
    ],
  },
  {
    section: "Workspace",
    items: [
<<<<<<< HEAD
      { label: "Customer Portal", href: "/customer-portal", icon: "UserCheck" },
=======
>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
      { label: "Notifications", href: "/notifications", icon: "Bell" },
      { label: "Messages", href: "/messages", icon: "MessageSquare" },
      { label: "Settings", href: "/settings", icon: "Settings" },
      { label: "Company Profile", href: "/company-profile", icon: "Building" },
      { label: "User Management", href: "/user-management", icon: "Users2" },
      { label: "Audit Logs", href: "/audit-logs", icon: "History" },
      { label: "Help Center", href: "/help", icon: "LifeBuoy" },
    ],
  },
];
