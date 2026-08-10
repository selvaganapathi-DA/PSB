import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Providers } from "./app/providers";
import "./app/globals.css";

// Layout
import AppShellLayout from "./app/(app)/layout";

// Pages
import DashboardPage from "./app/(app)/dashboard/page";
import AnalyticsPage from "./app/(app)/analytics/page";
import ReportsPage from "./app/(app)/reports/page";
import ProjectsPage from "./app/(app)/projects/page";
import ProjectDetailPage from "./app/(app)/projects/[id]/page";
import TimelinePage from "./app/(app)/timeline/page";
import GanttPage from "./app/(app)/gantt/page";
import CalendarPage from "./app/(app)/calendar/page";
import TasksPage from "./app/(app)/tasks/page";
import KanbanPage from "./app/(app)/kanban/page";
import SiteReportsPage from "./app/(app)/site-reports/page";
import MaterialsPage from "./app/(app)/materials/page";
import InventoryPage from "./app/(app)/inventory/page";
import PurchaseRequestsPage from "./app/(app)/purchase-requests/page";
import PurchaseOrdersPage from "./app/(app)/purchase-orders/page";
import PurchaseOrderDetailPage from "./app/(app)/purchase-orders/[id]/page";
import WarehousePage from "./app/(app)/warehouse/page";
import EquipmentPage from "./app/(app)/equipment/page";
import AssetsPage from "./app/(app)/assets/page";
import VehicleTrackingPage from "./app/(app)/vehicle-tracking/page";
import LabourPage from "./app/(app)/labour/page";
import AttendancePage from "./app/(app)/attendance/page";
import PayrollPage from "./app/(app)/payroll/page";
import EmployeesPage from "./app/(app)/employees/page";
import ContractorsPage from "./app/(app)/contractors/page";
import VendorsPage from "./app/(app)/vendors/page";
import CustomersPage from "./app/(app)/customers/page";
import CRMPage from "./app/(app)/crm/page";
import LeadsPage from "./app/(app)/leads/page";
import QuotationsPage from "./app/(app)/quotations/page";
import InvoicesPage from "./app/(app)/invoices/page";
import ExpensesPage from "./app/(app)/expenses/page";
import BudgetPage from "./app/(app)/budget/page";
import BOQPage from "./app/(app)/boq/page";
import TendersPage from "./app/(app)/tenders/page";
import DocumentsPage from "./app/(app)/documents/page";
import DrawingsPage from "./app/(app)/drawings/page";
import SafetyPage from "./app/(app)/safety/page";
import QualityPage from "./app/(app)/quality/page";
import SiteIssuesPage from "./app/(app)/site-issues/page";
import NotificationsPage from "./app/(app)/notifications/page";
import MessagesPage from "./app/(app)/messages/page";
import SettingsPage from "./app/(app)/settings/page";
import CompanyProfilePage from "./app/(app)/company-profile/page";
import UserManagementPage from "./app/(app)/user-management/page";
import AuditLogsPage from "./app/(app)/audit-logs/page";
import HelpPage from "./app/(app)/help/page";
import SitemapPage from "./app/(app)/sitemap/page";

import PreConstructionPage from "./app/(app)/pre-construction/page";
import RealEstateSalesPage from "./app/(app)/real-estate-sales/page";
import FinancePage from "./app/(app)/finance/page";
import CustomerPortalPage from "./app/(app)/customer-portal/page";
import MobileSiteAppPage from "./app/(app)/mobile-site-app/page";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShellLayout />}>
            <Route path="/" element={<SitemapPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/gantt" element={<GanttPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/kanban" element={<KanbanPage />} />
            <Route path="/site-reports" element={<SiteReportsPage />} />
            <Route path="/materials" element={<MaterialsPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/purchase-requests" element={<PurchaseRequestsPage />} />
            <Route path="/purchase-orders" element={<PurchaseOrdersPage />} />
            <Route path="/purchase-orders/:id" element={<PurchaseOrderDetailPage />} />
            <Route path="/warehouse" element={<WarehousePage />} />
            <Route path="/equipment" element={<EquipmentPage />} />
            <Route path="/assets" element={<AssetsPage />} />
            <Route path="/vehicle-tracking" element={<VehicleTrackingPage />} />
            <Route path="/labour" element={<LabourPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/payroll" element={<PayrollPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/contractors" element={<ContractorsPage />} />
            <Route path="/vendors" element={<VendorsPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/crm" element={<CRMPage />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/quotations" element={<QuotationsPage />} />
            <Route path="/invoices" element={<InvoicesPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/boq" element={<BOQPage />} />
            <Route path="/tenders" element={<TendersPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/drawings" element={<DrawingsPage />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="/quality" element={<QualityPage />} />
            <Route path="/site-issues" element={<SiteIssuesPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/company-profile" element={<CompanyProfilePage />} />
            <Route path="/user-management" element={<UserManagementPage />} />
            <Route path="/audit-logs" element={<AuditLogsPage />} />
            <Route path="/help" element={<HelpPage />} />
            
            {/* New Construction ERP Lifecycle Pages */}
            <Route path="/pre-construction" element={<PreConstructionPage />} />
            <Route path="/real-estate-sales" element={<RealEstateSalesPage />} />
            <Route path="/finance" element={<FinancePage />} />
            <Route path="/customer-portal" element={<CustomerPortalPage />} />
            <Route path="/mobile-site-app" element={<MobileSiteAppPage />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  </React.StrictMode>
);
