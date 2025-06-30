"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditQuizPage() {
  const { quizId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await fetch(`/api/quiz/${quizId}`);
      const data = await res.json();

      // options-u parse et
      const formatted = {
        ...data,
        questions: data.questions.map((q) => ({
          ...q,
          options: JSON.parse(q.options),
        })),
      };

      setQuiz(formatted);
      setLoading(false);
    };

    fetchQuiz();
  }, [quizId]);

  const handleChange = (index, field, value) => {
    const updated = [...quiz.questions];
    if (field === "options") {
      updated[index].options = value;
    } else {
      updated[index][field] = value;
    }
    setQuiz({ ...quiz, questions: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedQuiz = {
      ...quiz,
      questions: quiz.questions.map((q) => ({
        ...q,
        options: JSON.stringify(q.options),
      })),
    };

    const res = await fetch(`/api/quiz/${quizId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedQuiz),
    });

    if (res.ok) {
      router.push("/admin/quizzes");
    } else {
      alert("Yeniləmə zamanı xəta baş verdi.");
    }
  };

  if (loading) return <div className="text-center mt-10">Yüklənir...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Quiz Redaktəsi</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          value={quiz.category}
          onChange={(e) => setQuiz({ ...quiz, category: e.target.value })}
          className="w-full border p-2 rounded"
        />

        {quiz.questions.map((q, idx) => (
          <div
            key={q.id}
            className="border p-4 rounded-md bg-gray-50 space-y-2"
          >
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={q.question}
              onChange={(e) =>
                handleChange(idx, "question", e.target.value)
              }
            />
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={q.answer}
              onChange={(e) => handleChange(idx, "answer", e.target.value)}
            />
            {q.options.map((opt, optIdx) => (
              <input
                key={optIdx}
                type="text"
                className="w-full border p-2 rounded"
                value={opt}
                onChange={(e) => {
                  const newOptions = [...q.options];
                  newOptions[optIdx] = e.target.value;
                  handleChange(idx, "options", newOptions);
                }}
              />
            ))}
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Yadda saxla
        </button>
      </form>
    </div>
  );
}
