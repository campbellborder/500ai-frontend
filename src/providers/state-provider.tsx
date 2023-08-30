'use client'

import { ReactElement, useState } from 'react';
import { stateContext } from '@/contexts/state-context';

export default function StateProvider({children} : {children: ReactElement}) {

    const [state, setState] = useState({state: "start"})

  return (
    <stateContext.Provider value={{state: state, setState: setState}}>
      {children}
    </stateContext.Provider> 
  )
}