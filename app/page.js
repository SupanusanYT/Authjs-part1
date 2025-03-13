"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700">Loading...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {status === "unauthenticated" ? (
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center px-6 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Image
              src={"/google.png"}
              alt="google"
              width={20}
              height={20}
              className="rounded"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              Sign in with Google
            </span>
          </button>
          <button
            onClick={() => signIn("github")}
            className="flex items-center justify-center px-6 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Image
              src={"/github.png"}
              alt="github "
              width={20}
              height={20}
              className="rounded"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              Sign in with GitHub
            </span>
          </button>
        </div>
      ) : (
        status === "authenticated" && (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-lg font-medium text-gray-700">
              Welcome, {session?.user?.name}!
            </p>
            <button
              onClick={() => signOut()}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Sign Out
            </button>
          </div>
        )
      )}
    </div>
  );
}
