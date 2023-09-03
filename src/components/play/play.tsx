'use client'

import { useContext, useEffect, useState } from "react"
import { stateContext } from "@/contexts/state-context"
import { Player } from "@/lib/message-types"
import PlayerComponent from "./player"
import Bidding from "./bidding"

export default function Play() {

  const { state } = useContext(stateContext)
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

  return (
    <div className="absolute flex items-center justify-center w-full h-full overflow-hidden">
      {state.players.map((player: Player) => (
        <PlayerComponent player={player} our_position={thisPlayer.position} key={player.position}/>
      ))}
      {state.round_phase == "bid" && (
        <Bidding isCurrent={thisPlayer!.current!} currentUsername={currentUsername!} validActions={thisPlayer!.actions!}/>
      )}
      {state.round_phase == "play" && (
        //Trick
        null
      )}
      {
        // Gamecode
        // Score
        // Leave button
      }
    </div>
  )
}