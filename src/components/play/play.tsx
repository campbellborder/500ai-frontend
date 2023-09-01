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
  var isCurrent = false
  var our_position: string
  state.players.forEach((player: Player) => {
    if (player.you) {
      our_position = player.position
      if (player.current) {
        isCurrent = true
      }
    }
  })

  return (
    <div className="absolute w-full h-full overflow-hidden">
      {state.players.map((player: Player) => (
        <PlayerComponent player={player} our_position={our_position} key={player.position}/>
      ))}
      {state.round_phase == "bid" && isCurrent && (
        <Bidding/>
      )}      
    </div>
  )
}