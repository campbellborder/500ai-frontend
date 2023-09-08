import { cn, mod, splitBid } from "@/lib/utils";
import { Bot } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Player as PlayerType } from "@/lib/message-types";
import Hand from "./hand";
import Bids from "./bids";
import { stateContext } from "@/contexts/contexts";

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
          {player.host && <span>{" (Host)"}</span>}
          {player.tricks_won != -1 && (player.tricks_won != undefined) && (<> &#183; {player.tricks_won}</>)}
          {player.declarer && `/${amount}`}
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