'use client'

import { ReactElement, useEffect, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function StartDialog({children}: {children: ReactElement}) {

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true);
  }, [])

  return (
    <Dialog open={isOpen}>
      <DialogContent className="w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">500ai</DialogTitle>
        </DialogHeader>
      {children}
      </DialogContent>
    </Dialog>

  )
}