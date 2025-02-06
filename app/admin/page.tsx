import { auth, signIn } from '@/auth';
import MarkdownEditor from '@/components/MarkdownEditor';

export default async function Admin() {
    let session = await auth();
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <section className="w-full">
                {session ? (
                    <section className="flex">
                        <MarkdownEditor />
                    </section>
                    
                ) : (
                    <form
                        action={ async () => {
                            "use server";
                            await signIn("github")
                        }}
                    >
                        <p>You are not logged in</p>
                        <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg" type="submit">Sign in with Github</button>
                    </form>
                )}
            </section>
        </div>
    );
}
