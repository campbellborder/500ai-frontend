import { cn, isTrump, mod } from "@/lib/utils"
import { useContext } from "react"
import { cardWidthContext, stateContext } from "@/contexts/contexts"
import Card from "./card"

export default function Trick({cards, ourPosition, leadPosition}: {cards: string[], ourPosition: string, leadPosition: string}) {

  // Constants
  const positions = ["N", "E", "S", "W"]
  const positionClasses = [
    "right-1/2 top-1/2 rotate-[20deg] translate-x-1/2",
    "right-1/2 bottom-1/2 rotate-[85deg] translate-y-1/2",
    "left-1/2 bottom-1/2 rotate-[195deg] -translate-x-1/2",
    "left-1/2 top-1/2 rotate-[280deg] -translate-y-1/2",
  ]

  // Hooks
  const { cardWidth } = useContext(cardWidthContext)
  const { state } = useContext(stateContext)

  const leadIndex = positions.indexOf(leadPosition)

  return (<div className="w-1/3 h-1/3">
    {cards.map((card, i) => {
      if (card) {
        const positionIndex = mod(i - positions.indexOf(ourPosition), 4);
        const positionClass = positionClasses[positionIndex]
        const zIndex = mod(i - leadIndex, 4);
        const trump = isTrump(card, state["contract"])
        return (
          <div className={cn("absolute", positionClass)} style={{zIndex: zIndex}}>
            <Card key={i} card={card} interactive={false} trump={trump} style={{width: cardWidth}}/>
          </div>
        )
      }
    })}
  </div>)
}