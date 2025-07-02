"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddQuizPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", answer: "", options: ["", "", "", ""] },
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === "options") {
      updated[index].options = value;
    } else {
      updated[index][field] = value;
    }
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", answer: "", options: ["", "", "", ""] },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/quiz/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, questions }),
    });

    if (res.ok) {
      router.push("/admin/quizzes");
    } else {
      alert("An error occurred");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Quiz</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Quiz Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        {questions.map((q, idx) => (
          <div key={idx} className="border p-4 rounded-md bg-gray-50 space-y-2">
            <input
              type="text"
              placeholder={`Question ${idx + 1}`}
              className="w-full border p-2 rounded"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(idx, "question", e.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder="Correct Answer"
              className="w-full border p-2 rounded"
              value={q.answer}
              onChange={(e) =>
                handleQuestionChange(idx, "answer", e.target.value)
              }
              required
            />
            {q.options.map((opt, optIdx) => (
              <input
                key={optIdx}
                type="text"
                placeholder={`Option ${optIdx + 1}`}
                className="w-full border p-2 rounded"
                value={opt}
                onChange={(e) => {
                  const updatedOptions = [...q.options];
                  updatedOptions[optIdx] = e.target.value;
                  handleQuestionChange(idx, "options", updatedOptions);
                }}
                required
              />
            ))}
          </div>
        ))}

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={addQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Question
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
