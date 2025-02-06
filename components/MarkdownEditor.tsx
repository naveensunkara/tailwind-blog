"use client";
import 'css/markdowneditor.css';
import { useState } from "react";

export default function MarkdownEditor() {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");

    const handlePublish = async () => {
        const response = await fetch("/api/publish", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content, title, tags }),
        });

        if (response.ok) {
            console.log(response);
            alert("Content published successfully!");
            setContent("");
            setTitle("");
            setTags("");
        } else {
            alert("Failed to publish content.");
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <input type="text" placeholder="Title" className="w-full p-2 border rounded-md mb-5" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <input type="text" placeholder="Add tags - trending, blog, AI" className="w-full p-2 border rounded-md mb-5" value={tags} onChange={(e) => setTags(e.target.value)}></input>
            <textarea
                className="w-full h-64 p-2 border rounded-md"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your markdown content here..."
            />
            <button onClick={handlePublish} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
                Publish
            </button>
        </div>
    );
}
