'use client'

import { ReactElement, useState } from 'react';
import { stateContext } from '@/contexts/contexts';

const playing = {
  "type": "state",
  "phase": "play",
  "gamecode": "maxywaxy",
  "players": [
      {
          "position": "E",
          "type": "human",
          "username": "cb",
          "host": true,
          "you": true,
          "current": true,
          "num_cards": 10,
          "hand": [
              "8D",
              "AS",
              "TC",
              "AC",
              "9S",
              "6C",
              "KS",
              "RJ",
              "8S",
              "7D"
          ],
          "actions": [
              "TC",
              "AC",
              "6C",
              "RJ"
          ]
      },
      {
          "position": "S",
          "type": "ai",
          "username": "awesom-o-4000",
          "host": false,
          "you": false,
          "current": false,
          "num_cards": 9
      },
      {
          "position": "W",
          "type": "ai",
          "username": "i-robot",
          "host": false,
          "you": false,
          "current": false,
          "num_cards": 9
      },
      {
          "position": "N",
          "type": "ai",
          "username": "gary rollsbot",
          "host": false,
          "you": false,
          "current": false,
          "num_cards": 9
      }
  ],
  "round_phase": "play",
  "scores": [
      0,
      0
  ],
  "contract": "8C",
  "trick": [
      "8C",
      "RJ",
      "JC",
      "KH"
  ],
  "lead": "S"
}

export default function StateProvider({ children }: { children: ReactElement }) {

  // const [state, setState] = useState(playing)
  const [state, setState] = useState({type: "state", phase: "start" })

  return (
    <stateContext.Provider value={{ state: state, setState: setState }}>
      {children}
    </stateContext.Provider>
  )
}