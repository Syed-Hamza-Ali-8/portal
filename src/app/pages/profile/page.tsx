"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const [trusteeData, setTrusteeData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("trusteeData");
    if (data) {
      setTrusteeData(JSON.parse(data));
    } else {
      // Redirect to login page if no data found
      router.push("/");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png" // Default avatar
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-orange-500"
          />
        </div>

        <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Trustee Profile
        </h1>

        {trusteeData ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-800 font-medium">Name:</p>
              <p className="text-gray-600">{trusteeData.name}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-800 font-medium">Email:</p>
              <p className="text-gray-600">{trusteeData.email}</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">Loading profile...</div>
        )}

        <div className="mt-6 flex justify-center gap-4">
          <button
            className="w-full py-2 bg-gray-300 text-gray-700 cursor-pointer rounded-md shadow-md hover:bg-gray-400 transition-colors"
            onClick={() => router.push("/")}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
