import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const otherSuits: {[key: string]: string} = {"H": "D", "D": "H", "C": "S", "S": "C"}
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export function splitBid(bid: string): [string, string] {
  if (bid == "M" || bid == "OM") {
    return ["10", bid]
  }
  const match = bid.match(/^(\d+)([a-zA-Z]+)$/);
  return [match![1], match![2]];
}

function isLeftBower(card: string, trumpSuit: string) {
  if (card[0] != "J") {
    return false
  }
  return otherSuits[card[1]] == trumpSuit
}

export function isTrump(card: string, bid: string) {
  if (card == "RJ") {
    return true
  } else if (!bid) {
    return false
  }

  const [_, trumpSuit] = splitBid(bid)

  if (["NT", "M", "OM"].includes(trumpSuit)) {
    return false
  } else if (card[1] == trumpSuit) {
    return true
  } else if (isLeftBower(card, trumpSuit)) {
    return true
  } else {
    return false
  }

}