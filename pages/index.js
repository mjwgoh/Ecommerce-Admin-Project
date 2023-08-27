import { Inter } from "next/font/google";
import Layout from "@/components/Layout";

import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="flex justify-between">
        <h1>
          Hello, <b>{session?.user?.name}</b>
          {/* If there is a session (i.e. '?'), and if there is a user (i.e. '?), then show session.user.name */}
        </h1>
        <div className="flex bg-gray-300 gap-2 pr-2 rounded-md overflow-hidden">
          <img src={session?.user?.image} className="w-6 h-6"></img>
          {session?.user?.name}
        </div>
      </div>
    </Layout>
  );
}
