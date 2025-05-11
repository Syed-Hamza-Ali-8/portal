"use client";

import React from "react";

const VolunteersPage = () => {
  const volunteers = [
    { name: "Aarav Patel", joined: "Jan 2024", programs: 3 },
    { name: "Priya Sharma", joined: "Feb 2024", programs: 2 },
    { name: "Rohan Mehta", joined: "Mar 2024", programs: 5 },
    { name: "Simran Kaur", joined: "Apr 2024", programs: 4 },
    { name: "Karan Verma", joined: "May 2024", programs: 1 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Volunteers List</h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Joined</th>
              <th className="px-6 py-3">Programs Participated</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {volunteer.name}
                </td>
                <td className="px-6 py-4 text-gray-800">{volunteer.joined}</td>
                <td className="px-6 py-4 text-gray-800">{volunteer.programs}</td>
                <td className="px-6 py-4">
                  <span className="inline-block px-2 py-1 text-xs text-white bg-orange-500 rounded-full">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VolunteersPage;