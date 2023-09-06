'use client'

import { ReactElement, useContext, useRef } from 'react';
import { wsContext, stateContext, discardContext } from '@/contexts/contexts';
import { addInitialEventListeners, displayAlertToast, displayErrorToast } from '@/lib/ws-utils';
import { useToast } from '@/components/ui/use-toast';
import { Alert, Message, State } from '@/lib/message-types';

export default function WebSocketsProvider({children} : {children: ReactElement}) {

  // Hooks
  const { setState } = useContext(stateContext)
  const { clearSelection } = useContext(discardContext)
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
          setState(message as State)
        } else if (message.type == "alert") {
          displayAlertToast(toast, message as Alert)
        }
      });
      ws.current.addEventListener("close", function(event: CloseEvent) {
        if (!closed.current) {
          displayErrorToast(toast)
        }
        setState({phase: "start"});
        clearSelection()
        ws.current = null;
        closed.current = false
      });
      ws.current.addEventListener("error", function(event: Event) {
        displayErrorToast(toast)
        // TODO: Try to reconnect?
        setState({phase: "start"});
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