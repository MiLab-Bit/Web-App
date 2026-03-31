"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              🔐 AuthDemo
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {status === "authenticated" ? (
              <>
                <span className="text-gray-600 dark:text-gray-300">
                  欢迎, {session.user?.name}
                </span>
                <Link
                  href="/dashboard"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                >
                  控制台
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  退出
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300"
                >
                  登录
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  注册
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
