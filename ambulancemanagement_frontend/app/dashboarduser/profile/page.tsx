/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get user details from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full animate-pulse"></div>
          <p className="text-gray-600 text-lg font-medium">
            No user found. Please log in.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile Details Card - Full Width */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-5">
            <h2 className="text-white text-2xl font-bold">
              Profile Information
            </h2>
          </div>

          <div className="p-8">
            {/* Personal Information Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Personal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">First Name</p>
                  <p className="text-gray-800 font-medium text-lg">
                    {user.FIRST_NAME}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Last Name</p>
                  <p className="text-gray-800 font-medium text-lg">
                    {user.LAST_NAME}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="text-gray-800 font-medium text-lg">
                    {user.AGE}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="text-gray-800 font-medium text-lg">
                    {user.GENDER}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="text-gray-800 font-medium text-lg">
                    {user.PHONE_NUMBER}
                  </p>
                </div>
              </div>
            </div>

            {/* Address Information Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Address Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Street</p>
                  <p className="text-gray-800 font-medium text-lg">
                    {user.STREET}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">City</p>
                  <p className="text-gray-800 font-medium text-lg">
                    {user.CITY}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">State</p>
                  <p className="text-gray-800 font-medium text-lg">
                    {user.STATE}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Zipcode</p>
                  <p className="text-gray-800 font-medium text-lg">
                    {user.ZIPCODE}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="text-gray-800 font-medium text-lg font-mono">
                    {user.USER_ID}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="text-gray-800 font-medium text-lg">
                    @{user.USERNAME}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200">
            Edit Profile
          </button>
          <Link
            href="/dashboarduser"
            className=" text-center flex-1 bg-gradient-to-r from-gray-500 to-gray-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-gray-600 hover:to-gray-800 transition-all duration-200"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
