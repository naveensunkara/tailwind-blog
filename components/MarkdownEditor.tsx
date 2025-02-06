'use client'
import 'css/markdowneditor.css'
import { useState } from 'react'

export default function MarkdownEditor() {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')

  const handlePublish = async () => {
    const response = await fetch('/api/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, title, tags }),
    })

    if (response.ok) {
      alert('Content published successfully!')
      setContent('')
      setTitle('')
      setTags('')
    } else {
      alert('Failed to publish content.')
    }
  }

  return (
    <div className="flex flex-col items-center p-4">
      <input
        type="text"
        placeholder="Title"
        className="mb-5 w-full rounded-md border p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Add tags - trending, blog, AI"
        className="mb-5 w-full rounded-md border p-2"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      ></input>
      <textarea
        className="h-64 w-full rounded-md border p-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your markdown content here..."
      />
      <button onClick={handlePublish} className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white">
        Publish
      </button>
    </div>
  )
}
