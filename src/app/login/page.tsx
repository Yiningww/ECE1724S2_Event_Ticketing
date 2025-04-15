//新加
// app/login/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    
    // 调用 NextAuth 的 signIn 方法，使用 "credentials" provider（需要你已在 NextAuth 配置中配置好）
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // 我们手动控制重定向
    });
    
    setLoading(false);
    if (result?.error) {
      setError(result.error);
    } else {
      // 登录成功后重定向到仪表盘页面，比如 /dashboard
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <label htmlFor="email" className="block mb-2">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <label htmlFor="password" className="block mb-2">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <button type="submit" disabled={loading} className="bg-blue-500 text-white py-2 px-4 rounded w-full">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
