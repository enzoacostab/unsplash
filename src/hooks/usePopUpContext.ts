'use client'

import { popUpContext } from "@/context/popup-context"
import { type PopUpContext } from "@/types"
import { useContext } from "react"

export const usePopUpContext = (): PopUpContext => {
  const { popUpOpen, setPopUpOpen } = useContext(popUpContext)
  return { popUpOpen, setPopUpOpen }
}
