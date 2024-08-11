"use client";

import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext({
  socket: null,
});

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_API_ENDPOINT);
    setSocket(newSocket);
  }, []);

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
