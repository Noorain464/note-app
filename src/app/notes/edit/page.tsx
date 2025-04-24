"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function EditNoteContent() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams(); // Get query parameters
  const noteId = searchParams.get("id"); // Extract the note ID

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
      router.push("/notes/list"); // Redirect back to the notes list if the note is not found
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
      router.push("/notes/list"); // Redirect to the notes list page after updating
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-card p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        Edit Your Note
      </h1>
      <p className="text-center text-gray-400 mb-6 italic">
        "Refine your thoughts, one edit at a time."
      </p>
      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-3 w-full rounded bg-input text-foreground"
              placeholder="Enter note title"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-3 w-full rounded bg-input text-foreground h-40"
              placeholder="Enter note content"
            />
          </div>
          <button
            onClick={handleUpdateNote}
            disabled={loading}
            className={`w-full bg-primary text-white py-3 rounded hover:bg-primary-hover ${
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

export default function EditNote() {
  return (
    <Suspense fallback={<p className="text-center text-gray-400">Loading...</p>}>
      <EditNoteContent />
    </Suspense>
  );
}