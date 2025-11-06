"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // reset error before request

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    if (username === "user" && password === "userpass") {
      router.push("/dashboarduser");
    }
    if (username === "admin" && password === "adminpass") {
      router.push("/dashboardadmin");
    }

    if (username === "driver" && password === "driverpass") {
      router.push("/dashboarddriver");
    }
    // try {
    //   const res = await fetch("http://localhost:5000/auth/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ username, password }),
    //   });

    //   if (!res.ok) {
    //     setError("Invalid username or password");
    //     return; // ❌ stop here, no redirect
    //   }

    //   const data = await res.json();

    //   // Save USER_ID in localStorage
    //   localStorage.setItem("user", JSON.stringify(data));

    //   // ✅ Only push when login is successful
    //   router.push("/dashboarduser");
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // } catch (err) {
    //   setError("Server error, please try again later");
    // }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div className="rounded-md shadow-sm">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>
      <div className="rounded-md shadow-sm">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="flex justify-center">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      <div className="text-right text-sm">
        <a href="#" className="text-gray-500 hover:underline">
          Forgot Password?
        </a>
      </div>
      <div>
        <button
          type="submit"
          className="w-full py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800"
        >
          Login
        </button>

        <ul>
          <li className="text-center text-sm mt-4">admin: admin / adminpass</li>
          <li className="text-center text-sm">user: user / userpass</li>
          <li className="text-center text-sm">driver: driver / driverpass</li>
        </ul>
      </div>
    </form>
  );
};
