import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 0; // SSR üçün

export default async function QuizzesPage() {
  const quizzes = await prisma.quiz.findMany({
    include: { questions: true },
  });

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Mövcud Quizlər</h2>

      {quizzes.length === 0 && <p>Hələ quiz yoxdur.</p>}

      <ul className="space-y-4">
        {quizzes.map((quiz) => (
          <li
            key={quiz.id}
            className="border p-4 rounded hover:shadow-lg transition cursor-pointer"
          >
            <Link href={`/admin/edit/${quiz.id}`} className="block">
              <h3 className="text-xl font-semibold">{quiz.title}</h3>
              <p className="text-gray-600">Kateqoriya: {quiz.category}</p>
              <p className="text-gray-700">
                Suallar sayı: {quiz.questions.length}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
