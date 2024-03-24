"use client";

import { apiUrl } from "@/services/environment";
import { PropsWithChildren, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { SocketContextType, SocketContext } from "./socketContext";
import { useAuthContext } from "../auth";
import { Message } from "@/types";

export const SocketProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const { token } = useAuthContext();

  const addMessages = (newMessages: Message[]) => {
    setMessages((prevMessages) => [...prevMessages, ...newMessages]);
  };

  const deleteMessage = (messageId: number) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== messageId)
    );
  };

  useEffect(() => {
    const newSocket = io(apiUrl, { auth: { token } });
    newSocket.on("newMessages", addMessages);
    newSocket.on("deletedMessage", deleteMessage);

    setSocket(newSocket);

    return () => {
      setMessages([]);
      newSocket.off("newMessages", addMessages);
      newSocket.off("deletedMessage", deleteMessage);
      newSocket.disconnect();
    };
  }, [token]);

  const contextValue: SocketContextType = {
    socket,
    messages,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
