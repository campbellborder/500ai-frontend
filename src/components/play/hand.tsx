import { useContext, useEffect } from "react";
import Card from "./card";
import { cardWidthContext, discardContext, stateContext } from "@/contexts/contexts";
import { Player } from "@/lib/message-types";
import { isTrump } from "@/lib/utils";

export default function Hand({player, width, height}: {player: Player, width: number, height: number}) {

  // Hooks
  const { setCardWidth } = useContext(cardWidthContext)
  const { selectedCards } = useContext(discardContext)
  const { state } = useContext(stateContext)

  const angleIncrement = 3;
  const heightIncrement = 1;
  const overlap = 75
  const minWidth = 50
  const cardWidth = Math.max(Math.min(Math.ceil(width * 4 / 13), Math.ceil(height * 9 / 14)), minWidth)
  const handTranslate = (width - cardWidth * (player.num_cards! + 3) / 4) / 2

  var cards: string[]
  if (!player.hand) {
    cards  = Array(player.num_cards).fill("back");
  } else {
    cards = player.hand
  }
  
  useEffect(() => {
    setCardWidth(cardWidth)
  }, [cardWidth])

  function isInvalid(card: string, selected: boolean) {
    if (card == "back") {
      return false
    } else if (state.round_phase == "discard") {
      return selectedCards.length == 3 && !selected
    } else if (state.round_phase == "play") {
      if (player.current) {
        return !player.actions!.includes(card)
      } else {
        return false
      }
    }
  }
  
  return (
    <div className="relative h-full mx-auto flex z-[3] pointer-events-none" style={{width: 13 * cardWidth, transform: `translateX(${handTranslate}px)`}}>
      {cards.map((card, i) => {
        const angle = (i - Math.floor(cards!.length / 2)) * angleIncrement;
        const translateY = Math.abs(i - cards!.length / 2 + 2)**1.9 * heightIncrement;
        const translateX = (overlap * i)
        const selected = selectedCards.includes(card)
        const invalid = isInvalid(card, selected)
        const trump = isTrump(card, state.contract)
        return (
          <div key={i} style={{
            zIndex: i,
            transform: `translateX(-${translateX}%) translateY(${translateY}px) rotate(${angle}deg`,
            width: cardWidth
          }}>
            <Card
              card={card}
              interactive={player.you && player.current}
              selected={selected}
              invalid={invalid}
              trump={trump}
              />
          </div>
      )})}
    </div>
  )
}