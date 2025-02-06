import { auth, signIn, signOut } from '@/auth';

function SignIn() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("github");
            }}
        >
            <p>You are not logged in</p>
            <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg" type="submit">Sign in with Github</button>
        </form>
    );
}

function SignOut({ session }) {
    return (
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            <img src={session.user.image} alt="Avatar" className="rounded-full w-16 h-16 mx-auto mb-2" />
            <h2 className="text-xl font-semibold">{session.user.name}</h2>
            <p className="text-gray-600">{session.user.email}</p>
            <button className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg" type="submit">Sign out</button>
        </form>
    );
}

export default async function GitHubLogin() {
    let session = await auth();
    let email = session?.user?.email;
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <section>
                <div>{email ? <SignOut session={session} /> : <SignIn />}</div>
            </section>
        </div>
    );
}
