import React from "react";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

interface GanttTask {
  name: string;
  start: string; // YYYY-MM-DD
  end: string;   // YYYY-MM-DD
  progress: number; // 0-100
}

interface GanttProps {
  tasks: GanttTask[];
}

export function Gantt({ tasks }: GanttProps) {
  // Map data to range bar series
  const series = [
    {
      data: tasks.map((task) => ({
        x: task.name,
        y: [new Date(task.start).getTime(), new Date(task.end).getTime()],
        fillColor: "#FF6B35", // signal orange
      })),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "rangeBar",
      height: 350,
      toolbar: { show: false },
      fontFamily: "var(--font-sans)",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "50%",
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: { colors: "#9AA1AC", fontSize: "11px" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#9AA1AC", fontSize: "12px", fontWeight: 600 },
      },
    },
    grid: {
      borderColor: "rgba(107,114,128,0.12)",
      strokeDashArray: 4,
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const item = tasks[dataPointIndex];
        return (
          '<div className="p-3 bg-white dark:bg-blueprint-850 border border-concrete-100 dark:border-white/5 rounded-xl shadow-lg text-[12px]">' +
          '<div className="font-semibold text-concrete-900 dark:text-blueprint-100">' +
          item.name +
          "</div>" +
          '<div className="text-concrete-300 mt-1">Duration: ' +
          item.start +
          " to " +
          item.end +
          "</div>" +
          '<div className="text-signal-orange font-medium mt-0.5">Progress: ' +
          item.progress +
          "%</div>" +
          "</div>"
        );
      },
    },
  };

  return (
    <div className="w-full">
      <Chart options={options} series={series} type="rangeBar" height={300} />
    </div>
  );
}
