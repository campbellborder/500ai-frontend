'use client'

import { useContext } from "react"
import { stateContext } from "@/contexts/contexts"

import Start from "@/components/start/start"
import StartDialog from "@/components/start/start-dialog"
import Setup from "@/components/setup/setup"
import SetupDialog from "@/components/setup/setup-dialog"
import Play from "@/components/play/play"

export default function Home() {

  const { state } = useContext(stateContext)

  return (
    <main className="bg-green-900 h-screen">

      {state.phase == "start" &&
      (<StartDialog>
        <Start/>
      </StartDialog>)}

      {state.phase == "setup" &&
      (<SetupDialog>
        <Setup/>
      </SetupDialog>)}

      {state.phase == "play" &&
      (<Play/>)}
    </main>
  )

}
