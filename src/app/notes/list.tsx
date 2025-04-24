"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";
import NoteCard from "@/components/NoteCard";

type Note = {
  id: string;
  title: string;
  content: string;
};

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NotesList() {
  // Fetch notes using React Query
  const { data: notes, isLoading, error } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: async () => {
        const user = await supabase.auth.getUser();
        if (!user.data.user) throw new Error("User not authenticated");
      
        const { data, error } = await supabase
          .from("notes")
          .select("*")
          .eq("user_id", user.data.user.id);
      
        if (error) throw new Error(error.message);
        return data || [];
      },
  });

  const handleEdit = (id: string) => {
    alert(`Edit note with ID: ${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) {
      alert("Failed to delete note");
    } else {
      alert("Note deleted successfully");
    }
  };

  if (isLoading) return <p>Loading notes...</p>;
  if (error) return <p>Error loading notes: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(notes ?? []).map((note) => (
          <NoteCard
            key={note.id}
            title={note.title}
            content={note.content}
            onEdit={() => handleEdit(note.id)}
            onDelete={() => handleDelete(note.id)}
          />
        ))}
      </div>
    </div>
  );
}