import { cn, splitBid } from "@/lib/utils";
import { BidSymbol } from "./bidding";
import { Player } from "@/lib/message-types";

function Bid({ bid, positionIndex }: { bid: string, positionIndex: number }) {

  const otherBids = ["P", "M", "OM"]
  var text: string
  var classes: string
  if (bid == "P") {
    text = "Pass"
    classes = "bg-green-500"
  } else if (bid == "M") {
    text = "Misere"
    classes = "bg-blue-500"
  } else if (bid == "OM") {
    text = "Open Misere"
    classes = "bg-blue-500"
  } else {
    classes = "bg-gray-100"
  }

  const positionClasses = [
    "",
    "-rotate-90 pb-5 pl-1",
    "rotate-180 pl-1",
    "rotate-90 pl-1 pt-4"
  ]
  const positionClass = positionClasses[positionIndex]

  var amount: string
  var suit: string
  if (!otherBids.includes(bid)) {
    [amount, suit] = splitBid(bid)
  }

  return (
    <div className={cn("w-[15%] h-full border-2 border-black border-b-0 -mr-10 rounded-t-lg drop-shadow", classes)}>
      <div className={cn("absolute top-0 left-0 w-7/12 h-7/12 text-xs font-bold text-center pt-1 flex justify-center items-center", positionClass)}>
        {!otherBids.includes(bid) && 
          <BidSymbol amount={amount!} suit={suit!} />
        }
        {otherBids.includes(bid) && <p className="p-1">{text!}</p>}
      </div>
    </div>
  )
}

export default function Bids({ player, positionIndex }: { player: Player, positionIndex: number }) {

  var classes: string = ""
  if (player.you) {
    classes = "-translate-y-[125%] z-[0]"
  }

  return (
    <div className={cn("absolute w-full h-1/3 bottom-0 left-1/2 -translate-x-1/2 z-[2]", classes)}>
      <div className="w-full h-full flex justify-center -translate-x-[5%]">
        {player.bids!.map((bid, i) => (
          <Bid key={i} bid={bid} positionIndex={positionIndex}></Bid>
        ))}
      </div>
    </div>
  )
}