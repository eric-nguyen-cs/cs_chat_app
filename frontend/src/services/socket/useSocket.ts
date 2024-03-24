"use client";

import { useContext } from "react";
import { SocketContext, SocketContextType } from "./socketContext";

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    console.error("No socket provider found!");
  }
  return context as SocketContextType;
};
