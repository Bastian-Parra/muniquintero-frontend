// hooks/useSocket.js
import { useContext } from 'react';
import { SocketContext } from '../contexts/SocketContext.jsx';

export const useSocket = () => {
  const socket = useContext(SocketContext);
  
  const emitEvent = (event, data) => {
    if (socket) {
      socket.emit(event, data);
    } else {
      console.warn('Socket no conectado');
    }
  };

  return {
    socket,
    emitEvent
  };
};