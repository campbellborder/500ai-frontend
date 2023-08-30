'use client'

import { SetupDialog } from "@/components/setup/setup-dialog"
import { StartDialog } from "@/components/start/start-dialog"
import StartForms from "@/components/start/start-forms"
import { useContext } from "react"
import { stateContext } from "@/contexts/state-context"
import Setup from "@/components/setup/setup"

export default function Home() {

  const { state } = useContext(stateContext)

  return (
    <main className="bg-green-950 h-screen">
      {state.state == "start" &&
      (<StartDialog>
        <StartForms/>
      </StartDialog>)
      }
      {state.state == "setup" &&
      (<SetupDialog>
        <Setup/>
      </SetupDialog>)}
    </main>
  )

}
