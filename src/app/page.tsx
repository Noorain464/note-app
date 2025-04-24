import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-4xl font-extrabold text-primary mb-6">
        Welcome to Mini Notes App
      </h1>
      <p className="text-gray-400 text-lg mb-8 italic">
        "Capture your thoughts, organize your ideas, and never lose track of your inspiration."
      </p>
      <div className="flex justify-center space-x-4">
        <Link href="/auth/register">
          <button className="bg-secondary hover:bg-secondary-hover text-black px-6 py-3 rounded-lg font-semibold transition-colors">
            Register
          </button>
        </Link>
      </div>
      <div className="mt-12">
        <p className="text-gray-500 text-sm">
          "Your notes are safe, secure, and always accessible."
        </p>
        <p className="text-gray-500 text-sm">
          Start your journey of productivity today!
        </p>
      </div>
    </div>
  );
}
