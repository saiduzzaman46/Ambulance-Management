"use client";
// import { useEffect } from "react";
import Link from "next/link";
// import { useState } from "react";

export const AdminHeader = () => {
  // const [name, setName] = useState("");

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("admin");
  //   // console.log(storedUser);
  //   if (storedUser) {
  //     const admin = JSON.parse(storedUser);
  //     setName(`${admin.FIRST_NAME} ${admin.LAST_NAME}`);
  //   }
  // }, []);
  return (
    <header className="flex justify-between items-center pb-6 border-b border-gray-300 mb-6 ">
      <div className="relative flex-1 max-w-sm mr-4">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
        <div className="flex items-center space-x-2">
          <div>
            <Link
              href="/dashboardadmin/profile"
              className="font-semibold text-sm"
            >
              {/* {name || "Guest"} */}
              Admin Name
            </Link>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};
