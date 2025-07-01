// app/admin/quizzes/page.js
import { prisma } from "@/lib/prisma";
import QuizListClient from "./QuizListClient";

export const revalidate = 0;

export default async function QuizzesPage() {
  const quizzes = await prisma.quiz.findMany({
    include: { questions: true },
  });

  return <QuizListClient quizzes={quizzes} />;
}
