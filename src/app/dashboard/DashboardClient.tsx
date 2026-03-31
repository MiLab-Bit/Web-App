"use client";

import { signOut } from "next-auth/react";
import { Navbar } from "@/components/Navbar";

interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export default function DashboardClient({ user }: { user: User }) {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <h1 className="text-3xl font-bold">欢迎回来，{user.name}！</h1>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>
          </div>

          <div className="border-t dark:border-gray-700 pt-8">
            <h2 className="text-xl font-semibold mb-4">📊 用户仪表板</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <StatCard title="账户状态" value="活跃" icon="✅" />
              <StatCard title="注册时间" value="刚刚" icon="📅" />
              <StatCard title="角色" value="用户" icon="👤" />
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 className="font-semibold mb-4">快速操作</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <QuickAction
                  icon="📝"
                  title="编辑资料"
                  description="更新你的个人信息"
                />
                <QuickAction
                  icon="🔐"
                  title="修改密码"
                  description="更改你的登录密码"
                />
                <QuickAction
                  icon="🔔"
                  title="通知设置"
                  description="管理通知偏好"
                />
                <QuickAction
                  icon="🗑️"
                  title="删除账户"
                  description="永久删除你的账户"
                  danger
                />
              </div>
            </div>
          </div>
        </div>

        {/* Architecture Info */}
        <div className="mt-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">🏗️ 应用架构</h2>
          <div className="prose dark:prose-invert max-w-none">
            <ArchitectureDiagram />
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}

function QuickAction({
  icon,
  title,
  description,
  danger,
}: {
  icon: string;
  title: string;
  description: string;
  danger?: boolean;
}) {
  return (
    <button
      className={`text-left p-4 rounded-xl border transition hover:shadow-md ${
        danger
          ? "border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20"
          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <div className={`font-medium ${danger ? "text-red-600 dark:text-red-400" : ""}`}>
            {title}
          </div>
          <div className="text-sm text-gray-500">{description}</div>
        </div>
      </div>
    </button>
  );
}

function ArchitectureDiagram() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4 text-sm">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
          <div className="font-bold text-blue-700 dark:text-blue-400 mb-2">前端层</div>
          <ul className="space-y-1 text-gray-600 dark:text-gray-400">
            <li>• Next.js 14 (App Router)</li>
            <li>• React 18</li>
            <li>• Tailwind CSS</li>
            <li>• TypeScript</li>
          </ul>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
          <div className="font-bold text-green-700 dark:text-green-400 mb-2">认证层</div>
          <ul className="space-y-1 text-gray-600 dark:text-gray-400">
            <li>• NextAuth.js</li>
            <li>• JWT Session</li>
            <li>• Credentials Provider</li>
            <li>• Protected Routes</li>
          </ul>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
          <div className="font-bold text-purple-700 dark:text-purple-400 mb-2">API 层</div>
          <ul className="space-y-1 text-gray-600 dark:text-gray-400">
            <li>• Next.js API Routes</li>
            <li>• Server Actions</li>
            <li>• RESTful 端点</li>
            <li>• 输入验证 (Zod)</li>
          </ul>
        </div>
        
        <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg">
          <div className="font-bold text-orange-700 dark:text-orange-400 mb-2">数据层</div>
          <ul className="space-y-1 text-gray-600 dark:text-gray-400">
            <li>• 内存数据库 (开发)</li>
            <li>• PostgreSQL (生产)</li>
            <li>• Prisma ORM</li>
            <li>• 连接池管理</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <div className="font-bold mb-2">🔄 数据流</div>
        <code className="text-xs block overflow-x-auto">
          用户请求 → Next.js 路由 → 认证检查 → API Route → 数据库操作 → 返回响应
        </code>
      </div>
    </div>
  );
}
