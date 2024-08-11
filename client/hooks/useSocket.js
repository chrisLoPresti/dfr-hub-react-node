"use client";

import { useContext } from "react";
import { SocketContext } from "@/providers/socket/SocketContext";

export const useSocket = () => {
  const { socket } = useContext(SocketContext);

  return { socket };
};
