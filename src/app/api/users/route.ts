//已改2

// // app/api/users/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// // (1) GET: 获取所有用户
// export async function GET() {
//   try {
//     const users = await prisma.user.findMany();
//     return NextResponse.json(users);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch users" },
//       { status: 500 }
//     );
//   }
// }

// // (2) POST: 创建新用户
// export async function POST(req: NextRequest) {
//   try {
//     const { email, name } = await req.json();

//     if (!email || !name) {
//       return NextResponse.json(
//         { error: "Missing email or name" },
//         { status: 400 }
//       );
//     }

//     const newUser = await prisma.user.create({
//       data: {
//         email,
//         name,
//       },
//     });

//     return NextResponse.json(newUser, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to create user" },
//       { status: 500 }
//     );
//   }
// }


// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

// GET /api/users - 获取所有用户（简单示例）
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST /api/users - 创建新用户
export async function POST(req: NextRequest) {
  try {
    const { email, name, password } = await req.json();
    // 1) 基本校验
    if (!email || !name || !password) {
      return NextResponse.json({ error: "Missing email/name/password" }, { status: 400 });
    }

    // 2) 查看邮箱是否已存在
    const existing = await prisma.user.findUnique({
      where: { email },
    });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // 3) 哈希密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4) 创建数据库记录
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // 5) 返回新用户信息（不包含明文密码）
    return NextResponse.json({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
