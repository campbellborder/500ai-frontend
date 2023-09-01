'use client'

import { ReactElement, useState } from 'react';
import { stateContext } from '@/contexts/state-context';

const dummy_state = {
  "type": "state",
  "phase": "play",
  "gamecode": "chickens",
  "players": [
      {
          "position": "N",
          "type": "human",
          "username": "cb",
          "host": true,
          "you": true,
          "hand": [
              "8H",
              "QD",
              "JC",
              "KS",
              "AC",
              "9C",
              "7H",
              "TH",
              "5D",
              "QH"
          ],
          "bids": [],
          "num_cards": 10
      },
      {
          "position": "E",
          "type": "ai",
          "username": "robot",
          "host": false,
          "you": false,
          "bids": [],
          "num_cards": 10
      },
      {
          "position": "S",
          "type": "ai",
          "username": "robot",
          "host": false,
          "you": false,
          "bids": [],
          "num_cards": 10
      },
      {
          "position": "W",
          "type": "ai",
          "username": "robot",
          "host": false,
          "you": false,
          "bids": [],
          "num_cards": 10
      }
  ],
  "round_phase": "bid",
  "scores": [
      0,
      0
  ],
  "last_bid": null
}

export default function StateProvider({children} : {children: ReactElement}) {

    // const [state, setState] = useState(dummy_state)
    const [state, setState] = useState({phase: "start"})

  return (
    <stateContext.Provider value={{state: state, setState: setState}}>
      {children}
    </stateContext.Provider> 
  )
}