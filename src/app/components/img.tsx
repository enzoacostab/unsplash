/* eslint-disable @typescript-eslint/no-misused-promises */
import { useImgContext } from "@/hooks/useImgContext"
import Image from "next/image"
import React from "react"
import { db } from "@/firebase/config"
import { deleteDoc, query, where, collection, getDocs } from "firebase/firestore"

export default function Img ({ url, label }: { url: string, label: string | undefined }): React.JSX.Element {
  const { setImagesToShow } = useImgContext()

  const handleClick = async (): Promise<void> => {
    const citiesRef = collection(db, "images")
    const q = query(citiesRef, where("label", "==", label))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref)
    })
    setImagesToShow(prev => prev.filter(img => img.label !== label))
  }

  return (
    <div className='relative'>
      <div className='absolute p-7 flex gap-2 justify-between overflow-y-hidden flex-col h-full w-full top-0 left-0 rounded-xl bg-black z-10 opacity-0 hover:opacity-100 hover:bg-opacity-40 transition-all'>
        <button onClick={handleClick} className="w-fit h-fit px-3 py-[1px] rounded-full transition-colors text-sm self-end hover:bg-black hover:bg-opacity-10 border-[#eb5757] border-2 text-[#eb5757]">delete</button>
        <p className="text-white font-bold text-sm">{label}</p>
      </div>
      <Image className='h-min rounded-xl z-20' width={500} height={500} loading="lazy" src={url} alt={label ?? 'image'}></Image>
    </div>
  )
}
