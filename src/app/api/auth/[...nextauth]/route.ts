import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

// 简单的内存数据库（生产环境应使用真实数据库）
const users = new Map<string, { id: string; name: string; email: string; password: string }>();
let userIdCounter = 1;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        action: { label: "Action", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const action = credentials.action || "login";

        // 注册新用户
        if (action === "register") {
          if (!credentials.name) {
            throw new Error("请输入用户名");
          }

          // 检查邮箱是否已存在
          for (const user of users.values()) {
            if (user.email === credentials.email) {
              throw new Error("该邮箱已被注册");
            }
          }

          // 创建新用户
          const id = String(userIdCounter++);
          const newUser = {
            id,
            name: credentials.name,
            email: credentials.email,
            password: credentials.password, // 生产环境应加密存储
          };
          users.set(id, newUser);

          return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
          };
        }

        // 登录
        for (const user of users.values()) {
          if (
            user.email === credentials.email &&
            user.password === credentials.password
          ) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
          }
        }

        throw new Error("邮箱或密码错误");
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
