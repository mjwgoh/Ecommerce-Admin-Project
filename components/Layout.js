import Nav from "@/components/Nav";
import { Inter } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home({children}) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex bg-blue-400 w-screen h-screen text-center items-center justify-center">
        <div>
          <button
            onClick={() => signIn("google")}
            className="bg-white text-black rounded-lg p-3"
          >
            Login with Google
          </button>
        </div>{" "}
      </div>
    );
  }

  return (
    <div className="flex bg-blue-900 min-h-screen">
      <Nav></Nav>
      <div className="flex-grow bg-white mt-2 mr-2 rounded-lg p-5">{children}</div>
    </div>
  );
}
