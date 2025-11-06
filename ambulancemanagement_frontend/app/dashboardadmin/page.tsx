"use client";

import { DailyTripsChart } from "@/components/chart/dailytrip";
import { ResponseTimeChart } from "@/components/chart/time";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [totals, setTotals] = useState<null | {
    ambulance: number;
    driver: number;
    booking: number;
  }>(null);

  useEffect(() => {
    try {
      const fetchTotals = async () => {
        const response = await fetch("http://localhost:5000/auth/totals");
        const data = await response.json();
        // console.log("Fetched totals:", data);
        setTotals(data);
      };
      fetchTotals();
    } catch (error) {
      console.error("Error fetching totals:", error);
    }
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-lg font-medium text-gray-500">
              Total Ambulances
            </p>
            <p className="text-2xl font-bold mt-1">{totals?.ambulance || 0}</p>
            <p className="text-sm text-gray-400">Active</p>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-lg">🚑</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-lg font-medium text-gray-500">
              Available Drivers
            </p>
            <p className="text-2xl font-bold mt-1">{totals?.driver || 0}</p>
            <p className="text-sm text-gray-400">On Duty</p>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-lg">👨‍⚕️</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-lg font-medium text-gray-500">
              Current Bookings
            </p>
            <p className="text-2xl font-bold mt-1">{totals?.booking || 0}</p>
            <p className="text-sm text-gray-400">In Progress</p>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-lg">📋</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-lg font-medium text-gray-500">Emergency Cases</p>
            <p className="text-2xl font-bold mt-1">3</p>
            <p className="text-sm text-red-500">Critical</p>
          </div>
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-lg text-red-600">🚨</span>
          </div>
        </div>
      </div>

      {/* Performance Analytics */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Performance Analytics</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Response Time (minutes)
            </h3>
            <div className="bg-gray-100 h-48 rounded-md p-2">
              <ResponseTimeChart />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Daily Trips
            </h3>
            <div className="bg-gray-100 h-48 rounded-md p-2">
              <DailyTripsChart />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <button className="py-3 px-4 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-900">
            Add Ambulance
          </button>
          <button className="py-3 px-4 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-900">
            Register Driver
          </button>
          <button className="py-3 px-4 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-900">
            Schedule Maintenance
          </button>
          <button className="py-3 px-4 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-900">
            Generate Report
          </button>
        </div>
      </div>
    </>
  );
}
