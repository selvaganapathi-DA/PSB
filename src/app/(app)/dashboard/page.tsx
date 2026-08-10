import KpiRow from "@/components/dashboard/KpiRow";
import ProgressChart from "@/components/dashboard/charts/ProgressChart";
import CashFlowChart from "@/components/dashboard/charts/CashFlowChart";
import MaterialStockChart from "@/components/dashboard/charts/MaterialStockChart";
import ProjectProgressList from "@/components/dashboard/widgets/ProjectProgressList";
import RecentActivity from "@/components/dashboard/widgets/RecentActivity";
import UpcomingTasks from "@/components/dashboard/widgets/UpcomingTasks";
import EquipmentStatus from "@/components/dashboard/widgets/EquipmentStatus";
import LabourAttendance from "@/components/dashboard/widgets/LabourAttendance";
import WeatherWidget from "@/components/dashboard/widgets/WeatherWidget";
import PurchaseOrdersWidget from "@/components/dashboard/widgets/PurchaseOrdersWidget";
import ProjectMapWidget from "@/components/dashboard/widgets/ProjectMapWidget";

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
<<<<<<< HEAD
          Hello! PSB
=======
          Good morning, Arjun 👋
>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
        </h1>
        <p className="mt-1 text-[13px] text-concrete-300">
          Here&apos;s what&apos;s happening across your 6 active sites today.
        </p>
      </div>

      <KpiRow />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ProgressChart />
        </div>
        <WeatherWidget />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
        <CashFlowChart />
        <MaterialStockChart />
        <ProjectMapWidget />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <ProjectProgressList />
        </div>
        <div className="xl:col-span-1">
          <UpcomingTasks />
        </div>
        <div className="xl:col-span-1">
          <RecentActivity />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <LabourAttendance />
        <EquipmentStatus />
        <PurchaseOrdersWidget />
      </div>
    </div>
  );
}
