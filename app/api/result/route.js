import { prisma } from "@/lib/prisma";

export async function GET() {
  const results = await prisma.result.findMany({
    include: {
      user: true,
      quiz: true,
    },
    orderBy: {
      score: "desc",
    },
  });
  return new Response(JSON.stringify(results), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  try {
    const { quizId, score, total, userName, userId } = await req.json();
    await prisma.result.create({
      data: {
        quizId,
        userId: userId || null,
        userName: userName || "Anonymous",
        score,
        total,
      },
    });
    return new Response(
      JSON.stringify({ message: "Result saved successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Result POST error:", error);
    return new Response(
      JSON.stringify({ error: "Server error occurred." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
