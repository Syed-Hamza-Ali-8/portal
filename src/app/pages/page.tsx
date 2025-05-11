"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Bell } from "lucide-react";
import { Sidebar } from "../components/SideBar";

const data = [
  { name: "Jan", uv: 850 },
  { name: "Feb", uv: 900 },
  { name: "Mar", uv: 1100 },
  { name: "Apr", uv: 920 },
  { name: "May", uv: 990 },
  { name: "Jun", uv: 870 },
  { name: "Jul", uv: 1050 },
];

export default function Dashboard() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sidebar for small screens */}
      <div className="lg:flex">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 bg-gray-100 p-6 text-gray-700 transition-all duration-300 ${
          collapsed ? "lg:ml-[80px]" : "lg:ml-[250px]"
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
        <h1 className="text-[32px] font-semibold text-[#1A1A1A] max-sm:text-2xl">
            TRUSTEE DASHBOARD - COMBINE FOUNDATION
          </h1>
          <div className="flex items-center gap-4">
            <Bell className="text-black" />
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => router.push("/pages/profile")}
            />
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-orange-500 text-white p-6 rounded-xl">
            <p className="text-3xl font-bold">1,250</p>
            <p>Volunteers this month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              Number of Programs
            </h2>
            <div className="space-y-2">
              <ProgramStatus label="Program A" />
              <ProgramStatus label="Program B" status="In Progress" />
              <ProgramStatus label="Program C" status="Upcoming" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              Comparison of Boys and Girls
            </h2>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-bold text-orange-500">1,200</p>
                <p>Total boys benefited</p>
              </div>
              <div>
                <p className="font-bold">1,000</p>
                <p>Total girls benefited</p>
              </div>
            </div>
          </div>
        </div>

        {/* Graphs & Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Monthly Volunteers Chart */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Monthly Volunteers
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="uv" fill="#F97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Number of Beneficiaries */}
          <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-700">
                Number of Beneficiaries
              </h2>
              <p className="text-3xl font-bold text-gray-700">3,254</p>
            </div>
            <p className="text-green-600 font-medium">↑ 7.2%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ProgramStatus Component
const ProgramStatus = ({
  label,
  status,
}: {
  label: string;
  status?: string;
}) => (
  <div className="flex justify-between items-center border px-3 py-2 rounded-md">
    <span className="text-gray-700">{label}</span>
    {status && (
      <span
        className={`text-xs px-2 py-1 rounded-full ${
          status === "In Progress"
            ? "bg-gray-200"
            : "bg-orange-100 text-orange-800"
        }`}
      >
        {status}
      </span>
    )}
  </div>
);
