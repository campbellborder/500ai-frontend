import Image from "next/image"

export default function Card({card, style}: {card: string, style: React.CSSProperties}) {
  return (
    <div style={style}>
    <div className="w-full h-full hover:cursor-pointer hover:-translate-y-[9%] transition-transform duration-200 ease-in-out hover:drop-shadow-lg">
      <Image
        priority
        src={`/cards/${card}.svg`}
        alt={card}
        width="180"
        height="280"
      />
    </div>
    </div>
  )
}