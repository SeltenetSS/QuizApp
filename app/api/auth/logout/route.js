import { cookies } from "next/headers";

export async function POST() {
  cookies().set("token", "", { maxAge: 0 });
  return Response.json({ message: "Çıxış edildi" });
}
