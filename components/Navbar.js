"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const hideNavbarRoutes = ["/login", "/register"];

  if (hideNavbarRoutes.includes(pathname)) return null;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">
        <Link href="/admin/quizzes" className="hover:underline">
          Quiz App
        </Link>
      </div>
      <div className="flex gap-4">
        <Link href="/admin/add-quiz" className="hover:underline">
          Add Quiz
        </Link>
        <Link href="/admin/quizzes" className="hover:underline">
          Quizzes
        </Link>
        <Link href="/leaderboard" className="hover:underline">
          Leaderboard
        </Link>
        
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
