import {
  LayoutDashboard, BarChart3, FileBarChart, Building2, GanttChartSquare,
  AlignHorizontalDistributeCenter, CalendarDays, ListChecks, Kanban,
  ClipboardList, Boxes, Warehouse, FileInput, FileText, Package, Truck,
  HardHat, MapPinned, Users, CalendarCheck2, Wallet, IdCard, Store,
  UserSquare2, Handshake, Target, FileSignature, Receipt, ReceiptText,
  PiggyBank, FileSpreadsheet, Gavel, FolderOpen, Layers, ShieldCheck,
  BadgeCheck, AlertTriangle, Bell, MessageSquare, Settings, Building,
  Users2, History, LifeBuoy, type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard, BarChart3, FileBarChart, Building2, GanttChartSquare,
  AlignHorizontalDistributeCenter, CalendarDays, ListChecks, Kanban,
  ClipboardList, Boxes, Warehouse, FileInput, FileText, Package, Truck,
  HardHat, MapPinned, Users, CalendarCheck2, Wallet, IdCard, Store,
  UserSquare2, Handshake, Target, FileSignature, Receipt, ReceiptText,
  PiggyBank, FileSpreadsheet, Gavel, FolderOpen, Layers, ShieldCheck,
  BadgeCheck, AlertTriangle, Bell, MessageSquare, Settings, Building,
  Users2, History, LifeBuoy,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? LayoutDashboard;
}
