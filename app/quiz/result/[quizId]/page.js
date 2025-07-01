"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";

export default function QuizResultPage() {
  const { quizId } = useParams();
  const searchParams = useSearchParams();
  const score = Number(searchParams.get("score"));
  const total = Number(searchParams.get("total"));
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({}); // istifadəçinin cavabları

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await fetch(`/api/quiz/${quizId}`);
      const data = await res.json();
      setQuiz(data);
      setLoading(false);
    };
    fetchQuiz();

    // **Burada cavabları localStorage-dan oxuyuruq**
    const savedAnswers = localStorage.getItem(`quiz_answers_${quizId}`);
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, [quizId]);

  if (loading) return <div>Yüklənir...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Nəticəniz</h2>
      <p className="mb-4">
        {score} / {total} doğru cavab.
      </p>

      <div className="space-y-4">
        {quiz.questions.map((q, idx) => {
          const userAnswer = answers[q.id] || "";

          const isCorrect =
            userAnswer.trim().toLowerCase() === q.answer.trim().toLowerCase();

          return (
            <div key={q.id} className="p-4 border rounded">
              <p>
                <b>{idx + 1}. {q.question}</b>
              </p>
              <p>
                Sənin cavabın:{" "}
                <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                  {userAnswer || "Cavab yoxdur"}
                </span>
              </p>
              {!isCorrect && <p>Doğru cavab: {q.answer}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
