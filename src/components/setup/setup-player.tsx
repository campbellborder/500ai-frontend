import { cn, mod } from "@/lib/utils"
import { Button } from "../ui/button"
import Card from "../play/card"

export default function SetupPlayer({ player, position: our_position, onMove }: { player: any, position: string, onMove: (position: string) => void}) {

  const positions = ["N", "E", "S", "W"]
  const positionClasses = [
    "bottom-0 right-1/2 translate-x-1/2",
    "top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 rotate-90",
    "top-0 right-1/2 translate-x-1/2 rotate-180",
    "top-1/2 right-0 -translate-y-1/2 translate-x-1/4 -rotate-90"
  ]

  const positionIndex = mod(positions.indexOf(player.position) - positions.indexOf(our_position), 4)
  const positionClass = positionClasses[positionIndex]

  return (
    <div className={cn("absolute w-1/2 h-1/4 text-center flex flex-col items-center overflow-hidden justify-end", positionClass)}>
      <h2 className={cn("text-center text-sm text-white m-1", positionIndex == 2 ? "rotate-180" : "")}>
        {player.username}
        {player.host && <span>{" (Host)"}</span>}
      </h2>
      {player.type == "empty" && <Button onClick={() => onMove(player.position)} variant="outline" className="h-8 w-28 bg-transparent text-white rounded-b-none border-b-0">Move here</Button>}
      {player.type != "empty" && <div className="w-28 h-8"><Card card="back"/></div>}

    </div>
  )
}