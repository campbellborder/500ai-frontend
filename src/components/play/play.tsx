'use client'

import { useContext } from "react"
import { wsContext, stateContext } from "@/contexts/contexts"
import { Player } from "@/lib/message-types"
import { Button } from "../ui/button"
import PlayerComponent from "./player"
import Bidding from "./bidding"
import Discarding from "./discarding"
import Trick from "./trick"

export default function Play() {

  const { state } = useContext(stateContext)
  const { close } = useContext(wsContext)

  console.log(state)

  // Get position and current
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

  // Get team
  const team = (thisPlayer!.position == "N" || thisPlayer!.position == "S") ? 0 : 1

  return (
    <div className="absolute flex items-center justify-center w-full h-full overflow-hidden">
      {state.players.map((player: Player) => (
        <PlayerComponent player={player} ourPosition={thisPlayer.position} key={player.position}/>
      ))}
      {state.round_phase == "bid" && (
        <Bidding isCurrent={thisPlayer!.current!} currentUsername={currentUsername!} validActions={thisPlayer!.actions!}/>
      )}
      {state.round_phase == "discard" && (
        <Discarding isCurrent={thisPlayer!.current!} currentUsername={currentUsername!}/>
      )}
      {state.round_phase == "play" && (
        <Trick cards={state.trick} ourPosition={thisPlayer!.position} leadPosition={state.lead}/>
      )}

      <div className="absolute top-0 left-0 text-white p-5">
        <p>Gamecode: {state.gamecode}</p>
      </div>
      <div className="absolute top-0 right-0 text-white p-5">
        <p>Score: {state.scores[team]} : {state.scores[1-team]}</p>
      </div>
      <div className="absolute bottom-0 left-0 p-5">
        <Button variant="outline" onClick={() => close()} disabled={false}>Leave</Button>
      </div>
    </div>
  )
}