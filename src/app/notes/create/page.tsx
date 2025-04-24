"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateNote = async () => {
    if (!title || !content) {
      alert("Please fill in both the title and content.");
      return;
    }

    setLoading(true);

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      alert("You must be logged in to create a note.");
      setLoading(false);
      return;
    }

    const userId = userData.user.id;

    const { error } = await supabase.from("notes").insert([
      {
        title,
        content,
        user_id: userId,
      },
    ]);

    setLoading(false);

    if (error) {
      alert(`Error creating note: ${error.message}`);
    } else {
      alert("Note created successfully!");
      router.push("/notes/list");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Create a New Note</h1>
      <p className="text-center text-gray-400 mb-4">
        "Every great idea starts with a single note."
      </p>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-3 mb-4 w-full rounded"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-3 mb-4 w-full rounded"
        rows={5}
      />
      <button
        onClick={handleCreateNote}
        disabled={loading}
        className={`w-full bg-primary text-white py-2 rounded hover:bg-primary-hover ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Creating..." : "Create Note"}
      </button>
    </div>
  );
}