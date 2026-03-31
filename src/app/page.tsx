import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            现代化全栈应用
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            一个带有用户认证、数据库和简洁界面的 Web 应用
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/register"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition transform hover:scale-105"
            >
              开始使用
            </a>
            <a
              href="/login"
              className="px-8 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              已有账号？
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon="🔐"
            title="安全认证"
            description="基于 NextAuth.js 的安全认证系统，支持多种登录方式"
          />
          <FeatureCard
            icon="💾"
            title="数据持久化"
            description="可扩展的数据库架构，从 SQLite 到 PostgreSQL 无缝迁移"
          />
          <FeatureCard
            icon="⚡"
            title="极速体验"
            description="Next.js 提供的 SSR 和 API Routes，响应迅速"
          />
        </div>

        {/* Tech Stack */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">技术栈</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <TechItem name="Next.js 14" description="全栈 React 框架" />
            <TechItem name="TypeScript" description="类型安全" />
            <TechItem name="Tailwind CSS" description="原子化 CSS" />
            <TechItem name="NextAuth.js" description="身份认证" />
          </div>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

function TechItem({ name, description }: { name: string; description: string }) {
  return (
    <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
      <div className="font-semibold text-gray-900 dark:text-white">{name}</div>
      <div className="text-sm text-gray-500">{description}</div>
    </div>
  );
}
