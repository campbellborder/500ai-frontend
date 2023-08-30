'use client'

import { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { wsContext } from '@/contexts/ws-context';
import { addInitialEventListeners, displayAlertToast, displayErrorToast } from '@/lib/ws-utils';
import { stateContext } from '@/contexts/state-context';
import { useToast } from '@/components/ui/use-toast';
import { AlertMessage, Message, StateMessage } from '@/lib/message-types';

export default function WebSocketsProvider({children} : {children: ReactElement}) {

  // Hooks
  const { setState } = useContext(stateContext)
  const ws = useRef<WebSocket | null>(null);
  const { toast } = useToast()
  const closed = useRef(false)

  function close() {
    if (ws.current) {
      closed.current = true
      ws.current.close()
    }
  }

  function addEventListeners() {
    if (ws.current) {
      ws.current.addEventListener("message", function(event: MessageEvent) {
        const message: Message = JSON.parse(event.data)
        if (message.type == "state") {
          setState(message as StateMessage)
        } else if (message.type == "alert") {
          displayAlertToast(toast, message as AlertMessage)
        }
      });
      ws.current.addEventListener("close", function(event: CloseEvent) {
        if (!closed.current) {
          displayErrorToast(toast)
        }
        setState({state: "start"});
        ws.current = null;
        closed.current = false
      });
      ws.current.addEventListener("error", function(event: Event) {
        displayErrorToast(toast)
        // TODO: Try to reconnect?
        setState({state: "start"});
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

      // Add initial listeners
      addInitialEventListeners(ws, socket, url, resolve, reject, addEventListeners);
    })
  }

  return (
    <wsContext.Provider value={{ws: ws.current, connect: connectAsync, close: close}}>
      {children}
    </wsContext.Provider> 
  )
}