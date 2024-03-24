"use client";

import { Message } from "@/types";
import { createContext } from "react";
import { Socket } from "socket.io-client";

export interface SocketContextType {
  socket: Socket | null;
  messages: Message[];
}

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined
);
