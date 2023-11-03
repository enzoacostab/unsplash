import { type UploadBy } from "@/types"
import React, { type ChangeEvent, type Dispatch, type SetStateAction } from "react"

export default function Select ({ setUploadBy }: { setUploadBy: Dispatch<SetStateAction<UploadBy>> }): React.JSX.Element {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setUploadBy(value as UploadBy)
  }
  
  return ( 
    <div className="radio-inputs w-[50%]">
      <label className="radio">
        <input onChange={handleChange} type="radio" name="radio" defaultChecked value="URL" />
        <span className="name">URL</span>
      </label>
      <label className="radio">
        <input onChange={handleChange} type="radio" name="radio" value="File" />
        <span className="name">File</span>
      </label>
    </div>
  )
}
