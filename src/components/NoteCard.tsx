"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

type NoteCardProps = {
  id: string;
  title: string;
  content: string;
};

export default function NoteCard({ id, title, content }: NoteCardProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false); // Add loading state

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    setLoading(true); // Start loading
    const { error } = await supabase.from("notes").delete().eq("id", id);

    setLoading(false); // Stop loading
    if (error) {
      alert("Failed to delete note");
    } else {
      alert("Note deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    }
  };

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">{content}</p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => router.push(`/notes/edit?id=${id}`)}>
          Edit
        </Button>
        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
          {loading ? (
            <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            "Delete"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}