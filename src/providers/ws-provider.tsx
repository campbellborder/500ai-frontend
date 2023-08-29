'use client'

import { ReactElement, useContext, useRef } from 'react';
import { wsContext } from '@/contexts/ws-context';
import { addInitialEventListeners } from '@/lib/ws-utils';
import { stateContext } from '@/contexts/state-context';

export default function WebSocketsProvider({children} : {children: ReactElement}) {

  const { state, setState} = useContext(stateContext)
  const ws = useRef<WebSocket | null>(null);

  function addEventListeners() {
    if (ws.current) {
      ws.current.addEventListener("message", function(event: MessageEvent) {
        console.log("receieved message!")
        console.log(event.data);
      });
      ws.current.addEventListener("close", function(event: CloseEvent) {
        // Error popup
        setState("start");
        ws.current = null;
      });
      ws.current.addEventListener("error", function(event: Event) {
        // Error popup
        // Try to reconnect?
        setState("start");
        ws.current = null;
      });
    }
  }

  async function connectAsync(username: string, gamecode?: string) {

    return new Promise<void>((resolve, reject) => {

      // Construct url
      const url = new URL("ws://127.0.0.1:8000/")
      url.searchParams.append("username", username)
      if (gamecode) url.searchParams.append("gamecode", gamecode)
      
      // Connect to websocket
      console.log(`Attemping to connect to ${url.href}`)
      const socket = new WebSocket(url.href)

      // Add listeners
      addInitialEventListeners(ws, socket, url, resolve, reject, addEventListeners);
    })
  }

  return (
    <wsContext.Provider value={{ws: ws, connect: connectAsync}}>
      {children}
    </wsContext.Provider> 
  )
}