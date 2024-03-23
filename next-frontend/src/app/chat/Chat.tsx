import { useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { Message } from "@/types";
import { useSocket } from "@/services/socket";

export const Chat = () => {
  const { messages } = useSocket();
  return (
    <section className="w-full flex flex-col gap-8">
      <h2 className="font-semibold text-xl">Chat with your follow students!</h2>
      <div className="flex flex-col gap-4">
        {messages.length === 0 ? (
          <p className="text-gray-600">No messages yet</p>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
      </div>
    </section>
  );
};
