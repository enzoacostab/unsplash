import { storage, db } from "@/firebase/config"
import { useImgContext } from "@/hooks/useImgContext"
import React, { useEffect } from "react"
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage"
import { collection, getDocs } from "firebase/firestore"
import { type ImgType } from "@/types"
import Img from "./img"

export default function Main (): React.JSX.Element {
  const { imagesToShow, setImages, setImagesToShow } = useImgContext()
 
  const fetchStorageImages = async (): Promise<ImgType[]> => {
    const storageImages = await listAll(ref(storage, "images"))
    const promise = storageImages.items.map(async (fileRef) => {
      const url = await getDownloadURL(fileRef)
      const data = await getMetadata(fileRef)
      const img: ImgType = {
        url,
        label: data?.customMetadata?.label
      }
      return img
    })

    return await Promise.all(promise)
  }

  const fetchDbImages = async (): Promise<ImgType[]> => {
    const imgs: ImgType[] = []
    const dbImages = await getDocs(collection(db, 'images'))
    dbImages.forEach(docData => {
      const data = docData.data()
      const img: ImgType = {
        url: data.url,
        label: data.label
      }
      imgs.push(img)
    })
    
    return imgs
  }

  useEffect(() => {
    fetchDbImages().then(dbImages => {
      fetchStorageImages().then(storageImages => {
        setImages([...storageImages, ...dbImages])
        setImagesToShow([...storageImages, ...dbImages])
      }).catch(e => {
        console.log(e)
      })
    }).catch(e => {
      console.log(e)
    })
  }, [])
  
  return (
    <main className="flex gap-[3%] px-2 justify-center py-10 w-full h-full">
      <div className="flex flex-col-reverse justify-end w-[30%] gap-7">{imagesToShow.map(({ url, label }: ImgType, i) => i % 3 === 0 ? <Img key={label} url={url} label={label}/> : null)}</div>
      <div className="flex flex-col-reverse justify-end w-[30%] gap-7">{imagesToShow.map(({ url, label }: ImgType, i) => i % 3 === 1 ? <Img key={label} url={url} label={label}/> : null)}</div>
      <div className="flex flex-col-reverse justify-end w-[30%] gap-7">{imagesToShow.map(({ url, label }: ImgType, i) => i % 3 === 2 ? <Img key={label} url={url} label={label}/> : null)}</div>
    </main>
  )
}
