"use client";

import { warnToast } from "@/components/atoms/Toast";
import { useUser } from "@/hooks/useUser";
import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext({
  socket: null,
});

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user, logout } = useUser();

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_API_ENDPOINT);
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (socket && user) {
      socket.emit("user-connected", { user: user._id });

      socket.on("new-session-started", () => {
        warnToast("Another user has logged in with these credentials");
        logout();
        socket.disconnect();
      });
    }

    return () => {
      if (!user) {
        socket?.disconnect();
      }
    };
  }, [socket, user]);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
