import { ApexOptions } from "apexcharts";
import { Card, CardHeader } from "@/components/ui/Card";
import { materialStockDistribution } from "@/lib/mockData";
import Chart from "react-apexcharts";

export default function MaterialStockChart() {
  const options: ApexOptions = {
    chart: { fontFamily: "var(--font-inter)" },
    labels: materialStockDistribution.map((d) => d.label),
    colors: ["#163459", "#2C5C8F", "#5B85AC", "#FF6B35", "#B9CBDD"],
    legend: { position: "bottom", fontSize: "12px", labels: { colors: "#6B7280" } },
    dataLabels: { enabled: true, style: { fontSize: "11px" } },
    stroke: { width: 2, colors: ["#fff"] },
    plotOptions: {
      pie: {
        donut: {
          size: "68%",
          labels: {
            show: true,
            total: { show: true, label: "Stock Mix", fontSize: "12px" },
          },
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader title="Material Stock Mix" subtitle="Warehouse-wide category share" />
      <Chart
        options={options}
        series={materialStockDistribution.map((d) => d.value)}
        type="donut"
        height={300}
      />
    </Card>
  );
}
