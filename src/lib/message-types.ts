export type Message = StateMessage | AlertMessage

export interface StateMessage {
  type: string,
  state: string,
  gamecode: string
  players: Player[]
}

export interface AlertMessage {
  type: string,
  status: string,
  username: string,
  you?: boolean
}

export interface Player {
  position: string,
  type: string,
  username: string,
  host: boolean,
  you: boolean
}