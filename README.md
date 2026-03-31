# 🌐 现代化全栈 Web 应用

一个带有用户认证、数据库和简洁界面的完整 Web 应用。

## 📦 技术架构

```
┌─────────────────────────────────────────────────────────────┐
│                      用户浏览器                              │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    前端 (Next.js 14)                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ 首页     │  │ 登录页   │  │ 注册页   │  │ 控制台   │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│                      React 18 + TypeScript                  │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                 认证层 (NextAuth.js)                        │
│  • JWT Session 管理                                         │
│  • Credentials Provider (邮箱/密码)                         │
│  • 路由保护中间件                                           │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  API 层 (Next.js API Routes)                │
│  ┌──────────────────────┐  ┌──────────────────────┐         │
│  │ /api/auth/*          │  │ /api/user/*          │         │
│  │ 认证端点             │  │ 用户 CRUD            │         │
│  └──────────────────────┘  └──────────────────────┘         │
│                      Server-Side Rendering                   │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  数据层 (Prisma + PostgreSQL)               │
│  ┌──────────────────────────────────────────────┐          │
│  │ User: id, name, email, password, createdAt   │          │
│  └──────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 快速开始

### 方法 1: 本地开发

```bash
# 1. 进入项目目录
cd ~/.qclaw/workspace/webapp-project

# 2. 安装依赖
npm install

# 3. 配置环境变量 (复制并编辑 .env.local)
# NEXTAUTH_SECRET=随机字符串
# DATABASE_URL=你的数据库连接字符串

# 4. 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 方法 2: 一键部署到 Vercel (推荐)

1. **推送代码到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/你的用户名/auth-demo.git
   git push -u origin main
   ```

2. **在 Vercel 部署**
   - 访问 https://vercel.com/new
   - 导入你的 GitHub 仓库
   - Vercel 会自动检测 Next.js 并配置构建设置
   - 点击 "Deploy"

3. **配置环境变量**
   - 在 Vercel Dashboard → Settings → Environment Variables
   - 添加:
     - `NEXTAUTH_SECRET`: 生成一个随机字符串 (可用 `openssl rand -base64 32`)
     - `DATABASE_URL`: PostgreSQL 连接字符串

4. **创建数据库**
   - 在 Vercel 创建 Postgres 数据库
   - 或使用 Neon/Supabase/Railway 等免费服务
   - 运行 `npx prisma db push` 初始化表结构

### 方法 3: StackBlitz 在线开发

访问: https://stackblitz.com/fork/github/your-repo/auth-demo

## 🔐 认证流程详解

### 注册流程
```
用户填写表单
     ↓
前端验证 (Zod)
     ↓
POST /api/auth/callback/credentials
     ↓
Credentials Provider.authorize()
     ↓
检查邮箱是否已存在
     ↓
密码哈希 (bcrypt)
     ↓
创建用户记录
     ↓
生成 JWT Token
     ↓
设置 Session Cookie
     ↓
重定向到 Dashboard
```

### 登录流程
```
用户输入邮箱/密码
     ↓
POST /api/auth/callback/credentials
     ↓
查找用户记录
     ↓
验证密码 (bcrypt.compare)
     ↓
生成 JWT Token
     ↓
设置 Session Cookie
     ↓
重定向到 Dashboard
```

### 路由保护
```tsx
// 服务端保护
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');
  return <Dashboard />;
}

// 客户端保护
const { status } = useSession();
if (status === 'unauthenticated') {
  router.push('/login');
}
```

## 📁 项目结构

```
webapp-project/
├── prisma/
│   └── schema.prisma          # 数据库模型
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/[...nextauth]/
│   │   │       └── route.ts   # NextAuth API
│   │   ├── login/
│   │   │   └── page.tsx       # 登录页
│   │   ├── register/
│   │   │   └── page.tsx       # 注册页
│   │   ├── dashboard/
│   │   │   ├── page.tsx       # 控制台 (服务端)
│   │   │   └── DashboardClient.tsx
│   │   ├── layout.tsx         # 根布局
│   │   ├── page.tsx           # 首页
│   │   └── globals.css        # 全局样式
│   └── components/
│       ├── AuthProvider.tsx   # Session Provider
│       └── Navbar.tsx         # 导航栏
├── .env.local                 # 环境变量
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 🛠️ 技术选型理由

| 技术 | 为什么选择它 |
|------|-------------|
| **Next.js 14** | App Router 提供 RSC、API Routes、路由保护一体化 |
| **TypeScript** | 类型安全，减少运行时错误 |
| **Tailwind CSS** | 原子化 CSS，快速开发，无样式冲突 |
| **NextAuth.js** | 成熟的开源认证方案，支持多种 Provider |
| **Prisma** | 类型安全的 ORM，自动生成类型，迁移管理 |
| **PostgreSQL** | 生产级关系型数据库，Vercel Postgres 免费额度 |
| **Vercel** | Next.js 官方托管，零配置部署，全球 CDN |

## 🌍 数据库选择

### 开发环境
- 内置内存数据库 (代码中的 `users` Map)
- 无需配置，立即可用
- 重启后数据丢失 (适合演示)

### 生产环境
- **Vercel Postgres**: Vercel 原生，自动配置
- **Neon**: Serverless PostgreSQL，免费起步
- **Supabase**: PostgreSQL + 认证 + 存储
- **Railway**: 简单的 PostgreSQL 托管

连接字符串格式:
```
postgresql://用户名:密码@主机:端口/数据库名?pgbouncer=true&connect_timeout=15
```

## 📊 环境变量

```bash
# 认证密钥 (生产环境必填)
NEXTAUTH_SECRET=your-super-secret-key-at-least-32-chars

# 应用 URL (生产环境)
NEXTAUTH_URL=https://your-app.vercel.app

# 数据库连接
DATABASE_URL=postgresql://...

# OAuth Provider (可选)
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
```

## 🔧 扩展功能

### 添加 OAuth 登录

```typescript
// src/app/api/auth/[...nextauth]/route.ts
import GitHubProvider from "next-auth/providers/github";

providers: [
  GitHubProvider({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  }),
  // ... 其他 provider
]
```

### 添加邮箱验证

1. 使用 `resend` 或 `sendgrid` 发送邮件
2. 创建验证 Token 表
3. 添加验证端点和页面

### 添加密码重置

1. 创建 `password_reset_tokens` 表
2. 发送重置邮件
3. 创建重置密码页面

## 🚢 部署检查清单

- [ ] 设置 `NEXTAUTH_SECRET`
- [ ] 设置 `DATABASE_URL`
- [ ] 运行 `npx prisma db push`
- [ ] 设置 `NEXTAUTH_URL` (生产域名)
- [ ] 测试注册/登录流程
- [ ] 测试路由保护
- [ ] 检查 HTTPS

## 📄 License

MIT
