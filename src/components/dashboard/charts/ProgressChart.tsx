import { ApexOptions } from "apexcharts";
import { Card, CardHeader } from "@/components/ui/Card";
import { projectProgressSeries, months } from "@/lib/mockData";
import Chart from "react-apexcharts";

export default function ProgressChart() {
  const options: ApexOptions = {
    chart: { toolbar: { show: false }, fontFamily: "var(--font-inter)" },
    colors: ["#5B85AC", "#FF6B35"],
    stroke: { curve: "smooth", width: [2, 3] },
    fill: {
      type: "gradient",
      gradient: { opacityFrom: 0.35, opacityTo: 0.02 },
    },
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
        formatter: (v) => `${v}%`,
      },
    },
    legend: { position: "top", horizontalAlign: "right", fontSize: "12px", labels: { colors: "#6B7280" } },
    tooltip: { theme: "light" },
  };

  const series = projectProgressSeries;

  return (
    <Card>
      <CardHeader
        title="Portfolio Progress"
        subtitle="Planned vs actual completion across all active projects"
      />
      <Chart options={options} series={series} type="area" height={300} />
    </Card>
  );
}
