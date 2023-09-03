import { cn } from "@/lib/utils";
import { BidSymbol } from "./bidding";

function Bid({ bid }: { bid: string }) {

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

  function splitBid(bid: string) {
    const match = bid.match(/^(\d+)([a-zA-Z]+)$/);
    return [match![1], match![2]];
  }

  var amount: string
  var suit: string
  if (!otherBids.includes(bid)) {
    [amount, suit] = splitBid(bid)
  }


  return (
    <div className={cn("w-[15%] h-full border-2 border-black border-b-0 -mr-10 rounded-t-lg drop-shadow", classes)}>
      <div className="absolute top-0 left-0 w-7/12 h-7/12 text-xs font-bold text-center pt-1">
        {!otherBids.includes(bid) && 
          <BidSymbol amount={amount!} suit={suit!} />
        }
        {otherBids.includes(bid) && text!}
      </div>
    </div>
  )
}

export default function Bids({ bids, you }: { bids: string[], you: boolean }) {

  var classes: string = ""
  if (you) {
    classes = "-translate-y-[125%] z-[0]"
  }

  return (
    <div className={cn("absolute w-full h-1/3 bottom-0 left-1/2 -translate-x-1/2 z-[2]", classes)}>
      <div className="w-full h-full flex justify-center -translate-x-[5%]">
        {bids.map((bid, i) => (
          <Bid key={i} bid={bid}></Bid>
        ))}
      </div>
    </div>
  )
}