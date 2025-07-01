import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: params.quizId },
    include: { questions: true },
  });

  if (!quiz) {
    return new Response(JSON.stringify({ error: "Quiz tapılmadı" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(quiz), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
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

  return new Response(JSON.stringify({ message: "Uğurla yeniləndi" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(req, { params }) {
  const { quizId } = params;

  await prisma.question.deleteMany({
    where: { quizId },
  });

  await prisma.quiz.delete({
    where: { id: quizId },
  });

  return new Response(null, { status: 204 });
}
