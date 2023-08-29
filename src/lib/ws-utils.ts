import { MutableRefObject } from "react"

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
    if (data.status === 'success') {
      console.log(`Connected to ${url.href}`)
      ws.current = socket;
      removeInitialEventListeners(ws.current)
      addEventListeners()
      resolve();
    } else {
      reject({ reason: data.reason });
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