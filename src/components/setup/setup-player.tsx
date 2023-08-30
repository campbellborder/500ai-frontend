import { cn, mod } from "@/lib/utils"
import { Button } from "../ui/button"

export function SetupPlayer({ player, position, onMove }: { player: any, position: string, onMove: (position: string) => void}) {

  const positions = ["N", "E", "S", "W"]
  const positionClasses = [
    "bottom-0 right-1/2 translate-x-1/2 justify-end",
    "top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 rotate-90 justify-end",
    "top-0 right-1/2 translate-x-1/2",
    "top-1/2 right-0 -translate-y-1/2 translate-x-1/4 -rotate-90 justify-end"
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
    <div className={cn("absolute w-1/2 h-1/4 text-center flex flex-col items-center overflow-hidden", positionClass)}>
      <h2 className={cn("text-center text-sm text-white m-1", positionIndex == 2 ? "order-2" : "order-1")}>
        {player.username}
        {player.host && <span>{" (Host)"}</span>}
      </h2>
      {player.type == "empty" && <Button onClick={() => onMove(player.position)} variant="outline" className={cn("h-8 w-28 bg-transparent text-white -mb-[1px] -mt-[1px]", buttonClass)}>Move here</Button>}
      {player.type != "empty" && <Button className={cn("h-8 w-28 bg-black disabled:opacity-100", buttonClass)} disabled></Button>}
    </div>
  )
}