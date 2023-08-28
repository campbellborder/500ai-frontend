import { StartDialog } from "@/components/start/start-dialog"
import StartForms from "@/components/start/start-forms"

export default function Home() {

  return (
    <main className="bg-green-950 h-screen">
      <StartDialog>
        <StartForms/>
      </StartDialog>
    </main>
  )

}
