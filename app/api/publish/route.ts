import fs from 'fs'
import path from 'path'

export async function POST(req) {
  const { content, title, tags } = await req.json()
  const trimmedTags = tags.split(',').map((tag) => tag.trim())

  if (!content || !title) {
    return new Response('Content or Title cannot be empty', { status: 400 })
  }
  const metaData = `
    ---
    title: ${title}
    date: ${new Date().toLocaleDateString()}
    tags: ${JSON.stringify(trimmedTags)}
    draft: false
    ---
  `

  const filePath = path.join(
    process.cwd(),
    'data',
    'blog',
    `${title.toLowerCase().replace(/\s+/g, '-')}.mdx`
  )
  fs.writeFileSync(filePath, `${metaData}<br />${content}`)

  return new Response('/blog/' + title.toLowerCase().replace(/\s+/g, '-'), { status: 200 })
}
