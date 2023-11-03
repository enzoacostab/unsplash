'use client'

import { type ImgContext, type ImgType } from "@/types"
import React, { useState, createContext } from "react"

export const imgContext = createContext<ImgContext>({ images: [], setImages: () => null, imagesToShow: [], setImagesToShow: () => null })

export default function ImgContextProvider ({ children }: { children: React.JSX.Element }): React.JSX.Element {
  const [images, setImages] = useState<ImgType[]>([])
  const [imagesToShow, setImagesToShow] = useState<ImgType[]>([])
  return (
    <imgContext.Provider value={{ images, setImages, imagesToShow, setImagesToShow }}>
      {children}
    </imgContext.Provider>
  )
}
