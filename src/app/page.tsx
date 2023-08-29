'use client'

import { SetupDialog } from "@/components/setup/setup-dialog"
import { StartDialog } from "@/components/start/start-dialog"
import StartForms from "@/components/start/start-forms"
import { createContext, useContext } from "react"
import { stateContext } from "@/contexts/state-context"

export default function Home() {

  const { state } = useContext(stateContext)


  return (
    <main className="bg-green-950 h-screen">
      {state == "start" &&
      (<StartDialog>
        <StartForms/>
      </StartDialog>)
      }
      {state == "setup" &&
      (<SetupDialog>
        <h2>arr</h2>
      </SetupDialog>)}
    </main>
  )

}
