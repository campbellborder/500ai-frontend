export type Message = StateMessage | AlertMessage

export interface StateMessage {
  type: "state",
  state: "setup" | "play",
  gamecode: string
  players: Player[]
}

export interface AlertMessage {
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
  hand?: string[],
  num_cards: number
}