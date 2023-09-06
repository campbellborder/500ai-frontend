import { cn } from "@/lib/utils"
import { discardContext, stateContext } from "@/contexts/contexts"
import Image from "next/image"
import { useContext } from "react"

export default function Card({card, interactive = true, style}: {card: string, interactive: boolean, style: React.CSSProperties}) {
  
  const { state } = useContext(stateContext)
  const { selectedCards, selectCard, unselectCard } = useContext(discardContext)

  function onClick() {
    if (state.round_phase == "discard") {
      if (selectedCards.includes(card)) {
        unselectCard(card)
      } else {
        selectCard(card)
      }
    } else if (state.round_phase == "play") {

    }
  }

  var classes = ""
  if (card == "back" || interactive == false) {
    classes = "!pointer-events-none"
  } else if (state.round_phase == "discard") {
    if (selectedCards.includes(card)) {
      classes = "-translate-y-[9%] drop-shadow-lg"
    } else if (selectedCards.length == 3) {
        classes = "opacity-50 hover:!translate-y-0 hover:!cursor-default"
    }
  } else if (state.round_phase == "play") {

  }
  
  return (
    <div onClick={onClick} style={style} className="bg-gray-500 rounded-xl">
    <div
    className={cn("w-full h-full pointer-events-auto hover:cursor-pointer hover:-translate-y-[9%] transition-transform duration-200 ease-in-out hover:drop-shadow-lg", classes)}>
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