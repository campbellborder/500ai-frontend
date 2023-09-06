import { createContext } from "react";

export const stateContext = createContext<any>({type: "state", phase: "start"})
export const wsContext = createContext<any>(null)
export const discardContext = createContext<any>(null)
export const cardWidthContext = createContext<any>(null)