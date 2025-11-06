"use client";

import Link from "next/link";
import {
  Home,
  Truck,
  Users,
  CalendarCheck,
  BarChart2,
  Settings,
} from "lucide-react";

export const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md min-h-screen">
      {/* Logo */}
      <div className="p-6">
        <h2 className="text-xl font-bold flex items-center">
          <span className="w-8 h-8 mr-2 bg-gray-800 rounded-full"></span>
          AMS
        </h2>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        <Link
          href="/dashboardadmin"
          className="flex items-center p-3 rounded-lg hover:bg-gray-200 hover:font-semibold text-gray-800"
        >
          <Home className="w-5 h-5 mr-3 text-gray-700" />
          Dashboard
        </Link>

        <Link
          href="/dashboardadmin/adddriver"
          className="flex items-center p-3 rounded-lg hover:bg-gray-100 hover:font-semibold text-gray-600"
        >
          <Truck className="w-5 h-5 mr-3 text-gray-600" />
          Add Drivers
        </Link>

        <Link
          href="/ambulances"
          className="flex items-center p-3 rounded-lg hover:bg-gray-100 hover:font-semibold text-gray-600"
        >
          <Truck className="w-5 h-5 mr-3 text-gray-600" />
          Add Ambulances
        </Link>

        <Link
          href="/personnel"
          className="flex items-center p-3 rounded-lg hover:bg-gray-100 hover:font-semibold text-gray-600"
        >
          <Users className="w-5 h-5 mr-3 text-gray-600" />
          Personnel
        </Link>

        <Link
          href="/bookings"
          className="flex items-center p-3 rounded-lg hover:bg-gray-100 hover:font-semibold text-gray-600"
        >
          <CalendarCheck className="w-5 h-5 mr-3 text-gray-600" />
          Bookings
        </Link>

        <Link
          href="/analytics"
          className="flex items-center p-3 rounded-lg hover:bg-gray-100 hover:font-semibold text-gray-600"
        >
          <BarChart2 className="w-5 h-5 mr-3 text-gray-600" />
          Analytics
        </Link>

        <Link
          href="/settings"
          className="flex items-center p-3 rounded-lg hover:bg-gray-100 hover:font-semibold text-gray-600"
        >
          <Settings className="w-5 h-5 mr-3 text-gray-600" />
          Settings
        </Link>
      </nav>
    </aside>
  );
};
