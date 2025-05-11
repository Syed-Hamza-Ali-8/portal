"use client";

import { useState, useRef, useEffect } from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";
import { Sidebar } from "@/app/components/SideBar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function VolunteerLightingUsage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [emails, setEmails] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [collapsed, setCollapsed] = useState(false);
  const chartRef = useRef<ChartJS<"line">>(null);

  const volunteers = [
    { name: "UMER", email: "umer@gmail.com", status: "Active" },
    { name: "Muhammad Jibran", email: "mjr@gmail.com", status: "Active" },
    { name: "HAMZA", email: "hamza@gmail.com", status: "Active" },
    { name: "Miss Maliha", email: "ali@gmail.com", status: "Active" },
  ];

  const filteredVolunteers = volunteers
    .filter((volunteer) =>
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const getGradient = (ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(251, 146, 60, 0.4)");
    gradient.addColorStop(1, "rgba(251, 146, 60, 0.1)");
    return gradient;
  };

  // Chart data configuration
  const chartData = {
    labels: ["00-02", "00-03", "00-04", "00-05", "00-06", "00-07"],
    datasets: [
      {
        type: "line" as const,
        label: "Usage",
        data: [80, 60, 40, 30, 0, 0],
        borderColor: "#FB923C",
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return "rgba(251, 146, 60, 0.2)";
          return getGradient(ctx);
        },
        borderWidth: 3,
        tension: 0.4, 
        pointBackgroundColor: "#FB923C",
        pointBorderColor: "#fff",
        pointRadius: 5,
        pointHoverRadius: 8,
        fill: true,
      },
    ],
  };

  // Chart options configuration
  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(31, 41, 55, 0.9)",
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: (context: any) => `Usage: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 12,
          },
        },
      },
      y: {
        display: false,
        beginAtZero: true,
        max: 100,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  const valueLabelPlugin = {
    id: "valueLabel",
    afterDatasetsDraw(chart: any) {
      const { ctx } = chart;
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillStyle = "#1F2937";

      chart.data.datasets.forEach((dataset: any) => {
        chart.getDatasetMeta(0).data.forEach((point: any, index: number) => {
          const value = dataset.data[index];
          if (value > 0) {
            ctx.fillText(value.toString(), point.x, point.y - 10);
          }
        });
      });
    },
  };

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 ring-2 ring-orange-400">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                VOLUNTEER LIGHTING USAGE AT CRAFT ORCHARD
              </h1>
              <div className="flex items-center mt-2">
                <span className="text-3xl font-bold text-gray-800">23,456</span>
                <span className="ml-2 text-orange-500 font-medium">+12%</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">USAGES:</h2>
            <div className="h-64 relative">
              <Chart
                ref={chartRef}
                type="line"
                data={chartData}
                options={chartOptions}
                plugins={[valueLabelPlugin]}
              />
            </div>
            <div className="flex justify-between mt-4 text-sm text-gray-600">
              <span>Date</span>
              <span>Last 7 days</span>
              <span>Difficult date</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex flex-wrap sm:flex-nowrap justify-between sm:items-center mb-4">
              <div className="flex items-center mb-4 sm:mb-0 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Emails, comma separated"
                  className="border rounded px-3 py-2 mr-4 flex-grow text-gray-800 focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all"
                  value={emails}
                  onChange={(e) => setEmails(e.target.value)}
                />
                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors ring-2 ring-orange-400">
                  Invite
                </button>
              </div>

              <div className="flex flex-wrap items-center space-x-4 w-full sm:w-auto">
                <div className="text-sm font-medium text-gray-800">
                  SORT BY:
                  <select
                    className="ml-2 border rounded px-2 py-1 text-gray-800 bg-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    value={sortOrder}
                    onChange={(e) =>
                      setSortOrder(e.target.value as "newest" | "oldest")
                    }
                  >
                    <option value="newest">NEWEST ↓</option>
                    <option value="oldest">OLDEST ↑</option>
                  </select>
                </div>
                <div className="relative w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="SEARCH HERE"
                    className="border rounded px-3 py-1 pl-8 text-gray-800 focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Volunteers Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    NAME
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    EMAIL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    STATUS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVolunteers.map((volunteer, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {volunteer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {volunteer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                        {volunteer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      <button className="text-red-500 hover:text-red-700 transition-colors">
                        REMOVE ↓
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
