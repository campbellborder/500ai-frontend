'use client'

import { ReactElement, useState } from 'react';
import { discardContext } from '@/contexts/contexts';

export default function DiscardProvider({children} : {children: ReactElement}) {

  // Hooks
  const [selectedCards, setSelectedCards] = useState<string[]>([])

  function selectCard(card: string) {
    if (selectedCards.length != 3) {
      var newSelectedCards = selectedCards.concat([card])
      setSelectedCards(newSelectedCards)
    }
  }

  function unselectCard(card: string) {
    if (selectedCards.includes(card)) {
      var newSelectedCards = selectedCards.slice()
      newSelectedCards.splice(selectedCards.indexOf(card), 1)
      setSelectedCards(newSelectedCards)
    }
  }

  function clearSelection() {
    setSelectedCards([])
  }

  return (
    <discardContext.Provider value={{selectedCards, selectCard, unselectCard, clearSelection}}>
      {children}
    </discardContext.Provider> 
  )
}