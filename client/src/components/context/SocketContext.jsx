import { useEffect } from "react";
import { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const newSocket = useMemo(() => {
    return io("http://localhost:3000", {
      withCredentials: true,
      // autoConnect: false,
      // transports: ["websocket"],
    });
  }, []);

  return (
    <SocketContext.Provider value={newSocket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
