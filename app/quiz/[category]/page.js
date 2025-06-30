import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: params.quizId },
    include: { questions: true },
  });

  if (!quiz) return Response.json({ error: "Quiz tapılmadı" }, { status: 404 });
  return Response.json(quiz);
}

export async function PUT(req, { params }) {
  const body = await req.json();

 
  await prisma.quiz.update({
    where: { id: params.quizId },
    data: {
      title: body.title,
      category: body.category,
    },
  });

  // Sonra sualları yenilə
  for (let q of body.questions) {
    await prisma.question.update({
      where: { id: q.id },
      data: {
        question: q.question,
        answer: q.answer,
        options: q.options,
      },
    });
  }

  return Response.json({ message: "Uğurla yeniləndi" });
}
