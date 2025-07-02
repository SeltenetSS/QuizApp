"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function StartQuizPage() {
  const { quizId } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await fetch(`/api/quiz/${quizId}`);
      const data = await res.json();

      const formattedQuestions = data.questions.map((q) => ({
        ...q,
        options: JSON.parse(q.options),
      }));

      setQuiz({ ...data, questions: formattedQuestions });
      setLoading(false);
    };
    fetchQuiz();
  }, [quizId]);

  if (loading) return <div>Loading...</div>;

  const handleAnswerChange = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName.trim()) {
      alert("Please enter your name");
      return;
    }

    let score = 0;
    quiz.questions.forEach((q) => {
      if ((answers[q.id] || "").trim().toLowerCase() === q.answer.trim().toLowerCase()) {
        score++;
      }
    });

    localStorage.setItem(`quiz_answers_${quizId}`, JSON.stringify(answers));

    const res = await fetch("/api/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quizId, score, total: quiz.questions.length, userName }),
    });

    if (res.ok) {
      router.push(`/quiz/result/${quizId}?score=${score}&total=${quiz.questions.length}`);
    } else {
      alert("An error occurred while saving your result.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{quiz.title} - Test</h2>

      <label className="block mb-4">
        <span className="text-gray-700 font-semibold">Your Name:</span>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter your name"
          required
        />
      </label>

      <form onSubmit={handleSubmit} className="space-y-6">
        {quiz.questions.map((q, idx) => (
          <div key={q.id} className="p-4 border rounded bg-gray-50">
            <p className="mb-2 font-semibold">
              {idx + 1}. {q.question}
            </p>
            <div className="space-y-1">
              {q.options.map((opt, i) => (
                <label key={i} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => handleAnswerChange(q.id, opt)}
                    required
                    className="form-radio"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Finish Test
        </button>
      </form>
    </div>
  );
}
