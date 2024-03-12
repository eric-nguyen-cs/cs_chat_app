import { ChatMessage } from "./ChatMessage";

export const Chat = () => {
  const messages = [
    {
      id: 1,
      content: "Hello, world!",
      username: "user1",
      writtenAt: Date.now(),
    },
    {
      id: 2,
      content: "This is a message.",
      username: "user2",
      writtenAt: Date.now(),
    },
    {
      id: 3,
      content: "This is another message.",
      username: "user1",
      writtenAt: Date.now(),
    },
  ];
  return (
    <section className="w-full flex flex-col gap-8">
      <h2 className="font-semibold text-xl">Chat with your follow students!</h2>
      <div className="flex flex-col gap-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
    </section>
  );
};
