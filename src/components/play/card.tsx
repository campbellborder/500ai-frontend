import { cn } from "@/lib/utils"
import { discardContext, stateContext, wsContext } from "@/contexts/contexts"
import Image from "next/image"
import { useContext } from "react"

// Important that invalid are still set to interactive
export default function Card({card, interactive = true, invalid = false, selected = false, trump = false}: 
  {card: string, interactive?: boolean, invalid?: boolean, selected?: boolean, trump?: boolean}) {
  
  const { state } = useContext(stateContext)
  const { selectedCards, selectCard, unselectCard } = useContext(discardContext)
  const { ws } = useContext(wsContext)

  function onClick() {
    if (!interactive) {
      return
    }
    if (state.round_phase == "discard") {
      if (selectedCards.includes(card)) {
        unselectCard(card)
      } else {
        selectCard(card)
      }
    } else if (state.round_phase == "play") {
      ws.send(JSON.stringify({
        type: "update",
        phase: "play",
        action: {
          type: "play-card",
          card: card
        }
      }))
    }
  }

  var classes = ""
  var bgClasses = ""
  if (card == "back" || interactive == false) {
    classes = cn(classes, "!pointer-events-none")
  } else {
    classes = cn(classes, "")
    bgClasses = cn(bgClasses, "pointer-events-auto hover:cursor-pointer hover:-translate-y-[9%] transition-transform duration-200 ease-in-out hover:drop-shadow-lg")
  }
  if (selected) {
    classes = cn(classes, "-translate-y-[9%] drop-shadow-lg")
  }
  if (trump) {
    classes = cn(classes, "opacity-[87%]")
    bgClasses = cn(bgClasses, "bg-yellow-400")
  }
  if (invalid) {
    classes = cn(classes, "!opacity-50 hover:!translate-y-0 hover:!cursor-default")
    bgClasses = cn(bgClasses, "bg-gray-500")
  }

  if (trump && invalid) {
    bgClasses = cn(bgClasses, "!bg-[#AC9B4F]")
  }



  return (
    <div onClick={onClick}className={cn("bg-gray-600 rounded-[10px]", bgClasses)}>
    <div
    className={cn("w-full h-full", classes)}>
      <Image
        priority
        src={`/cards/${card}.svg`}
        alt={card}
        width="180"
        height="280"
      />
    </div>
    </div>
  )
}