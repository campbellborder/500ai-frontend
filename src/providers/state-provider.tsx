'use client'

import { ReactElement, useState } from 'react';
import { stateContext } from '@/contexts/state-context';

const discarding = {
    "type": "state",
    "phase": "play",
    "gamecode": "quantile",
    "players": [
        {
            "position": "N",
            "type": "human",
            "username": "ch",
            "host": true,
            "you": true,
            "current": true,
            "num_cards": 13,
            "hand": [
                "KD",
                "8H",
                "AC",
                "4D",
                "KC",
                "5D",
                "6C",
                "7C",
                "TC",
                "9D",
                "TS",
                "6H",
                "7D"
            ],
            "actions": [
                "KD",
                "8H",
                "AC",
                "4D",
                "KC",
                "5D",
                "6C",
                "7C",
                "TC",
                "9D",
                "TS",
                "6H",
                "7D"
            ]
        },
        {
            "position": "E",
            "type": "human",
            "username": "cb2",
            "host": false,
            "you": false,
            "current": false,
            "num_cards": 10
        },
        {
            "position": "S",
            "type": "human",
            "username": "cb3",
            "host": false,
            "you": false,
            "current": false,
            "num_cards": 10
        },
        {
            "position": "W",
            "type": "human",
            "username": "cb4",
            "host": false,
            "you": false,
            "current": false,
            "num_cards": 10
        }
    ],
    "round_phase": "discard",
    "scores": [
        0,
        0
    ]
}

const bidding = {
    "type": "state",
    "phase": "play",
    "gamecode": "quantile",
    "players": [
        {
            "position": "N",
            "type": "human",
            "username": "ch",
            "host": true,
            "you": true,
            "current": false,
            "num_cards": 10,
            "hand": [
                "KD",
                "8H",
                "AC",
                "4D",
                "KC",
                "5D",
                "6C",
                "7C",
                "TC",
                "9D"
            ],
            "bids": [
                "9D"
            ]
        },
        {
            "position": "E",
            "type": "human",
            "username": "cb2",
            "host": false,
            "you": false,
            "current": false,
            "num_cards": 10,
            "bids": [
                "6S",
                "P"
            ]
        },
        {
            "position": "S",
            "type": "human",
            "username": "cb3",
            "host": false,
            "you": false,
            "current": false,
            "num_cards": 10,
            "bids": [
                "7D",
                "P"
            ]
        },
        {
            "position": "W",
            "type": "human",
            "username": "cb4",
            "host": false,
            "you": false,
            "current": true,
            "num_cards": 10,
            "bids": [
                "M"
            ]
        }
    ],
    "round_phase": "bid",
    "scores": [
        0,
        0
    ]
}

export default function StateProvider({children} : {children: ReactElement}) {

    const [state, setState] = useState(bidding)
    // const [state, setState] = useState({phase: "start"})

  return (
    <stateContext.Provider value={{state: state, setState: setState}}>
      {children}
    </stateContext.Provider> 
  )
}