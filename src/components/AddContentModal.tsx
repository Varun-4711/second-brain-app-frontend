import React, { useState } from "react";

const AddContentModal = ({
  isOpen,
  onClose,
  onAdd,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!title || !link) {
    alert("Please enter both a title and link.");
    return;
  }
  setLoading(true); // show loading text
  const token = localStorage.getItem("jwtToken");
  try {
    const res = await fetch("/api/v1/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        type: "video",
        title,
        link,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      }),
    });
    if (!res.ok) throw new Error("Failed to add content");
    setTitle("");
    setLink("");
    setTags("");
    onClose();
    onAdd();
  } catch (err) {
    alert("Error adding content!");
  } finally {
    setLoading(false); // hide loading text
  }
};


  return (
     /* Modal*/
    <div
      className={`fixed z-50 top-1/2 left-1/2 w-1/3 min-h-[250px] bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 ${
        isOpen
          ? "scale-100 opacity-100 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          : "scale-95 opacity-0 -translate-x-1/2 translate-y-full pointer-events-none"
      }`}
    >
      <button
        className="absolute top-4 right-4 text-gray-700 hover:text-black font-bold text-xl"
        onClick={onClose}
      >
        ×
      </button>
      <h2 className="text-lg font-semibold mb-4">Add Your Content</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="title"
          type="text"
          className="border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          name="link"
          type="url"
          className="border p-2 rounded"
          placeholder="YouTube Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <input
          name="tags"
          type="text"
          className="border p-2 rounded"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Loading..." : "Add Content"}
        </button>
      </form>
    </div>
  );
};

export default AddContentModal;
