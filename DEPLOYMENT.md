# 🚀 部署指南

## 方法 1: Vercel 一键部署 (推荐)

### 步骤 1: 初始化 Git 仓库

```powershell
cd C:\Users\PC\.qclaw\workspace\webapp-project
git init
git add .
git commit -m "Initial commit: Auth Demo App"
```

### 步骤 2: 推送到 GitHub

```powershell
# 在 GitHub 创建新仓库: auth-demo-app
git remote add origin https://github.com/你的用户名/auth-demo-app.git
git branch -M main
git push -u origin main
```

### 步骤 3: 在 Vercel 部署

1. 访问 https://vercel.com/new
2. 点击 "Import Git Repository"
3. 选择你的 GitHub 仓库
4. Vercel 会自动检测 Next.js
5. 点击 "Deploy"

### 步骤 4: 配置环境变量

在 Vercel Dashboard → Settings → Environment Variables:

```
NEXTAUTH_SECRET=你的随机密钥(至少32字符)
NEXTAUTH_URL=https://你的域名.vercel.app
```

生成密钥命令 (在本地 PowerShell):
```powershell
# 方法 1: 使用 Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# 方法 2: 使用 PowerShell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

### 步骤 5: 添加数据库

**选项 A: Vercel Postgres (推荐)**
1. 在 Vercel 项目中点击 "Storage"
2. 点击 "Create Database"
3. 选择 "Postgres"
4. 复制 `DATABASE_URL` 到环境变量

**选项 B: Neon (免费)**
1. 访问 https://neon.tech
2. 创建免费账号
3. 创建新项目
4. 复制连接字符串到 `DATABASE_URL`

**选项 C: Supabase (免费)**
1. 访问 https://supabase.com
2. 创建新项目
3. 在 Settings → Database 获取连接字符串

### 步骤 6: 初始化数据库

在 Vercel Dashboard → Deployments → 选择最新部署 → Functions → Terminal:

```bash
npx prisma db push
```

或者在本地:
```powershell
cd webapp-project
$env:DATABASE_URL="你的数据库连接字符串"
npx prisma db push
```

---

## 方法 2: 本地开发

### 前提条件
- Node.js 18+ 已安装
- npm/yarn/pnpm 可用

### 步骤

```powershell
# 1. 进入项目目录
cd C:\Users\PC\.qclaw\workspace\webapp-project

# 2. 安装依赖 (如果权限问题，尝试以下方法)
npm install

# 如果 npm 失败，尝试:
pnpm install
# 或
yarn install

# 3. 生成密钥并配置
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
# 将输出复制到 .env.local 的 NEXTAUTH_SECRET

# 4. 启动开发服务器
npm run dev

# 5. 访问 http://localhost:3000
```

---

## 方法 3: StackBlitz 在线开发

1. 访问 https://stackblitz.com
2. 点击 "Import from GitHub"
3. 输入你的仓库 URL
4. 自动在浏览器中运行开发环境

---

## 常见问题

### Q: npm install 权限错误
A: 
1. 以管理员身份运行 PowerShell
2. 或者使用 `pnpm install`
3. 或者直接部署到 Vercel，跳过本地安装

### Q: 数据库连接失败
A:
1. 检查 DATABASE_URL 格式
2. 确保 IP 白名单允许 Vercel 访问
3. 使用连接池参数 `?pgbouncer=true`

### Q: 登录后立即退出
A:
1. 检查 NEXTAUTH_URL 是否正确
2. 确保 NEXTAUTH_SECRET 已设置
3. 清除浏览器 Cookie 后重试

---

## 部署后检查清单

- [ ] 网站可以访问
- [ ] 可以注册新用户
- [ ] 可以登录
- [ ] 登录后可以访问 Dashboard
- [ ] 退出登录正常
- [ ] 数据库连接正常

---

## 下一步

1. 添加 GitHub OAuth 登录
2. 添加用户头像上传
3. 添加密码重置功能
4. 添加邮件验证
5. 自定义域名绑定
