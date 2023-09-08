'use client'

// Imports
import { useContext } from "react"
import { wsContext, stateContext } from "@/contexts/contexts"
import { Player } from "@/lib/message-types"

// Component imports
import { Button } from "@/components/ui/button"

export default function Over() {

  const positions = ["N", "E", "S", "W"]

  const { state } = useContext(stateContext)
  const { ws, close } = useContext(wsContext)

  console.log(state)

  // Get player and winner
  var currentUsername: string
  var thisPlayer: Player
  state.players.forEach((player: Player) => {
    if (player.you) {
      thisPlayer = player
    } else {
      if (player.current) {
        currentUsername = player.username
      }
    }
  })

  const positionIndex = positions.indexOf(thisPlayer!.position)
  const ourScore = state.scores[positionIndex % 2]
  const ourClass = ourScore <= -500 || ourScore >= 500 ? "font-bold" : ""
  const theirScore = state.scores[(positionIndex + 1) % 2]
  const theirClass = theirScore <= -500 || theirScore >= 500 ? "font-bold" : ""
  

  function onNewGame() {
    ws.send(JSON.stringify(
      {
        type: "update",
        phase: "over",
        action: {
          type: "new-game"
        }
      }))
  }

return (
  <>
  <div className="text-center p-2 m-4">
    {thisPlayer!.winner && (
        <p>You won!</p>
    )}
    {!thisPlayer!.winner && (
        <p>You lost!</p>
    )}
    <p><span className={ourClass}>{ourScore}</span> : <span className={theirClass}>{theirScore}</span></p>
  </div>
  <div className="flex justify-around items-center">
    <Button onClick={close} className="w-1/2 mx-2">Leave</Button>
    <Button onClick={onNewGame} className="bg-green-900 w-1/2 mx-2">New game</Button>
  </div>
  </>
)
}