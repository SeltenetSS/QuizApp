import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req) {
  const { quizId, score, total } = await req.json();
  const token = cookies().get("token")?.value;
  const user = token ? verifyToken(token) : null;

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.result.create({
    data: {
      quizId,
      userId: user.id,
      score,
      total,
    },
  });

  return Response.json({ message: "Result saved successfully" });
}
