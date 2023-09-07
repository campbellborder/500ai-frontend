'use client'

import { ReactElement, useState } from 'react';
import { stateContext } from '@/contexts/contexts';

export default function StateProvider({ children }: { children: ReactElement }) {

  const [state, setState] = useState({type: "state", phase: "start" })

  return (
    <stateContext.Provider value={{ state: state, setState: setState }}>
      {children}
    </stateContext.Provider>
  )
}