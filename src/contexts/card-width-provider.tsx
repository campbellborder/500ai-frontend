'use client'

import { ReactElement, useState } from 'react';
import { cardWidthContext } from '@/contexts/contexts';

export default function CardWidthProvider({children} : {children: ReactElement}) {

  // Hooks
  const [cardWidth, setCardWidth] = useState<number>(0)

  return (
    <cardWidthContext.Provider value={{cardWidth, setCardWidth}}>
      {children}
    </cardWidthContext.Provider> 
  )
}