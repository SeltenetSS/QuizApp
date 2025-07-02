import { prisma } from "@/lib/prisma";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await prisma.result.delete({
      where: { id },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Result DELETE error:", error);
    return new Response(
      JSON.stringify({ error: "Error occurred while deleting." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
