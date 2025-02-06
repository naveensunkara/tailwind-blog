import { auth, signIn } from '@/auth'
import MarkdownEditor from '@/components/MarkdownEditor'

export default async function Admin() {
  const session = await auth()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <section className="w-full">
        {session ? (
          <section className="flex">
            <MarkdownEditor />
          </section>
        ) : (
          <form
            action={async () => {
              'use server'
              await signIn('github')
            }}
          >
            <p>You are not logged in</p>
            <button className="mt-4 w-full rounded-lg bg-green-500 py-2 text-white" type="submit">
              Sign in with Github
            </button>
          </form>
        )}
      </section>
    </div>
  )
}
