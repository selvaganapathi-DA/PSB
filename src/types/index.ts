export type ProjectStatus =
  | "Planning"
  | "Running"
  | "On Hold"
  | "Delayed"
  | "Completed";

export interface Project {
  id: string;
  code: string;
  name: string;
  client: string;
  location: string;
  status: ProjectStatus;
  progress: number; // 0-100
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  manager: string;
  managerAvatar: string;
  thumbnail: string;
  riskLevel: "Low" | "Medium" | "High";
}

export interface Task {
  id: string;
  title: string;
  projectId: string;
  assignee: string;
  assigneeAvatar: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Backlog" | "To Do" | "In Progress" | "Review" | "Done";
  dueDate: string;
  tags: string[];
}

export interface Employee {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  site: string;
  status: "Present" | "Absent" | "On Leave";
  phone: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  status: "Active" | "Idle" | "Maintenance" | "Out of Service";
  site: string;
  utilization: number;
  lastServiceDate: string;
}

export interface Material {
  id: string;
  name: string;
  category: string;
  unit: string;
  stock: number;
  reorderLevel: number;
  warehouse: string;
  unitCost: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendor: string;
  project: string;
  amount: number;
  status: "Draft" | "Pending Approval" | "Approved" | "Delivered" | "Cancelled";
  date: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  project: string;
  amount: number;
  status: "Draft" | "Sent" | "Paid" | "Overdue";
  dueDate: string;
}

export interface ActivityItem {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  time: string;
  type: "task" | "document" | "payment" | "site" | "approval";
}

export interface KpiStat {
  label: string;
  value: string;
  delta: number;
  trend: "up" | "down";
  suffix?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  children?: NavItem[];
}

export interface NavSection {
  section: string;
  items: NavItem[];
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  value: number;
  status: "New" | "Contacted" | "Proposal" | "Negotiation" | "Won" | "Lost";
  source: string;
  assignedTo: string;
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  client: string;
  project: string;
  amount: number;
  status: "Draft" | "Sent" | "Approved" | "Rejected";
  date: string;
  validUntil: string;
}

export interface Budget {
  id: string;
  projectId: string;
  projectName: string;
  totalBudget: number;
  allocated: number;
  spent: number;
  categories: { name: string; allocated: number; spent: number }[];
}

export interface BoqItem {
  id: string;
  srNo: string;
  description: string;
  unit: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Boq {
  id: string;
  projectId: string;
  projectName: string;
  items: BoqItem[];
  totalAmount: number;
}

export interface Tender {
  id: string;
  tenderNumber: string;
  title: string;
  authority: string;
  value: number;
  submissionDate: string;
  status: "Open" | "Submitted" | "Awarded" | "Lost" | "Cancelled";
  bondAmount: number;
}

export interface DocumentFile {
  id: string;
  name: string;
  category: "Contract" | "Drawing" | "Safety" | "Quality" | "Invoice" | "Other";
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  url: string;
}

export interface Drawing {
  id: string;
  drawingNumber: string;
  title: string;
  version: string;
  projectId: string;
  discipline: "Architecture" | "Structural" | "MEP" | "HVAC" | "Civil";
  approved: boolean;
  uploadedAt: string;
}

export interface SafetyIncident {
  id: string;
  title: string;
  date: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "Reported" | "Investigating" | "Resolved";
  reportedBy: string;
  site: string;
}

export interface QualityChecklist {
  id: string;
  title: string;
  project: string;
  inspector: string;
  status: "Passed" | "Failed" | "Pending";
  date: string;
}

export interface SiteIssue {
  id: string;
  title: string;
  project: string;
  severity: "Minor" | "Major" | "Critical";
  status: "Open" | "In Progress" | "Resolved";
  assignedTo: string;
  dateRaised: string;
}

export interface Contractor {
  id: string;
  name: string;
  specialty: string;
  contactPerson: string;
  phone: string;
  email: string;
  activeWorkers: number;
  rating: number;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  rating: number;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  projectsActive: number;
}

export interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  status: "Present" | "Absent" | "On Leave" | "Half Day";
  checkIn?: string;
  checkOut?: string;
}

export interface Payroll {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: "Paid" | "Pending" | "On Hold";
}

export interface Vehicle {
  id: string;
  vehicleNumber: string;
  model: string;
  driver: string;
  status: "Active" | "Maintenance" | "Idle";
  currentLocation: string;
  fuelLevel: number;
}

