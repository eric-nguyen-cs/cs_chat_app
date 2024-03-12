import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Message {
  id: number;
  username: string;
  content: string;
  writtenAt: number;
}

function getFormattedDate(timestamp: number) {
  const date = new Date(timestamp);
  const options = {
    day: "numeric",
    month: "numeric",
    hour: "numeric",
    minute: "numeric",
  } as const;
  return date.toLocaleString("fr-FR", options);
}

export const ChatMessage = ({ message }: { message: Message }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <p className="font-semibold leading-none tracking-tight text-gray-800 text-sm">
          {message.username}
        </p>
        <p className="text-gray-500 text-sm tracking-tight">
          {getFormattedDate(message.writtenAt)}
        </p>
      </CardHeader>
      <CardContent>
        <p>{message.content}</p>
      </CardContent>
    </Card>
  );
};
