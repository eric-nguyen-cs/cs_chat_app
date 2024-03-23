"use client";

import { AddMessage } from "./chat/AddMessage";
import { Chat } from "./chat/Chat";
import { useSocket } from "@/services/socket";
import Header from "./header/Header";
import { useAuthContext } from "@/services/auth";
import { redirect } from "next/navigation";

export default function Home() {
  const { username } = useAuthContext();
  const { socket } = useSocket();

  if (!username) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />

      {!socket ? (
        <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Connecting to server...
        </p>
      ) : (
        <>
          <Chat />

          <AddMessage socket={socket} />
        </>
      )}
    </main>
  );
}
