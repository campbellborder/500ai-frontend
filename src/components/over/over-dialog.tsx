import { ReactElement, useEffect, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function OverDialog({children}: {children: ReactElement}) {

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true);
  }, [])

  return (
    <Dialog open={isOpen}>
      <DialogContent className=" w-[90%] max-w-[290px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Game over</DialogTitle>
        </DialogHeader>
      {children}
      </DialogContent>
    </Dialog>

  )
}