import { mod } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Player as PlayerType } from "@/lib/message-types";
import Hand from "./hand";

export default function Player({ player, our_position }: {player: PlayerType, our_position: string}) {

  const widthPercent = 0.95
  const ratio = 0.37
  const positions = ["N", "E", "S", "W"]

  // if (typeof window == "undefined") {
  //   return null
  // }

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

  const positionIndex = mod(positions.indexOf(player.position) - positions.indexOf(our_position), 4);
  const positionStyle = positionStyles[positionIndex];

  return (
    <div className="absolute" 
         style={{...sizeStyle, ... positionStyle}}>
      <div className="relative h-full w-full flex flex-col items-center justify-end " style={{transform: `translateY(${playerHeight/2}px)`}}>
      <div className="text-white text-xl pb-4">
        {player.username}
      </div>
      <Hand cards={player.hand!} num={player.num_cards} width={playerWidth} height={playerHeight}/>
      </div>
    </div>
  );
}