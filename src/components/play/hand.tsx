import Card from "./card";

export default function Hand({cards, num, width, height}: {cards: string[] | undefined, num: number, width: number, height: number}) {
  if (!cards) {
    cards  = Array(num).fill("back");
  }

  const angleIncrement = 3;
  const heightIncrement = 1;
  const overlap = 75
  const minWidth = 50
  const cardWidth = Math.max(Math.min(Math.ceil(width * 4 / 13), Math.ceil(height * 9 / 14)), minWidth)
  const handTranslate = (width - cardWidth * (num + 3) / 4) / 2

  return (
    <div className="relative h-full mx-auto flex" style={{width: 13 * cardWidth, transform: `translateX(${handTranslate}px)`}}>
      {cards.map((card, i) => {
        const angle = (i-Math.floor(cards!.length / 2)) * angleIncrement;
        const translateY = Math.abs(i - cards!.length / 2 + 2)**1.9 * heightIncrement;
        const translateX = (overlap * i)
        return (
        <Card
          key={i}
          card={card}
          style={{
            zIndex: i,
            transform: `translateX(-${translateX}%) translateY(${translateY}px) rotate(${angle}deg`,
            width: cardWidth
          }}/>
      )})}
    </div>
  )
}