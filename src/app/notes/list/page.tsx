"use client";

import { useQuery } from "@tanstack/react-query";
import NoteCard from "@/components/NoteCard";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function NotesList() {
  const router = useRouter();

  const { data: notes, isLoading, error } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) {
        throw new Error("You must be logged in to view your notes.");
      }

      const userId = userData.user.id;

      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;
      return data || [];
    },
  });

  if (isLoading) return <p className="text-center">Loading notes...</p>;
  if (error) return <p className="text-center text-red-500">Error loading notes: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">My Notes</h1>
      <p className="text-center text-gray-400 mb-6 italic">
        "Capture your ideas, wherever you are."
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes?.map((note) => (
          <NoteCard key={note.id} id={note.id} title={note.title} content={note.content} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => router.push("/notes/create")}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover"
        >
          Add Note
        </button>
      </div>
    </div>
  );
}
