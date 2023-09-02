'use client'

import { useContext, useEffect } from "react"
import { wsContext } from "@/contexts/ws-context"
import { stateContext } from "@/contexts/state-context"
import { SetupPlayer } from "./setup-player"
import { Button } from "../ui/button"

interface Player {
  position: string,
  type: string,
  username?: string,
  host?: string,
  you?: string
}

export default function Setup() {

  const { state } = useContext(stateContext)
  const { ws, close } = useContext(wsContext)

  // Get host and position
  var isHost = false
  var our_position: string
  state.players.forEach((player: Player) => {
    if (player.you) {
      our_position = player.position
      if (player.host) {
        isHost = true
      }
    }
  })

  function onLeave() {
    close()
  }

  function onMove(position: string) {
    ws.send(JSON.stringify(
      {
        "type": "update",
        "phase": "setup",
        "action": {
          "type": "move-position",
          "position": position
        }
      }))
  }

  function onStart() {
    ws.send(JSON.stringify(
      {
        "type": "update",
        "phase": "setup",
        "action": {
          "type": "start-game"
        }
      }))
  }

  return (
    <div className="w-full flex-col text-center">
      
      <div className="w-full p-2 aspect-square bg-green-900 relative rounded-lg">
        {state.players.map((player: Player) => (
          <SetupPlayer player={player} position={our_position} key={player.position} onMove={onMove} />
        ))}
        <div className="absolute w-1/3 h-1/3 bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 flex flex-col justify-around items-center">
        <h3 className="w-full my-4 text-white text-xs">
          Game code: <br/>
          <span className="text-lg text-bold">{state.gamecode}</span>
        </h3>
        {<Button onClick={onLeave} variant="secondary" className="h-8 w-28 text-green-900">Leave</Button>}
        {isHost && <Button onClick={onStart} variant="secondary" className="h-8 w-28 my-2 text-green-900">Start game</Button>}
        {!isHost && <h3 className="w-full my-5 text-white text-xs">Waiting for host...</h3>}
        
        </div>
      </div>  
    </div>
  )
}