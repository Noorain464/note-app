type NoteCardProps = {
  title: string;
  content: string;
  onEdit: () => void;
  onDelete: () => void;
};

async function summarizeNote(content: string): Promise<string> {
  const response = await fetch("https://api.deepseek.com/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${process.env.DEEPL_API_KEY}`,
    },
    body: JSON.stringify({ text: content }),
  });
  const data = await response.json();
  return data.summary;
}

export default function NoteCard({ title, content, onEdit, onDelete }: NoteCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-700 mt-2">{content}</p>
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}