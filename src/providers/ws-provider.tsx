'use client'

import { ReactElement, useRef } from 'react';
import { wsContext } from '@/contexts/ws-context';

export default function WebSocketsProvider({children} : {children: ReactElement}) {

  const ws = useRef<WebSocket | null>(null)

  async function connectAsync(username: string, gamecode?: string) {

    return new Promise<void>((resolve, reject) => {

      // Construct url
      const url = new URL("ws://127.0.0.1:8000/")
      url.searchParams.append("username", username)
      if (gamecode) url.searchParams.append("gamecode", gamecode)

      console.log(`Attemping to connect to ${url.href}`)
      const socket = new WebSocket(url.href)

      socket.addEventListener("open", function(event) {
      })

      socket.addEventListener("message", function(event) {
        const data = JSON.parse(event.data);
        if (data.status === 'success') {
          console.log(`Connected to ${url.href}`)
          ws.current = socket;
          // Remove listeners
          // Add other listeners

          // Message: handle incoming information
          // Close/error: display error popup and go back to start state

          resolve();
        } else {
          reject({ reason: data.reason });
        }
      });
  
      socket.addEventListener("close", function (event) {
        console.log("Disconnected from WebSocket");
        reject({ reason: "Disconnected" });
      });
      
      socket.addEventListener("error", function (event) {
        console.log("Error connecting to WebSocket");
        reject({ reason: "Connection error" });
      });
    })
  }

  return (
    <wsContext.Provider value={{ws: ws, connect: connectAsync}}>
      {children}
    </wsContext.Provider> 
  )
}