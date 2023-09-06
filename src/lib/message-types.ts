export type Message = State | Alert

export interface State {
  type: "state",
  phase: "start" | "setup" | "play",
  gamecode?: string,
  players?: Player[],
  round_phase?: string,
  contract?: string,
  trick?: string[],
  scores?: number[],
  lead?: "N" | "E" | "S" | "W",
}

export interface Alert {
  type: "alert",
  status: "player-joined" | "player-left" | "new-host",
  username: string,
  you?: boolean
}

export interface Player {
  position: "N" | "E" | "S" | "W",
  type: "empty" | "human" | "ai",
  username: string,
  host: boolean,
  you: boolean,
  current?: boolean,
  num_cards?: number,
  hand?: string[],
  actions? : string[]
  bids? : string[]
}