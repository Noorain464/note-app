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

    const { data, error } = await supabase
      .from("notes")
      .insert([{ title, content }]);

    setLoading(false);

    if (error) {
      alert(`Error creating note: ${error.message}`);
    } else {
      alert("Note created successfully!");
      router.push("/notes"); // Redirect to the notes list page
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Note</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter note title"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full h-32"
          placeholder="Enter note content"
        />
      </div>
      <button
        onClick={handleCreateNote}
        disabled={loading}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Creating..." : "Create Note"}
      </button>
    </div>
  );
}