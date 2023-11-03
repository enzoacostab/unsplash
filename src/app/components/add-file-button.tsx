/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import React, { type Dispatch, type ChangeEvent, type SetStateAction } from 'react'
import { AiOutlineFileImage } from 'react-icons/ai'
import { type ImageToUpload } from '@/types' 

export default function AddFileButton ({ setImageToUpload }: { setImageToUpload: Dispatch<SetStateAction<ImageToUpload>> }): React.JSX.Element {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files != null) {
      const file = e.target.files[0]
      setImageToUpload((prev: ImageToUpload) => ({ ...prev, image: file }))
    }
  }

  return (
    <div className='flex items-center w-[50%]'>
      <input className="hidden" id='image' type="file" accept='image/*' onChange={handleFileChange} />
      <label className="border-[#3db46d] hover:bg-[#3db46d] hover:text-white border-2 transition-colors w-full shadow-md py-[10px] cursor-pointer font-semibold rounded-xl text-[#3db46d] text-sm flex items-center justify-center gap-2" htmlFor='image'><AiOutlineFileImage size={20}/>Add File</label>
    </div>
  )
}
