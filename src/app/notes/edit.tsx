"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function EditNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const noteId = searchParams.get("id"); // Get the note ID from query parameters

  useEffect(() => {
    if (noteId) {
      fetchNote();
    }
  }, [noteId]);

  const fetchNote = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("notes")
      .select("title, content")
      .eq("id", noteId)
      .single();

    setLoading(false);

    if (error) {
      alert(`Error fetching note: ${error.message}`);
      router.push("/notes"); // Redirect back to the notes list if the note is not found
    } else {
      setTitle(data.title);
      setContent(data.content);
    }
  };

  const handleUpdateNote = async () => {
    if (!title || !content) {
      alert("Please fill in both the title and content.");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("notes")
      .update({ title, content })
      .eq("id", noteId);

    setLoading(false);

    if (error) {
      alert(`Error updating note: ${error.message}`);
    } else {
      alert("Note updated successfully!");
      router.push("/notes"); // Redirect to the notes list page after updating
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
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
            onClick={handleUpdateNote}
            disabled={loading}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Updating..." : "Update Note"}
          </button>
        </>
      )}
    </div>
  );
}