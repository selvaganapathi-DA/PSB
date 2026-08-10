import {
  ActivityItem,
  Employee,
  Equipment,
  Invoice,
  KpiStat,
  Material,
  Project,
  PurchaseOrder,
  Task,
  Lead,
  Quotation,
  Budget,
  Boq,
  Tender,
  DocumentFile,
  Drawing,
  SafetyIncident,
  QualityChecklist,
  SiteIssue,
  Contractor,
  Vendor,
  Customer,
  Attendance,
  Payroll,
  Vehicle,
} from "@/types";

export const projects: Project[] = [
  {
    id: "p1",
    code: "PRJ-2201",
    name: "Skyline Business Tower",
    client: "Meridian Realty Group",
    location: "Chennai, TN",
    status: "Running",
    progress: 68,
    budget: 42000000,
    spent: 27650000,
    startDate: "2025-02-10",
    endDate: "2026-11-30",
    manager: "PSB",
    managerAvatar: "PSB",
    thumbnail: "tower",
    riskLevel: "Medium",
  },
  {
    id: "p2",
    code: "PRJ-2214",
    name: "Riverside Residency Phase 2",
    client: "Ganga Housing Pvt Ltd",
    location: "Salem, TN",
    status: "Running",
    progress: 41,
    budget: 18500000,
    spent: 7955000,
    startDate: "2025-06-01",
    endDate: "2026-09-15",
    manager: "Priya Ramachandran",
    managerAvatar: "PR",
    thumbnail: "residency",
    riskLevel: "Low",
  },
  {
    id: "p3",
    code: "PRJ-2189",
    name: "Dharmapuri Highway Overpass",
    client: "TN State PWD",
    location: "Dharmapuri, TN",
    status: "Delayed",
    progress: 22,
    budget: 96000000,
    spent: 31200000,
    startDate: "2024-11-15",
    endDate: "2026-03-01",
    manager: "Suresh Kumar",
    managerAvatar: "SK",
    thumbnail: "highway",
    riskLevel: "High",
  },
  {
    id: "p4",
    code: "PRJ-2233",
    name: "GreenLeaf IT Park",
    client: "Kovai Infotech",
    location: "Coimbatore, TN",
    status: "Planning",
    progress: 6,
    budget: 61000000,
    spent: 1450000,
    startDate: "2026-05-01",
    endDate: "2028-01-31",
    manager: "Divya Shankar",
    managerAvatar: "DS",
    thumbnail: "itpark",
    riskLevel: "Low",
  },
  {
    id: "p5",
    code: "PRJ-2140",
    name: "Anna Nagar Metro Depot",
    client: "TN Metro Rail Ltd",
    location: "Chennai, TN",
    status: "Completed",
    progress: 100,
    budget: 128000000,
    spent: 124300000,
    startDate: "2023-01-05",
    endDate: "2026-01-20",
    manager: "PSB",
    managerAvatar: "PSB",
    thumbnail: "metro",
    riskLevel: "Low",
  },
  {
    id: "p6",
    code: "PRJ-2247",
    name: "Coastal Warehouse Complex",
    client: "Bharat Logistics",
    location: "Cuddalore, TN",
    status: "On Hold",
    progress: 34,
    budget: 22000000,
    spent: 8100000,
    startDate: "2025-08-20",
    endDate: "2026-12-10",
    manager: "Priya Ramachandran",
    managerAvatar: "PR",
    thumbnail: "warehouse",
    riskLevel: "Medium",
  },
];

export const tasks: Task[] = [
  { id: "t1", title: "Pour foundation slab - Block C", projectId: "p1", assignee: "Ravi Shankar", assigneeAvatar: "RS", priority: "High", status: "In Progress", dueDate: "2026-07-12", tags: ["Civil", "Slab"] },
  { id: "t2", title: "Approve structural steel BOQ revision", projectId: "p1", assignee: "PSB", assigneeAvatar: "PSB", priority: "Urgent", status: "Review", dueDate: "2026-07-09", tags: ["BOQ"] },
  { id: "t3", title: "Site safety audit - Tower B", projectId: "p1", assignee: "Kavitha Iyer", assigneeAvatar: "KI", priority: "Medium", status: "To Do", dueDate: "2026-07-15", tags: ["Safety"] },
  { id: "t4", title: "Order cement - 400 bags", projectId: "p2", assignee: "Manoj Pillai", assigneeAvatar: "MP", priority: "High", status: "Done", dueDate: "2026-07-05", tags: ["Procurement"] },
  { id: "t5", title: "Electrical conduit layout review", projectId: "p2", assignee: "Priya Ramachandran", assigneeAvatar: "PR", priority: "Medium", status: "In Progress", dueDate: "2026-07-18", tags: ["MEP"] },
  { id: "t6", title: "Resolve drainage clash - Pier 4", projectId: "p3", assignee: "Suresh Kumar", assigneeAvatar: "SK", priority: "Urgent", status: "Backlog", dueDate: "2026-07-11", tags: ["Design"] },
  { id: "t7", title: "Vendor quotation - aggregate supply", projectId: "p4", assignee: "Divya Shankar", assigneeAvatar: "DS", priority: "Low", status: "To Do", dueDate: "2026-07-22", tags: ["Procurement"] },
  { id: "t8", title: "Update Gantt for piling sequence", projectId: "p3", assignee: "Suresh Kumar", assigneeAvatar: "SK", priority: "High", status: "In Progress", dueDate: "2026-07-10", tags: ["Planning"] },
];

export const employees: Employee[] = [
  { id: "e1", name: "Ravi Shankar", avatar: "RS", role: "Site Supervisor", department: "Civil", site: "Skyline Business Tower", status: "Present", phone: "+91 98765 41100" },
  { id: "e2", name: "Kavitha Iyer", avatar: "KI", role: "Safety Officer", department: "HSE", site: "Skyline Business Tower", status: "Present", phone: "+91 98765 41101" },
  { id: "e3", name: "Manoj Pillai", avatar: "MP", role: "Procurement Lead", department: "Procurement", site: "Riverside Residency", status: "On Leave", phone: "+91 98765 41102" },
  { id: "e4", name: "Lakshmi Narayanan", avatar: "LN", role: "Electrician", department: "MEP", site: "Riverside Residency", status: "Present", phone: "+91 98765 41103" },
  { id: "e5", name: "Vignesh Babu", avatar: "VB", role: "Crane Operator", department: "Equipment", site: "Dharmapuri Highway Overpass", status: "Absent", phone: "+91 98765 41104" },
  { id: "e6", name: "Deepa Suresh", avatar: "DS", role: "Quantity Surveyor", department: "Estimation", site: "GreenLeaf IT Park", status: "Present", phone: "+91 98765 41105" },
];

export const equipmentList: Equipment[] = [
  { id: "eq1", name: "Tower Crane TC-14", type: "Crane", status: "Active", site: "Skyline Business Tower", utilization: 87, lastServiceDate: "2026-06-20" },
  { id: "eq2", name: "Concrete Pump CP-06", type: "Pump", status: "Active", site: "Riverside Residency", utilization: 64, lastServiceDate: "2026-06-11" },
  { id: "eq3", name: "Excavator EX-22", type: "Excavator", status: "Maintenance", site: "Dharmapuri Highway Overpass", utilization: 0, lastServiceDate: "2026-07-02" },
  { id: "eq4", name: "Backhoe Loader BL-09", type: "Loader", status: "Idle", site: "Coastal Warehouse Complex", utilization: 12, lastServiceDate: "2026-05-30" },
  { id: "eq5", name: "Batching Plant BP-02", type: "Plant", status: "Active", site: "Skyline Business Tower", utilization: 91, lastServiceDate: "2026-06-27" },
];

export const materials: Material[] = [
  { id: "m1", name: "OPC 53 Grade Cement", category: "Cement", unit: "Bags", stock: 1240, reorderLevel: 500, warehouse: "Chennai Central Yard", unitCost: 385 },
  { id: "m2", name: "TMT Steel Bar 12mm", category: "Steel", unit: "Tons", stock: 38, reorderLevel: 25, warehouse: "Chennai Central Yard", unitCost: 64500 },
  { id: "m3", name: "River Sand", category: "Aggregate", unit: "Cu.m", stock: 210, reorderLevel: 150, warehouse: "Salem Yard", unitCost: 1850 },
  { id: "m4", name: "20mm Blue Metal", category: "Aggregate", unit: "Cu.m", stock: 95, reorderLevel: 120, warehouse: "Salem Yard", unitCost: 1450 },
  { id: "m5", name: "Red Clay Bricks", category: "Masonry", unit: "Nos", stock: 48000, reorderLevel: 20000, warehouse: "Dharmapuri Yard", unitCost: 8.5 },
];

export const purchaseOrders: PurchaseOrder[] = [
  { id: "po1", poNumber: "PO-3391", vendor: "Sri Balaji Steel Traders", project: "Skyline Business Tower", amount: 2480000, status: "Approved", date: "2026-07-02" },
  { id: "po2", poNumber: "PO-3392", vendor: "Kaveri Cement Depot", project: "Riverside Residency Phase 2", amount: 462000, status: "Delivered", date: "2026-06-29" },
  { id: "po3", poNumber: "PO-3393", vendor: "TN Aggregates Co.", project: "Dharmapuri Highway Overpass", amount: 815000, status: "Pending Approval", date: "2026-07-05" },
  { id: "po4", poNumber: "PO-3394", vendor: "Anna Electricals", project: "GreenLeaf IT Park", amount: 128000, status: "Draft", date: "2026-07-07" },
];

export const invoices: Invoice[] = [
  { id: "inv1", invoiceNumber: "INV-9021", client: "Meridian Realty Group", project: "Skyline Business Tower", amount: 5200000, status: "Paid", dueDate: "2026-06-15" },
  { id: "inv2", invoiceNumber: "INV-9022", client: "Ganga Housing Pvt Ltd", project: "Riverside Residency Phase 2", amount: 1850000, status: "Sent", dueDate: "2026-07-20" },
  { id: "inv3", invoiceNumber: "INV-9023", client: "TN State PWD", project: "Dharmapuri Highway Overpass", amount: 6400000, status: "Overdue", dueDate: "2026-06-30" },
  { id: "inv4", invoiceNumber: "INV-9024", client: "Kovai Infotech", project: "GreenLeaf IT Park", amount: 940000, status: "Draft", dueDate: "2026-08-01" },
];

export const recentActivity: ActivityItem[] = [
  { id: "a1", user: "PSB", avatar: "PSB", action: "approved BOQ revision for", target: "Skyline Business Tower", time: "12 min ago", type: "approval" },
  { id: "a2", user: "Kavitha Iyer", avatar: "KI", action: "filed a safety inspection report on", target: "Tower B", time: "48 min ago", type: "site" },
  { id: "a3", user: "Manoj Pillai", avatar: "MP", action: "raised purchase order", target: "PO-3394", time: "1 hr ago", type: "document" },
  { id: "a4", user: "System", avatar: "SY", action: "recorded payment received against", target: "INV-9021", time: "2 hr ago", type: "payment" },
  { id: "a5", user: "Suresh Kumar", avatar: "SK", action: "updated task status on", target: "Pier 4 drainage clash", time: "3 hr ago", type: "task" },
  { id: "a6", user: "Deepa Suresh", avatar: "DS", action: "uploaded revised drawing for", target: "GreenLeaf IT Park", time: "5 hr ago", type: "document" },
];

export const kpis: KpiStat[] = [
  { label: "Total Projects", value: "24", delta: 8.3, trend: "up" },
  { label: "Running Projects", value: "16", delta: 4.1, trend: "up" },
  { label: "Revenue (YTD)", value: "₹18.4Cr", delta: 12.6, trend: "up" },
  { label: "Pending Payments", value: "₹2.9Cr", delta: -3.2, trend: "down" },
];

export const projectProgressSeries = [
  { name: "Planned", data: [10, 22, 34, 45, 55, 63, 72, 80, 86, 92, 96, 100] },
  { name: "Actual", data: [8, 18, 27, 36, 44, 52, 58, 63, 66, 68, 0, 0] },
];

export const cashFlowSeries = [
  { name: "Inflow", data: [3.2, 4.1, 3.8, 5.4, 4.9, 6.1, 5.8, 6.6, 7.0, 6.4, 7.3, 7.8] },
  { name: "Outflow", data: [2.6, 3.3, 3.1, 4.0, 3.9, 4.6, 4.4, 5.0, 5.2, 4.9, 5.5, 5.9] },
];

export const materialStockDistribution = [
  { label: "Cement", value: 32 },
  { label: "Steel", value: 24 },
  { label: "Aggregate", value: 18 },
  { label: "Masonry", value: 16 },
  { label: "Others", value: 10 },
];

export const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const leads: Lead[] = [
  { id: "l1", name: "Sanjay Kumar", company: "SK Builders", email: "sanjay@skbuilders.in", phone: "+91 94440 12345", value: 45000000, status: "Negotiation", source: "Website Direct", assignedTo: "Divya Shankar" },
  { id: "l2", name: "Meera Krishnan", company: "South Infra Projects", email: "meera@southinfra.co.in", phone: "+91 94441 54321", value: 120000000, status: "Proposal", source: "Referral", assignedTo: "PSB" },
  { id: "l3", name: "Anand Raj", company: "Raj Promoters", email: "anand@rajpromoters.com", phone: "+91 98402 98765", value: 30000000, status: "New", source: "Tender Portal", assignedTo: "Priya Ramachandran" },
  { id: "l4", name: "Ganesh Prasad", company: "GP Foundations", email: "contact@gpfoundations.in", phone: "+91 99620 55555", value: 15000000, status: "Won", source: "Cold Call", assignedTo: "Divya Shankar" },
];

export const quotations: Quotation[] = [
  { id: "q1", quoteNumber: "QT-2026-001", client: "Meridian Realty Group", project: "Skyline Business Tower", amount: 15400000, status: "Approved", date: "2026-01-15", validUntil: "2026-04-15" },
  { id: "q2", quoteNumber: "QT-2026-002", client: "Ganga Housing Pvt Ltd", project: "Riverside Residency Phase 2", amount: 8900000, status: "Sent", date: "2026-06-10", validUntil: "2026-09-10" },
  { id: "q3", quoteNumber: "QT-2026-003", client: "TN State PWD", project: "Dharmapuri Highway Overpass", amount: 48000000, status: "Rejected", date: "2025-10-05", validUntil: "2026-01-05" },
  { id: "q4", quoteNumber: "QT-2026-004", client: "Kovai Infotech", project: "GreenLeaf IT Park", amount: 32000000, status: "Draft", date: "2026-07-01", validUntil: "2026-10-01" },
];

export const budgets: Budget[] = [
  {
    id: "b1",
    projectId: "p1",
    projectName: "Skyline Business Tower",
    totalBudget: 42000000,
    allocated: 35000000,
    spent: 27650000,
    categories: [
      { name: "Civil Works", allocated: 20000000, spent: 17200000 },
      { name: "MEP Services", allocated: 8000000, spent: 5400000 },
      { name: "Finishes & Interior", allocated: 5000000, spent: 3800000 },
      { name: "Equipment & Logistics", allocated: 2000000, spent: 1250000 },
    ],
  },
  {
    id: "b2",
    projectId: "p2",
    projectName: "Riverside Residency Phase 2",
    totalBudget: 18500000,
    allocated: 15000000,
    spent: 7955000,
    categories: [
      { name: "Civil Works", allocated: 10000000, spent: 5800000 },
      { name: "MEP Services", allocated: 3000000, spent: 1200000 },
      { name: "Finishes", allocated: 2000000, spent: 955000 },
    ],
  },
];

export const boqs: Boq[] = [
  {
    id: "boq1",
    projectId: "p1",
    projectName: "Skyline Business Tower",
    totalAmount: 12450000,
    items: [
      { id: "bi1", srNo: "1.1", description: "Excavation in all types of soil up to 3m depth", unit: "Cu.m", quantity: 1500, rate: 250, amount: 375000 },
      { id: "bi2", srNo: "1.2", description: "Providing and laying PCC M15 grade concrete for foundation", unit: "Cu.m", quantity: 240, rate: 4800, amount: 1152000 },
      { id: "bi3", srNo: "1.3", description: "Providing and laying RCC M25 grade concrete in columns/slabs", unit: "Cu.m", quantity: 1200, rate: 6800, amount: 8160000 },
      { id: "bi4", srNo: "1.4", description: "Supplying and placing Fe500 TMT reinforcement bars", unit: "Tons", quantity: 42, rate: 65000, amount: 2730000 },
    ],
  },
];

export const tenders: Tender[] = [
  { id: "tnd1", tenderNumber: "TND-TN-2026-88", title: "Construction of Multi-Storey Parking - Madurai", authority: "Madurai Corporation", value: 180000000, submissionDate: "2026-08-15", status: "Open", bondAmount: 1800000 },
  { id: "tnd2", tenderNumber: "TND-TN-2026-45", title: "Bridge reconstruction over Noyyal River", authority: "Coimbatore Municipal Corp", value: 75000000, submissionDate: "2026-07-22", status: "Submitted", bondAmount: 750000 },
  { id: "tnd3", tenderNumber: "TND-TN-2025-12", title: "PWD Government Office Complex - Trichy", authority: "Tamil Nadu PWD", value: 110000000, submissionDate: "2025-12-05", status: "Awarded", bondAmount: 1100000 },
  { id: "tnd4", tenderNumber: "TND-TN-2026-09", title: "Ring Road Expansion Phase 3 - Hosur", authority: "NHAI Southern Region", value: 320000000, submissionDate: "2026-05-18", status: "Lost", bondAmount: 3200000 },
];

export const documents: DocumentFile[] = [
  { id: "d1", name: "Meridian_Contract_Signed.pdf", category: "Contract", size: "2.4 MB", uploadedBy: "PSB", uploadedAt: "2025-02-12 14:30", url: "#" },
  { id: "d2", name: "Foundation_Layout_Rev3.dwg", category: "Drawing", size: "14.8 MB", uploadedBy: "Deepa Suresh", uploadedAt: "2026-05-10 10:15", url: "#" },
  { id: "d3", name: "HSE_Safety_Guidelines_V1.pdf", category: "Safety", size: "850 KB", uploadedBy: "Kavitha Iyer", uploadedAt: "2025-03-01 09:00", url: "#" },
  { id: "d4", name: "Cement_Quality_Test_Report.pdf", category: "Quality", size: "1.2 MB", uploadedBy: "Ravi Shankar", uploadedAt: "2026-07-02 16:45", url: "#" },
];

export const drawings: Drawing[] = [
  { id: "dr1", drawingNumber: "ARC-01-100", title: "Architectural Ground Floor Layout Plan", version: "R3", projectId: "p1", discipline: "Architecture", approved: true, uploadedAt: "2025-02-15" },
  { id: "dr2", drawingNumber: "STR-02-204", title: "Foundation Reinforcement Details", version: "R2", projectId: "p1", discipline: "Structural", approved: true, uploadedAt: "2025-02-28" },
  { id: "dr3", drawingNumber: "MEP-04-012", title: "Electrical Conduits and Cable Routing", version: "R1", projectId: "p2", discipline: "MEP", approved: false, uploadedAt: "2026-06-15" },
  { id: "dr4", drawingNumber: "CIV-03-080", title: "Site Drainage & Slope Profiling", version: "R4", projectId: "p3", discipline: "Civil", approved: true, uploadedAt: "2025-01-10" },
];

export const safetyIncidents: SafetyIncident[] = [
  { id: "si1", title: "Scaffolding misalignment reported", date: "2026-07-02", severity: "Medium", status: "Resolved", reportedBy: "Kavitha Iyer", site: "Skyline Business Tower" },
  { id: "si2", title: "Near miss: Crane hook swing clearance", date: "2026-07-06", severity: "High", status: "Investigating", reportedBy: "Ravi Shankar", site: "Skyline Business Tower" },
  { id: "si3", title: "Excavation perimeter missing barricades", date: "2026-07-07", severity: "Critical", status: "Reported", reportedBy: "Kavitha Iyer", site: "Riverside Residency Phase 2" },
];

export const qualityChecklists: QualityChecklist[] = [
  { id: "qc1", title: "Concrete Pouring Pre-check (M25 Slab)", project: "Skyline Business Tower", inspector: "Ravi Shankar", status: "Passed", date: "2026-07-01" },
  { id: "qc2", title: "Reinforcement Steel Spacing Verification", project: "Riverside Residency Phase 2", inspector: "Deepa Suresh", status: "Failed", date: "2026-07-05" },
  { id: "qc3", title: "Plumbing Pressure Leakage Test", project: "Dharmapuri Highway Overpass", inspector: "Suresh Kumar", status: "Pending", date: "2026-07-07" },
];

export const siteIssues: SiteIssue[] = [
  { id: "iss1", title: "Delay in aggregate delivery (Salem Yard)", project: "Riverside Residency Phase 2", severity: "Major", status: "In Progress", assignedTo: "Manoj Pillai", dateRaised: "2026-07-04" },
  { id: "iss2", title: "Drawing mismatch on Column C-12 layout", project: "Skyline Business Tower", severity: "Critical", status: "Open", assignedTo: "Deepa Suresh", dateRaised: "2026-07-07" },
  { id: "iss3", title: "Minor water logging near sub-station", project: "Coastal Warehouse Complex", severity: "Minor", status: "Resolved", assignedTo: "Ravi Shankar", dateRaised: "2026-06-28" },
];

export const contractors: Contractor[] = [
  { id: "c1", name: "Vanguard Foundations Ltd", specialty: "Piling & Earthworks", contactPerson: "Magesh Varadhan", phone: "+91 98410 77651", email: "magesh@vanguard.in", activeWorkers: 18, rating: 4.6 },
  { id: "c2", name: "Apex Electrical Services", specialty: "MEP Installations", contactPerson: "Karthik Raja", phone: "+91 97890 12340", email: "kraja@apexelectricals.co.in", activeWorkers: 12, rating: 4.2 },
  { id: "c3", name: "Tamil Nadu Brick & Masonry Co", specialty: "Brickwork & Finishes", contactPerson: "Shanmugam P", phone: "+91 99400 88210", email: "shanmugam@tnbrick.com", activeWorkers: 35, rating: 4.5 },
];

export const vendors: Vendor[] = [
  { id: "v1", name: "Sri Balaji Steel Traders", category: "Steel", contactPerson: "Sundaram Balaji", phone: "+91 98400 11223", email: "sales@balajisteel.in", rating: 4.8 },
  { id: "v2", name: "Kaveri Cement Depot", category: "Cement", contactPerson: "Govindasamy K", phone: "+91 94430 44556", email: "orders@kavericement.com", rating: 4.5 },
  { id: "v3", name: "TN Aggregates Co.", category: "Aggregate", contactPerson: "Velumani S", phone: "+91 90030 99887", email: "velu@tnaggregates.in", rating: 4.1 },
  { id: "v4", name: "Anna Electricals", category: "Electricals", contactPerson: "Anbarasan T", phone: "+91 98420 88776", email: "info@annaelectricals.in", rating: 4.3 },
];

export const customers: Customer[] = [
  { id: "cust1", name: "Meridian Realty Group", company: "Meridian Properties LLC", phone: "+91 44 2828 0000", email: "projects@meridianrealty.com", projectsActive: 2 },
  { id: "cust2", name: "Ganga Housing Pvt Ltd", company: "Ganga Group", phone: "+91 427 244 5566", email: "admin@gangahousing.com", projectsActive: 1 },
  { id: "cust3", name: "TN State PWD", company: "Government of Tamil Nadu", phone: "+91 44 2567 1234", email: "pwdse@tn.gov.in", projectsActive: 1 },
  { id: "cust4", name: "Kovai Infotech", company: "Kovai Infotech Parks", phone: "+91 422 455 9000", email: "infra@kovaiinfotech.com", projectsActive: 1 },
];

export const attendanceRecords: Attendance[] = [
  { id: "at1", employeeId: "e1", employeeName: "Ravi Shankar", date: "2026-07-08", status: "Present", checkIn: "08:15 AM", checkOut: "05:45 PM" },
  { id: "at2", employeeId: "e2", employeeName: "Kavitha Iyer", date: "2026-07-08", status: "Present", checkIn: "08:45 AM", checkOut: "06:00 PM" },
  { id: "at3", employeeId: "e3", employeeName: "Manoj Pillai", date: "2026-07-08", status: "On Leave" },
  { id: "at4", employeeId: "e4", employeeName: "Lakshmi Narayanan", date: "2026-07-08", status: "Present", checkIn: "08:00 AM", checkOut: "05:30 PM" },
  { id: "at5", employeeId: "e5", employeeName: "Vignesh Babu", date: "2026-07-08", status: "Absent" },
  { id: "at6", employeeId: "e6", employeeName: "Deepa Suresh", date: "2026-07-08", status: "Present", checkIn: "09:00 AM", checkOut: "05:00 PM" },
];

export const payrollRecords: Payroll[] = [
  { id: "pr1", employeeId: "e1", employeeName: "Ravi Shankar", month: "June 2026", basicSalary: 45000, allowances: 8500, deductions: 4500, netSalary: 49000, status: "Paid" },
  { id: "pr2", employeeId: "e2", employeeName: "Kavitha Iyer", month: "June 2026", basicSalary: 55000, allowances: 10000, deductions: 5500, netSalary: 59500, status: "Paid" },
  { id: "pr3", employeeId: "e3", employeeName: "Manoj Pillai", month: "June 2026", basicSalary: 60000, allowances: 9500, deductions: 6000, netSalary: 63500, status: "Pending" },
  { id: "pr4", employeeId: "e4", employeeName: "Lakshmi Narayanan", month: "June 2026", basicSalary: 30000, allowances: 5000, deductions: 3000, netSalary: 32000, status: "Paid" },
];

export const vehicles: Vehicle[] = [
  { id: "vhl1", vehicleNumber: "TN-07-BY-1234", model: "Tata Signa Tipper 2823.K", driver: "Durai Pandian", status: "Active", currentLocation: "Chennai Bypass Road", fuelLevel: 78 },
  { id: "vhl2", vehicleNumber: "TN-30-AW-5678", model: "Mahindra Bolero Pickup", driver: "Gokul Prasad", status: "Idle", currentLocation: "Salem Central Yard Yard", fuelLevel: 45 },
  { id: "vhl3", vehicleNumber: "TN-37-CZ-9012", model: "Ashok Leyland Ecomet", driver: "Sundararajan", status: "Maintenance", currentLocation: "Coimbatore Service Center", fuelLevel: 10 },
];

