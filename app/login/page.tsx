import { auth, signIn, signOut } from '@/auth';

function SignIn() {
  return (
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
  )
}

function SignOut({ session }) {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <img src={session.user.image} alt="Avatar" className="mx-auto mb-2 h-16 w-16 rounded-full" />
      <h2 className="text-xl font-semibold">{session.user.name}</h2>
      <p className="text-gray-600">{session.user.email}</p>
      <button className="mt-4 w-full rounded-lg bg-red-500 py-2 text-white" type="submit">
        Sign out
      </button>
    </form>
  )
}

export default async function GitHubLogin() {
  const session = await auth()
  const email = session?.user?.email;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <section>
        <div>{email ? <SignOut session={session} /> : <SignIn />}</div>
      </section>
    </div>
  )
}
