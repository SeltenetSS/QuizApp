"use client";

import { useState, useEffect } from "react";

export default function LeaderboardPage() {
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    try {
      const res = await fetch("/api/result");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setResults(data);
    } catch {
      alert("Error loading results.");
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete?")) return;

    try {
      const res = await fetch(`/api/result/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      fetchResults();
    } catch {
      alert("Error occurred while deleting.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">📊 Leaderboard</h2>

      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border" />
            <th className="p-3 border">User</th>
            <th className="p-3 border">Quiz</th>
            <th className="p-3 border">Score</th>
            <th className="p-3 border">Total</th>
            <th className="p-3 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50">
              <td className="p-3 border">
                <button
                  onClick={() => handleDelete(r.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
              <td className="p-3 border">{r.userName || r.user?.email || "Anonymous"}</td>
              <td className="p-3 border">{r.quiz.title}</td>
              <td className="p-3 border font-semibold">{r.score}</td>
              <td className="p-3 border">{r.total}</td>
              <td className="p-3 border text-sm text-gray-500">
                {new Date(r.createdAt).toLocaleString("en-US")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
