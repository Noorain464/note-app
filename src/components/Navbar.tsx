import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          Mini Notes App
        </Link>
        <div className="flex space-x-4">
          <Link href="/auth/login" className="hover:underline">
            Login
          </Link>
          <Link href="/auth/register" className="hover:underline">
            Register
          </Link>
          <Link href="/notes/list" className="hover:underline">
            My Notes
          </Link>
        </div>
      </div>
    </nav>
  );
}