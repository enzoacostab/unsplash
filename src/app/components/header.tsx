'use client'

import React, { type ChangeEvent, type MouseEvent } from "react"
import Image from "next/image"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { usePopUpContext } from "@/hooks/usePopUpContext"
import { useImgContext } from "@/hooks/useImgContext"

export default function Header (): React.JSX.Element {
  const { setPopUpOpen } = usePopUpContext()
  const { images, setImagesToShow } = useImgContext()
  
  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault() 
    setPopUpOpen(true)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    const searchRes = images.filter(img => img.label?.toLowerCase().includes(value))
    value !== ''
      ? setImagesToShow(searchRes)
      : setImagesToShow(images)
  }

  return (
    <header className="w-full h-20 pt-2 flex items-center px-[3%] ">
      <Image width={150} height={200} priority src="/my_unsplash_logo.svg" alt="logo"/>
      <form className="flex w-full h-full gap-3 justify-between items-center">
        <div className="border border-[#bdbdbd] flex h-min py-3 rounded-xl w-full sm:w-[40%] gap-3 items-center px-3">
          <FaMagnifyingGlass color="#bdbdbd"/>
          <input type="text" onChange={handleChange} className="focus-visible:outline-none w-full text-black placeholder:text-[#bdbdbd]" placeholder="Search by name" />
        </div>
        <button onClick={handleClick} className="bg-[#3db46d] min-w-[110px] transition-colors shadow-lg p-3 cursor-pointer hover:bg-green-700 font-semibold rounded-xl text-sm text-white flex items-center gap-2" >Add a photo</button>
      </form>
    </header>
  )
}
