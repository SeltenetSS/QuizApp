import { prisma } from "@/lib/prisma";

export async function POST(req) {
  const body = await req.json();

  const quiz = await prisma.quiz.create({
    data: {
      title: body.title,
      category: body.category,
      questions: {
        create: body.questions.map((q) => ({
          question: q.question,
          answer: q.answer,
          options: JSON.stringify(q.options), 
        })),
      },
    },
    include: { questions: true },
  });

  return Response.json(quiz);
}
