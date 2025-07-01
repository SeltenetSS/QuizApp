// app/admin/quizzes/QuizListClient.js
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function QuizListClient({ quizzes }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    if (confirm("Quiz silinsin?")) {
      const res = await fetch(`/api/quiz/${id}`, { method: "DELETE" });
      if (res.ok) router.refresh();
      else alert("Silərkən xəta baş verdi");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Mövcud Quizlər</h2>
      {quizzes.length === 0 && <p>Hələ quiz yoxdur.</p>}

      <ul className="space-y-4">
        {quizzes.map((quiz) => (
          <li
            key={quiz.id}
            className="border p-4 rounded hover:shadow-lg transition flex justify-between items-center"
          >
            <Link href={`/admin/edit/${quiz.id}`} className="block flex-1">
              <h3 className="text-xl font-semibold">{quiz.title}</h3>
              <p className="text-gray-600">Kateqoriya: {quiz.category}</p>
              <p className="text-gray-700">Suallar sayı: {quiz.questions.length}</p>
            </Link>

            <button
              onClick={() => handleDelete(quiz.id)}
              className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Sil
            </button>

            <button
              onClick={() => router.push(`/quiz/start/${quiz.id}`)}
              className="ml-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Testə Başla
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
