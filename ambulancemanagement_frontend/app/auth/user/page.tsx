"use client";

import { LoginForm } from "@/components/login";
import { RegisterForm } from "@/components/register";
import { useState } from "react";

export default function HomePage() {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Header and Navbar for the Login page
      {!isRegister && (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-sm py-4 px-8 flex justify-between items-center z-10">
          <div className="text-xl font-bold">AMS</div>
          <div className="space-x-8 text-sm">
            <a href="#" className="text-gray-700 hover:text-black">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-black">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-black">
              Contact
            </a>
          </div>
        </nav>
      )} */}

      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-8 pt-12 mt-20 md:mt-0">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-black">
            {/* Logo placeholder */}
          </div>
          <h1 className="text-2xl font-bold">Ambulance Management System</h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome to our emergency response platform
          </p>
        </div>

        <div className="flex border border-gray-300 rounded-md overflow-hidden mb-6">
          <button
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-3 text-center font-medium ${
              isRegister ? "bg-white text-black" : "bg-gray-100 text-gray-500"
            }`}
          >
            Register
          </button>
          <button
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-3 text-center font-medium ${
              !isRegister ? "bg-white text-black" : "bg-gray-100 text-gray-500"
            }`}
          >
            Login
          </button>
        </div>

        {isRegister ? <RegisterForm /> : <LoginForm />}
      </div>
    </div>
  );
}
