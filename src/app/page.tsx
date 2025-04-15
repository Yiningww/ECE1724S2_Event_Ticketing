//已改
// app/page.tsx
"use client"; // 声明此组件在客户端渲染
import { useState, useEffect } from 'react';

type User = {
  id: number;
  email: string;
  name: string;
};

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);

  // 在组件加载时获取所有用户
  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  // 创建新用户
  async function createUser() {
    const newUser = {
      email: `test${Date.now()}@example.com`,
      name: `User${Date.now()}`,
    };
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();

    // 合并到现有users列表
    setUsers(prev => [...prev, data]);
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Event Ticketing System</h1>
      <button
        onClick={createUser}
        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
      >
        Create Random User
      </button>

      <ul className="mt-4">
        {users.map(user => (
          <li key={user.id} className="border p-2 mb-2">
            <div>ID: {user.id}</div>
            <div>Email: {user.email}</div>
            <div>Name: {user.name}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}









