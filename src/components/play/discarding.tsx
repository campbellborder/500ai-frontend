import { useContext } from "react";
import { Button } from "../ui/button";
import { discardContext, wsContext } from "@/contexts/contexts";

export default function Discarding({isCurrent, currentUsername}: {isCurrent: boolean, currentUsername: string | null}) {

  const { selectedCards, clearSelection } = useContext(discardContext)
  const { ws } = useContext(wsContext)

  function onGo() {
    // Send play card messages
    selectedCards.foreach((card: string) => {
      ws.send(JSON.stringify({
        type: "update",
        phase: "play",
        action: {
          type: "play-card",
          card: card
        }
      }))
    })
    clearSelection()
  }

  return (
    <div className="text-center">
      {isCurrent && (
        <>
        <p className="text-white sm:text-lg md:text-xl pb-2">Choose three cards to discard</p>
        <Button variant="outline" disabled={selectedCards.length != 3} onClick={onGo}>Go</Button>
        </>
      )}

      {!isCurrent && (
        <p className="text-white sm:text-lg md:text-xl pb-2">Waiting for {currentUsername} to discard...</p>
      )}
    </div>
  )
}