import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  const quiz = await prisma.quiz.findFirst({
    where: { category: params.category },
    include: { questions: true },
  });

  if (!quiz) {
    return Response.json({ error: "Quiz tapılmadı" }, { status: 404 });
  }

  return Response.json(quiz);
}
