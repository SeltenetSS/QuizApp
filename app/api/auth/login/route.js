import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return Response.json({ error: "Email or password is incorrect" }, { status: 401 });
  }

  const token = signToken(user);
  cookies().set("token", token, { httpOnly: true });

  return Response.json({ message: "Logged in successfully" });
}
