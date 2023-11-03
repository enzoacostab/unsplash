'use client'

import { type PopUpContext } from "@/types"
import React, { useState, createContext } from "react"

export const popUpContext = createContext<PopUpContext>({ popUpOpen: false, setPopUpOpen: () => null })

export default function PopUpContextProvider ({ children }: { children: React.JSX.Element }): React.JSX.Element {
  const [popUpOpen, setPopUpOpen] = useState<boolean>(false)
  return (
    <popUpContext.Provider value={{ popUpOpen, setPopUpOpen }}>
      {children}
    </popUpContext.Provider>
  )
}
