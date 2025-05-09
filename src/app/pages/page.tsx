"use client";

import React from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Home,
  Users,
  ClipboardList,
  Heart,
  Settings,
  Bell,
} from "lucide-react";

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
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-black text-white w-full lg:w-64 p-6 space-y-6 lg:min-h-screen">
        <div className="text-2xl font-semibold">Trusty Dashboard</div>
        <nav className="space-y-4">
          <NavItem href="/dashboard" icon={<Home />} label="Dashboard" active />
          <NavItem href="/pages/volunteers" icon={<Users />} label="Volunteers" />
          <NavItem href="/pages/programs" icon={<ClipboardList />} label="Programs" />
          <NavItem href="/pages/beneficiaries" icon={<Heart />} label="Beneficiaries" />
          <NavItem href="/settings" icon={<Settings />} label="Settings" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 text-gray-700">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Trusty Dashboard</h1>
          <div className="flex items-center gap-4">
            <Bell className="text-black" />
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-orange-500 text-white p-6 rounded-xl">
            <p className="text-3xl font-bold">1,250</p>
            <p>Volunteers this month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Number of Programs</h2>
            <div className="space-y-2">
              <ProgramStatus label="Program A" />
              <ProgramStatus label="Program B" status="In Progress" />
              <ProgramStatus label="Program C" status="Upcoming" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Comparison of Boys and Girls</h2>
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

        {/* Chart and Beneficiaries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Monthly Volunteers</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="uv" fill="#F97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-700">Number of Beneficiaries</h2>
              <p className="text-3xl font-bold text-gray-700">3,254</p>
            </div>
            <p className="text-green-600 font-medium">↑ 7.2%</p>
          </div>
        </div>
      </main>
    </div>
  );
}

const NavItem = ({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) => (
  <Link href={href}>
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition ${
        active ? "bg-gray-800" : "hover:bg-gray-700"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  </Link>
);

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
