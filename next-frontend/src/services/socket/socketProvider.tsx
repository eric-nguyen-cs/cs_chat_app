"use client";

import { apiUrl } from "@/services/environment";
import { PropsWithChildren, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { SocketContextType, SocketContext } from "./socketContext";
import { useAuthContext } from "../auth";

export const SocketProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const { token } = useAuthContext();

  useEffect(() => {
    const newSocket = io(apiUrl, { auth: { token } });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  const contextValue: SocketContextType = {
    socket,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
