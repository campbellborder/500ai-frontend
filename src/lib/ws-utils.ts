import { MutableRefObject } from "react"
import { AlertMessage } from "./message-types";

export function addInitialEventListeners(
  ws: MutableRefObject<WebSocket | null>,
  socket: WebSocket,
  url: URL,
  resolve: (value: void | PromiseLike<void>) => void,
  reject: (reason?: any) => void,
  addEventListeners: () => void
  ) {

  function removeInitialEventListeners(socket: WebSocket) {
    socket.removeEventListener("message", initialMessageEventListener)
    socket.removeEventListener("close", initialCloseEventListener)
    socket.removeEventListener("error", initialErrorEventListener)
  }

  function initialMessageEventListener(event: MessageEvent) {
    const data = JSON.parse(event.data);
    if (data.type == "connect" && data.status === 'success') {
      console.log(`Connected to ${url.href}`)
      ws.current = socket;
      removeInitialEventListeners(ws.current)
      addEventListeners()
      resolve();
    } else if (data.type == "connect" && data.reason) {
      reject({ reason: data.reason });
    } else {
      reject({ reason: `Expected connect response, got ${data}`})
    }
  }

  function initialCloseEventListener(event: CloseEvent) {
    console.log("Disconnected from WebSocket");
    reject({ reason: "Disconnected" });
  }

  function initialErrorEventListener(event: Event) {
    console.log("Error connecting to WebSocket");
    reject({ reason: "Connection error" });
  }

  socket.addEventListener("message", initialMessageEventListener)
  socket.addEventListener("close", initialCloseEventListener);
  socket.addEventListener("error", initialErrorEventListener);

}

export function displayAlertToast(toast: any, message: AlertMessage) {
  if (message.status == "player-joined") {
    toast({
      description: `${message.username} joined the game.`,
    })
  } else if (message.status == "player-left") {
    toast({
      description: `${message.username} left the game.`,
      variant: "destructive"
    })
  } else if (message.status == "new-host") {
    if (message.you) {
      toast({
        description: "You are now the host."
      })
    } else {
      toast({
        description: `${message.username} is now the host.`
      })
    }
  }
}

export function displayErrorToast(toast: any) {
  toast({
    description: "Something went wrong.",
    variant: "destructive"
  })
}