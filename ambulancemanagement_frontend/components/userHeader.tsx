"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export const UserHeader = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setName(`${user.FIRST_NAME} ${user.LAST_NAME}`);
    }
  }, []);

  return (
    <header className="flex justify-between items-center mb-6">
      <Link href="/dashboarduser" className="text-black font-bold text-xl">
        <h1 className="text-2xl font-semibold">Ambulance Management System</h1>
      </Link>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-200"></button>
        <Link href="/dashboarduser/profile" className="font-medium">
          {name || "Guest"}
        </Link>
      </div>
    </header>
  );
};
