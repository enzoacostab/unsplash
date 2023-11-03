'use client'

import { imgContext } from "@/context/img-context"
import { type ImgContext } from "@/types"
import { useContext } from "react"

export const useImgContext = (): ImgContext => {
  const { images, setImages, imagesToShow, setImagesToShow } = useContext(imgContext)
  return { images, setImages, imagesToShow, setImagesToShow } 
}
