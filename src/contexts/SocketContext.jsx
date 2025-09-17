import { createContext, useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  const socketOptions = useMemo(() => ({
    path: "/pruebanodejs/api/socket.io",
    secure: true,
    transports: ['websocket'],
    autoConnect: false, // Control manual de conexión
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
  }), []);

  useEffect(() => {
    const socketInstance = io(import.meta.env.VITE_SOCKET_URL, socketOptions);
    
    // Manejo explícito de conexión
    socketInstance.connect();
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [socketOptions]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}