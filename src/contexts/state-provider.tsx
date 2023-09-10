'use client'

import { ReactElement, useState } from 'react';
import { stateContext } from '@/contexts/contexts';

const dummy = {
  "type": "state",
  "phase": "play",
  "gamecode": "octarchy",
  "players": [
      {
          "position": "N",
          "type": "human",
          "username": "cb",
          "host": true,
          "you": true,
          "current": true,
          "num_cards": 13,
          "hand": [
              "RJ",
              "AD",
              "7D",
              "AC",
              "QC",
              "9C",
              "6C",
              "AH",
              "6H",
              "JS"
          ],
          "actions": [
              "RHS",
              "RHC",
              "RHD",
              "6C",
              "AH",
              "6H",
              "JS",
              "QC",
              "AC",
              "9C",
              "7D",
              "AD"
          ]
      },
      {
          "position": "E",
          "type": "ai",
          "username": "i-robot",
          "host": false,
          "you": false,
          "current": false,
          "num_cards": 10
      },
      {
          "position": "S",
          "type": "ai",
          "username": "awesom-o-4000",
          "host": false,
          "you": false,
          "current": false,
          "num_cards": 10
      },
      {
          "position": "W",
          "type": "ai",
          "username": "i-robot",
          "host": false,
          "you": false,
          "current": false,
          "num_cards": 10
      }
  ],
  "round_phase": "play",
  "scores": [
      0,
      0
  ],
  "contract": "9D",
  "trick": [
      null,
      null,
      null,
      null
  ]
}

const dummy2 = {
  "type": "state",
  "phase": "over",
  "gamecode": "octarchy",
  "scores": [
    560,
    -240
  ],
  "players": [
    {
        "position": "N",
        "type": "human",
        "username": "cb",
        "host": true,
        "you": true,
        "winner": true
    },
    {
        "position": "E",
        "type": "ai",
        "username": "i-robot",
        "host": false,
        "you": false,
        "winner": false
    },
    {
        "position": "S",
        "type": "ai",
        "username": "awesom-o-4000",
        "host": false,
        "you": false,
        "winner": false
    },
    {
        "position": "W",
        "type": "ai",
        "username": "i-robot",
        "host": false,
        "you": false,
        "winner": false
    }
],
}

export default function StateProvider({ children }: { children: ReactElement }) {

  const [state, setState] = useState({type: "state", phase: "start" })
  // const [state, setState] = useState(dummy2)
  

  return (
    <stateContext.Provider value={{ state: state, setState: setState }}>
      {children}
    </stateContext.Provider>
  )
}