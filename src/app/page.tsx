'use client'

import { wsContext } from "@/contexts/ws-context"
import { useContext } from "react"

export default function Home() {

  const ws = useContext(wsContext)

  return (
    <main>
      <h1>500 App</h1>
    </main>
  )

}
