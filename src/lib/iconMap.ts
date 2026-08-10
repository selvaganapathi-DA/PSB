import {
  LayoutDashboard, BarChart3, FileBarChart, Building2, GanttChartSquare,
  AlignHorizontalDistributeCenter, CalendarDays, ListChecks, Kanban,
  ClipboardList, Boxes, Warehouse, FileInput, FileText, Package, Truck,
  HardHat, MapPinned, Users, CalendarCheck2, Wallet, IdCard, Store,
  UserSquare2, Handshake, Target, FileSignature, Receipt, ReceiptText,
  PiggyBank, FileSpreadsheet, Gavel, FolderOpen, Layers, ShieldCheck,
  BadgeCheck, AlertTriangle, Bell, MessageSquare, Settings, Building,
<<<<<<< HEAD
  Users2, History, LifeBuoy, Coins, Compass, Home, Smartphone, UserCheck, type LucideIcon,
=======
  Users2, History, LifeBuoy, type LucideIcon,
>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard, BarChart3, FileBarChart, Building2, GanttChartSquare,
  AlignHorizontalDistributeCenter, CalendarDays, ListChecks, Kanban,
  ClipboardList, Boxes, Warehouse, FileInput, FileText, Package, Truck,
  HardHat, MapPinned, Users, CalendarCheck2, Wallet, IdCard, Store,
  UserSquare2, Handshake, Target, FileSignature, Receipt, ReceiptText,
  PiggyBank, FileSpreadsheet, Gavel, FolderOpen, Layers, ShieldCheck,
  BadgeCheck, AlertTriangle, Bell, MessageSquare, Settings, Building,
<<<<<<< HEAD
  Users2, History, LifeBuoy, Coins, Compass, Home, Smartphone, UserCheck,
=======
  Users2, History, LifeBuoy,
>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? LayoutDashboard;
}
