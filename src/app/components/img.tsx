/* eslint-disable @typescript-eslint/no-misused-promises */
import { useImgContext } from "@/hooks/useImgContext"
import Image from "next/image"
import React from "react"
import { db, storage } from "@/firebase/config"
import { deleteDoc, query, where, collection, getDocs } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import { toast } from "sonner"

export default function Img ({ url, label }: { url: string, label: string | undefined }): React.JSX.Element {
  const { setImagesToShow, setImages, images } = useImgContext()

  const handleClick = async (): Promise<void> => {
    const imagesRef = collection(db, "images")
    const q = query(imagesRef, where("label", "==", label))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(async (doc) => {
      try {
        await deleteDoc(doc.ref)
        toast.success('Image deleted successfully')
      } catch {
        toast.error('There was an error trying to delete the image')
      }
    })

    if (querySnapshot === null) {
      const imageRef = ref(storage, `/images/${label}`)
      try {
        await deleteObject(imageRef)
        toast.success('Image deleted successfully')
      } catch {
        toast.error('There was an error trying to delete the image')
      }
    }
    
    const newImages = images.filter(img => img.label !== label)
    setImagesToShow(newImages)
    setImages(newImages)
  }

  return (
    <div className='relative flex w-fit justify-center mx-2 sm:mx-0'>
      <div className='absolute p-6 flex gap-2 justify-between flex-col h-full w-full top-0 left-0 rounded-xl bg-black z-20 opacity-0 hover:opacity-100 hover:bg-opacity-40 transition-all'>
        <button onClick={handleClick} className="w-fit h-fit px-3 py-[1px] rounded-full transition-colors text-sm self-end hover:bg-black hover:bg-opacity-10 border-[#eb5757] border-2 text-[#eb5757]">delete</button>
        <h2 className="text-white font-bold text-xl sm:text-sm overflow-hidden">{label}</h2>
      </div>
      <Image className='rounded-xl z-10' width={500} height={500} loading="lazy" src={url} alt={label ?? 'image'}></Image>
    </div>
  )
}
