import { ReactElement, useEffect, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function SetupDialog({children}: {children: ReactElement}) {

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true);
  }, [])

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Setup</DialogTitle>
        </DialogHeader>
      {children}
      </DialogContent>
    </Dialog>

  )
}