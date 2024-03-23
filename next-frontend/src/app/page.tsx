"use client";

import { AddMessage } from "./chat/AddMessage";
import { Chat } from "./chat/Chat";
import Header from "./header/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />

      <Chat />

      <AddMessage />
    </main>
  );
}
