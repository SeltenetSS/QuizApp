import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { quizId, score, total, userId } = await req.json();

    // userId gəlməsə undefined ola bilər, problem deyil
    await prisma.result.create({
      data: {
        quizId,
        userId: userId || null, // ya gələn userId, ya null
        score,
        total,
      },
    });

    return new Response(
      JSON.stringify({ message: "Nəticə yadda saxlanıldı" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Result POST error:", error);
    return new Response(
      JSON.stringify({ error: "Serverdə xəta baş verdi." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
