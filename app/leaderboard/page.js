import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function LeaderboardPage() {
  const results = await prisma.result.findMany({
    include: {
      user: true,
      quiz: true,
    },
    orderBy: {
      score: "desc",
    },
  });

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">📊 Liderlər Cədvəli</h2>

      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">İstifadəçi</th>
            <th className="p-3 border">Quiz</th>
            <th className="p-3 border">Xal</th>
            <th className="p-3 border">Toplam</th>
            <th className="p-3 border">Tarix</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50">
              <td className="p-3 border">{r.user.email}</td>
              <td className="p-3 border">{r.quiz.title}</td>
              <td className="p-3 border font-semibold">{r.score}</td>
              <td className="p-3 border">{r.total}</td>
              <td className="p-3 border text-sm text-gray-500">
                {new Date(r.createdAt).toLocaleString("az-AZ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
