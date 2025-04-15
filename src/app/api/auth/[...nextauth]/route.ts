import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 1) 查找用户
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) return null;

        // 2) 比对哈希密码
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        // 3) 返回用户基本信息
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
