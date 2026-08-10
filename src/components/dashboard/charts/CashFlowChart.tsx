import { ApexOptions } from "apexcharts";
import { Card, CardHeader } from "@/components/ui/Card";
import { cashFlowSeries, months } from "@/lib/mockData";
import Chart from "react-apexcharts";

export default function CashFlowChart() {
  const options: ApexOptions = {
    chart: { toolbar: { show: false }, fontFamily: "var(--font-inter)", stacked: false },
    colors: ["#16A34A", "#E5484D"],
    plotOptions: { bar: { columnWidth: "55%", borderRadius: 4 } },
    dataLabels: { enabled: false },
    grid: { borderColor: "rgba(107,114,128,0.12)", strokeDashArray: 4 },
    xaxis: {
      categories: months,
      labels: { style: { colors: "#9AA1AC", fontSize: "11px" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: "#9AA1AC", fontSize: "11px" },
        formatter: (v) => `₹${v}Cr`,
      },
    },
    legend: { position: "top", horizontalAlign: "right", fontSize: "12px", labels: { colors: "#6B7280" } },
    tooltip: { theme: "light" },
  };

  return (
    <Card>
      <CardHeader title="Cash Flow" subtitle="Monthly inflow vs outflow, in ₹ crore" />
      <Chart options={options} series={cashFlowSeries} type="bar" height={300} />
    </Card>
  );
}
