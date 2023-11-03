'use client'

import { usePopUpContext } from "@/hooks/usePopUpContext"
import React, { type ChangeEvent, useState } from "react"
import Select from "./select"
import { type ImageToUpload, type UploadBy } from "@/types"
import AddFileButton from "./add-file-button"
import Submit from "./submit-button"
import { AiOutlineFileImage } from 'react-icons/ai'

export default function ImageUploader (): React.JSX.Element {
  const { setPopUpOpen } = usePopUpContext()
  const [uploadBy, setUploadBy] = useState<UploadBy>('URL')
  const [imageToUpload, setImageToUpload] = useState<ImageToUpload>({ label: null, image: null, url: null })
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target
    setImageToUpload(prev => ({ ...prev, [name]: value === '' ? null : value }))
  }
  console.log(imageToUpload.image)
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black opacity-20 z-40"></div>
      <div className="h-fit w-[90%] sm:w-[60%] lg:w-[40%] rounded-lg bg-white top-[20%]  fixed z-50">
        <form method="post" className="flex flex-col p-6 gap-1">
          <h1 className="font-semibold">Add a new photo</h1>
          <label htmlFor="" className="text-sm mt-2">Label</label>
          <input name="label" onChange={handleChange} className="border p-3 text-sm rounded-lg border-[#787878] placeholder:text-[#bdbdbd]" type="text" placeholder="A man wearing a hat standing next to a rock"/>
          <label htmlFor="" className="text-sm mt-2">Upload by</label>
          <div className="flex justify-start gap-3"><Select setUploadBy={setUploadBy}/>
          {uploadBy === "URL" 
            ? <>
                <input onChange={handleChange} className="border p-2 text-sm w-[50%] rounded-lg border-[#787878] placeholder:text-[#bdbdbd]" name="url" type="text" placeholder="https://images.unsplash.com/photo-1682687220591-cfd91ab5c1b5?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
              </>
            : imageToUpload.image === null
              ? <AddFileButton setImageToUpload={setImageToUpload}/>
              : <p className="items-center flex ml-4 gap-1 text-sm"><AiOutlineFileImage/>{imageToUpload.image.name}</p>
          }</div>
          <div className="flex justify-end gap-4 mt-4">
            <button className="text-[#d0d0d0] text-sm transition-colors hover:text-[#8383839e]" onClick={() => { setPopUpOpen(false) }}>Cancel</button>
            <Submit imageToUpload={imageToUpload} uploadBy={uploadBy}/>
          </div>
        </form>
      </div>
    </>
  )
}
