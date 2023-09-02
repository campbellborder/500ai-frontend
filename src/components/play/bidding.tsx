import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Spade, Club, Diamond, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

function Bid({amount, suit}: {amount: string, suit: string}) {
  
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
      <Button variant="outline" className="w-8 sm:w-10 md:w-14 h-5 sm:h-6 md:h-9 p-0 sm:p-1 md:p-2 text-xs sm:text-sm md:text-lg sm:m-[3px] md:m-1 border-0">{amount}{icon}{!icon && suit}</Button>
    </div>
  )
}

export default function Bidding({isCurrent, currentUsername}: {isCurrent: boolean, currentUsername: string | null}) {

  const suits = ["S", "C", "D", "H", "NT"]
  const amounts = ["6", "7", "8", "9", "10"]
  const buttonClasses = "h-full p-2 border-0 text-xs md:text-base w-1/4"

  return (
    <div className="absolute text-center flex flex-col items-center">
      {isCurrent && (<>
      <p className="text-white sm:text-lg md:text-xl pb-2">It's your bid</p>
      <div className=" grid grid-cols-5 bg-white/80 rounded-xl p-3">
        {amounts.flatMap((amount, i) => (
          suits.map((suit, j) => (
            <Bid key={i*5 + j} suit={suit} amount={amount}></Bid>
          ))
        ))}
        <div className="h-9 col-span-5 flex justify-between m-1">
          <Button variant="outline" className={cn("", buttonClasses)}>Misere</Button>
          <Button variant="outline" className={cn("min-w-[40%]", buttonClasses)}>Open Misere</Button>
          <Button variant="outline" className={cn("bg-red-400 outline-red-400 hover:bg-red-400/60", buttonClasses)}>Pass</Button>
        </div>
      </div>
      </>)}
      {!isCurrent && (
        <p className="text-white sm:text-lg md:text-xl pb-2">Waiting for {currentUsername} to bid...</p>
      )}
    </div>
  )
}