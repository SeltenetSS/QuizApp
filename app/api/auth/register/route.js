import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ error: "Email və ya şifrə boş ola bilməz" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      return Response.json({ error: "Istifadəçi artıq mövcuddur" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return Response.json({ message: "Qeydiyyat uğurludur" });
  } catch (error) {
    console.error("Qeydiyyat xətası:", error);
    return Response.json({ error: "Server xətası baş verdi" }, { status: 500 });
  }
}
