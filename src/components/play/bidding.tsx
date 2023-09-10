import { cn } from "@/lib/utils";
import { useContext } from "react";
import { wsContext } from "@/contexts/contexts";
import { Button } from "../ui/button";
import { Spade, Club, Diamond, Heart } from "lucide-react";

export function BidSymbol({amount, suit}: {amount: string, suit: string}) {

  var icon = null
  const redIconClasses = "-m-1 sm:-m-[1px] md:m-0 -[1px] h-3 sm:h-4 md:h-[1.125rem] text-red-500 fill-red-500"
  const blackIconClasses = "-m-1 sm:-m-[1px] md:m-0 h-3 sm:h-4 md:h-[1.125rem] text-black fill-black stroke-1"
  switch(suit) {
    case "S":
      icon = <Spade className={blackIconClasses}/>
      break
    case "C":
      icon = <Club className={blackIconClasses}/>
      break
    case "D":
      icon = <Diamond className={redIconClasses}/>
      break
    case "H":
      icon = <Heart className={redIconClasses}/>
      break
  }

  return (
    <div className="w-full h-full flex items-center justify-center text-xs sm:text-sm md:text-lg">
        {amount}
        {icon}
        {!icon && suit}
    </div>
  )
}

export function BidButton({amount, suit, valid, onClick}: {amount: string, suit: string, valid: boolean, onClick: (amount: string, suit: string) => void}) {
  
  var icon = null
  const redIconClasses = "-m-1 sm:-m-[1px] md:m-0 -[1px] h-3 sm:h-4 md:h-[1.125rem] text-red-500 fill-red-500"
  const blackIconClasses = "-m-1 sm:-m-[1px] md:m-0 h-3 sm:h-4 md:h-[1.125rem] text-black fill-black stroke-1"
  switch(suit) {
    case "S":
      icon = <Spade className={blackIconClasses}/>
      break
    case "C":
      icon = <Club className={blackIconClasses}/>
      break
    case "D":
      icon = <Diamond className={redIconClasses}/>
      break
    case "H":
      icon = <Heart className={redIconClasses}/>
      break
  }

  return (
    <div>
      <Button
        variant="outline"
        onClick={()=>onClick(amount, suit)}
        disabled={!valid}
        className="w-8 sm:w-10 md:w-14 h-5 sm:h-6 md:h-9 sm:m-[3px] md:m-1 border-0 text-xs sm:text-sm md:text-lg p-0"
      >
        <BidSymbol amount={amount} suit={suit}/>
      </Button>
    </div>
  )
}

export default function Bidding({isCurrent, currentUsername, validActions}: {isCurrent: boolean, currentUsername: string | null, validActions: string[]}) {

  // Constants
  const suits = ["S", "C", "D", "H", "NT"]
  const amounts = ["6", "7", "8", "9", "10"]
  const buttonClasses = "h-full p-2 border-0 text-xs md:text-base w-1/4"

  // Hooks
  const { ws } = useContext(wsContext)

  // Functions
  function isValid(action: string) {
    return validActions.includes(action)
  }

  function onBid(amount: string, suit: string) {
    ws.send(JSON.stringify({
      type: "update",
      phase: "play",
      action: {
        type: "make-bid",
        amount: amount,
        suit: suit
      }
    }))
  }

  function onPass() {
    ws.send(JSON.stringify({
      type: "update",
      phase: "play",
      action: {
        type: "pass"
      }
    }))
  }

  return (
    <div className="absolute text-center flex flex-col items-center">
      {isCurrent && (<>
      <p className="text-white sm:text-lg md:text-xl pb-2">It's your bid</p>
      <div className=" grid grid-cols-5 bg-white/80 rounded-xl p-3">
        {amounts.flatMap((amount, i) => (
          suits.map((suit, j) => {
            var action = amount + suit
            return <BidButton key={i*5 + j} suit={suit} amount={amount} valid={isValid(action)} onClick={onBid}/>
          })
        ))}
        <div className="h-9 col-span-5 flex justify-between m-1">
          <Button disabled={!isValid("M")} onClick={()=>onBid("", "M")} variant="outline" className={cn("", buttonClasses)}>Misere</Button>
          <Button disabled={!isValid("OM")} onClick={()=>onBid("", "OM")}variant="outline" className={cn("min-w-[40%]", buttonClasses)}>Open Misere</Button>
          <Button disabled={!isValid("P")} onClick={onPass} variant="outline" className={cn("bg-green-400 outline-green-400 hover:bg-green-400/60", buttonClasses)}>Pass</Button>
        </div>
      </div>
      </>)}
      {!isCurrent && (
        <p className="text-white sm:text-lg md:text-xl pb-2">Waiting for {currentUsername} to bid...</p>
      )}
    </div>
  )
}