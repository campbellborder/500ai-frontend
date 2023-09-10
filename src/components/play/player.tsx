import { cn, mod, splitBid } from "@/lib/utils";
import { Bot } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Player as PlayerType } from "@/lib/message-types";
import Hand from "./hand";
import Bids from "./bids";
import { stateContext } from "@/contexts/contexts";
import { Spade, Club, Diamond, Heart } from "lucide-react";

function BidSymbol({amount, suit}: {amount: string, suit: string}) {

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

export default function Player({ player, ourPosition }: { player: PlayerType, ourPosition: string }) {

  const widthPercent = 0.95
  const ratio = 0.33
  const positions = ["N", "E", "S", "W"]

  // if (typeof window == "undefined") {
  //   return null
  // }

  // Hooks
  const { state } = useContext(stateContext)
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxWidth = 600
  const smallestDim = Math.min(viewportWidth, viewportHeight)
  const playerWidth = Math.min(smallestDim * widthPercent, maxWidth);
  const playerHeight = playerWidth * ratio;

  const sizeStyle = {
    width: `${playerWidth}px`,
    height: `${playerHeight}px`,
  }

  const positionStyles = [
    {
      bottom: '0px',
      right: `${(viewportWidth - playerWidth) / 2}px`,
    },
    {
      top: `${((viewportHeight - playerWidth) / 2) - playerHeight}px`,
      left: '0px',
      transform: `rotate(90deg)`,
      transformOrigin: "bottom left",
    },
    {
      top: '0px',
      right: `${(viewportWidth - playerWidth) / 2}px`,
      transform: `rotate(180deg)`,
    },
    {
      top: `${(viewportHeight - playerWidth) / 2 - playerHeight}px`,
      right: '0px',
      transform: `rotate(-90deg)`,
      transformOrigin: "bottom right",
    }
  ];

  const positionIndex = mod(positions.indexOf(player.position) - positions.indexOf(ourPosition), 4);
  const positionStyle = positionStyles[positionIndex];

  var amount, suit: string
  if (player.declarer) {
    [amount, suit] = splitBid(state.contract)
  }

  return (
    <div className="absolute"
      style={{ ...sizeStyle, ...positionStyle }}>
        <div className="absolute w-full text-center text-white text-md md:text-xl mb-4 z-[0]" style={{ transform: `translateY(${playerHeight / 4}px) ${positionIndex == 2 ? "rotate(180deg)" : ""}` }}>
          {player.type == "ai" && (<span><Bot className="inline w-[20px] md:w-[25px] mb-1 md:mb-2" />{" "}</span>)}
          {player.username}
          {/* TODO: Fix logic below, MESSY! */}
          {player.host && <span>{" (Host)"}</span>}
          {player.tricks_won != -1 && (<> &#183; {player.tricks_won}</>)}
          {player.declarer && (
            <>
            {`/${amount} `}
            &#183;
            {" "}
            <div className="inline-block"><BidSymbol amount={amount!} suit={suit!}/></div>
            </>
          )}
        </div>
      <div className="relative h-full w-full flex flex-col items-center justify-end z-[1]" style={{ transform: `translateY(${playerHeight / 2}px)` }}>
        <Hand player={player} width={playerWidth} height={playerHeight}/>
      </div>
      {player.bids && (
        <Bids player={player} positionIndex={positionIndex} />
      )}
    </div>
  );
}