// app/signup/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  
  // 表单状态：收集 email, name, password
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  
  // 用于显示错误/成功提示
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // 简单校验
    if (!email || !name || !password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      // 调用你写好的 /api/users 接口
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        // 如果服务器响应不是 2xx
        setError(data.error || "Signup failed");
      } else {
        setSuccess("Signup successful! You can now log in.");
        // 或者：router.push("/login")，跳转到登录页
      }

    } catch (err: any) {
      console.error(err);
      setError("Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <label htmlFor="email" className="block mb-2">Email:</label>
        <input
          id="email"
          type="email"
          className="border p-2 mb-4 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="name" className="block mb-2">Name:</label>
        <input
          id="name"
          type="text"
          className="border p-2 mb-4 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="password" className="block mb-2">Password:</label>
        <input
          id="password"
          type="password"
          className="border p-2 mb-4 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Sign Up
        </button>

        <div className="mt-4 text-sm text-gray-700">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 underline">
            Login here
          </a>
        </div>
      </form>
    </div>
  );
}
