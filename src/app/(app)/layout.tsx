import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Footer from "@/components/layout/Footer";
import { Outlet } from "react-router-dom";

export default function AppShellLayout() {
  return (
    <div className="flex min-h-screen bg-concrete-50 dark:bg-blueprint-900">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar />
        <Breadcrumbs />
        <main className="flex-1 px-4 py-5 sm:px-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
