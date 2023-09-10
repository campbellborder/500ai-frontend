import { cn, splitCard } from "@/lib/utils"
import { discardContext, stateContext, wsContext } from "@/contexts/contexts"
import { useContext, useState } from "react"
import Image from "next/image"

import { BidButton } from "./bidding"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Player } from "@/lib/message-types"

function SelectSuitDialog({open, valid_suits, onSelect}: {open: boolean, valid_suits: string[], onSelect: (suit: string)=> void}) {

  const suits = ["S", "C", "D", "H"]

  return (
  <AlertDialog open={open}>
    {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
    <AlertDialogContent className="">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-center">Select a suit</AlertDialogTitle>
      </AlertDialogHeader>
      <div className="mx-auto grid grid-cols-2">
        {suits.map((suit: string, i: number) => (
          <BidButton amount="" suit={suit} valid={valid_suits.includes(suit)} onClick={() => onSelect(suit)} key={i} />
        ))}
        </div>
    </AlertDialogContent>
  </AlertDialog>)
}


// Important that invalid are still set to interactive
export default function Card({ card, interactive = true, invalid = false, selected = false, trump = false, player = null }:
  { card: string, interactive?: boolean, invalid?: boolean, selected?: boolean, trump?: boolean, player?: Player | null } ) {

  const { state } = useContext(stateContext)
  const { selectedCards, selectCard, unselectCard } = useContext(discardContext)
  const { ws } = useContext(wsContext)
  const [ open, setOpen ] = useState<boolean>(false)
  const [ suits, setSuits] = useState<string[]>([])

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
      var rank: string, suit: string
      if (card == "RJ") {
        const suits = player!.actions!.filter((action) => action.length == 3).map((action) => action[2]) // Third character of three char actions
        if (suits.length > 1) {
          setSuits(suits)
          setOpen(true)
          return
        } else {
          [rank, suit] = [card, suits[0]]
        }
      } else {
        [rank, suit] = splitCard(card)
      }

      ws.send(JSON.stringify({
      type: "update",
      phase: "play",
      action: {
        type: "play-card",
        rank: rank,
        suit: suit
      }
      }))
    }
  }

  function onSelect(suit: string) {
    setOpen(false)
    setSuits([])
    ws.send(JSON.stringify({
      type: "update",
      phase: "play",
      action: {
        type: "play-card",
        rank: "RJ",
        suit: suit
      }
      }))
  }

  var classes = ""
  var bgClasses = ""
  if (interactive) {
    bgClasses = cn(bgClasses, "pointer-events-auto hover:cursor-pointer hover:-translate-y-[9%] transition-transform duration-200 ease-in-out hover:drop-shadow-lg")
  }
  if (selected) {
    classes = cn(classes, "")
    bgClasses = cn(bgClasses, "-translate-y-[9%] drop-shadow-lg")
  }
  if (trump) {
    classes = cn(classes, "opacity-[87%]")
    bgClasses = cn(bgClasses, "bg-yellow-400")
  }
  if (invalid) {
    classes = cn(classes, "!opacity-50")
    bgClasses = cn(bgClasses, "bg-gray-500 hover:!translate-y-0 hover:!cursor-default hover:!drop-shadow-none")
  }
  if (trump && invalid) {
    bgClasses = cn(bgClasses, "!bg-[#AC9B4F]")
  }

  return (
    <>
    <div onClick={onClick} className={cn("bg-gray-600 rounded-[10px]", bgClasses)}>
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
    <SelectSuitDialog open={open} valid_suits={suits} onSelect={onSelect}/>
    </>
  )
}