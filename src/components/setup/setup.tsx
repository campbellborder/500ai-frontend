'use client'

import { cn, mod } from "@/lib/utils"
import { Button } from "../ui/button"

const state = {
  gamecode: "12345678",
  players: [
    {
      position: "N",
      type: "empty",
    },
    {
      position: "E",
      type: "human",
      username: "thc-lane",
      host: false,
      you: false
    },
    {
      position: "S",
      type: "human",
      username: "garyrolls",
      host: true,
      you: true
    },
    {
      position: "W",
      type: "empty",
    }
  ]
}

function PlayerSetup({ player, position }: { player: any, position: string }) {

  const positions = ["N", "E", "S", "W"]
  const positionClasses = [
    "bottom-0 right-1/2 translate-x-1/2 justify-end",
    "top-1/2 left-0 -translate-y-1/2 rotate-90 justify-end",
    "top-0 right-1/2 translate-x-1/2",
    "top-1/2 right-0 -translate-y-1/2 -rotate-90 justify-end"
  ]

  const buttonClasses = [
    "rounded-b-none order-2",
    "rounded-b-none order-2",
    "rounded-t-none order-1",
    "rounded-b-none order-2",
  ]

  const positionIndex = mod(positions.indexOf(player.position) - positions.indexOf(position), 4)
  const positionClass = positionClasses[positionIndex]
  const buttonClass = buttonClasses[positionIndex]

  return (
    <div className={cn("absolute w-1/3 h-1/3 text-center flex flex-col items-center overflow-hidden", positionClass)}>
      <h2 className={cn("text-center text-sm text-white m-1", positionIndex == 2 ? "order-2" : "order-1")}>
        {player.username}
        {player.host && <span>{" (Host)"}</span>}
      </h2>
      {player.type == "empty" && <Button variant="outline" className={cn("h-8 w-28 bg-transparent text-white -mb-[1px] -mt-[1px]", buttonClass)}>Move here</Button>}
      {player.type != "empty" && <Button className={cn("h-8 w-28 bg-black disabled:opacity-100", buttonClass)} disabled></Button>}
    </div>
  )
}

export default function Setup() {

  // Get host and position
  var isHost = false
  var position: string
  state.players.forEach((player) => {
    if (player.you) {
      position = player.position
      if (player.host) {
        isHost = true
      }
    }
  })

  return (
    <div className="w-full flex-col text-center">
      
      <div className="w-full p-2 aspect-square bg-green-900 relative rounded-lg">
        {state.players.map((player) => (
          <PlayerSetup player={player} position={position} key={player.position} />
        ))}
        <div className="absolute w-1/3 h-1/3 bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 flex flex-col justify-around">
        <h3 className="w-full my-4 text-white">Game code: {state.gamecode}</h3>
        {isHost && <Button variant="secondary" className="h-8 mx-auto my-2 text-green-900">Start game</Button>}
        {!isHost && <h3 className="w-full my-4 text-white">Waiting for host...</h3>}
        </div>
      </div>  
    </div>
  )
}