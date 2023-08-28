'use client'

import { ReactElement, useRef, useEffect } from 'react';
import { wsContext } from '@/contexts/ws-context';

export default function WebSocketsProvider({children} : {children: ReactElement}) {

  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/");

    socket.addEventListener("open", function (event) {
      console.log("Connected to the WebSocket");
    });

    socket.addEventListener("message", function (event) {
      console.log("Received:", event.data);
    });

    socket.addEventListener("close", function (event) {
      console.log("Disconnected from WebSocket");
    });

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  return (
    <wsContext.Provider value={ws.current}>
      {children}
    </wsContext.Provider> 
  )
}