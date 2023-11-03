'use client'

import React, { type MouseEvent } from 'react'
import { storage, db } from '../../firebase/config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'
import { useImgContext } from '@/hooks/useImgContext'
import { type UploadBy, type ImageToUpload } from '@/types'
import { usePopUpContext } from '@/hooks/usePopUpContext'
import { toast } from 'sonner'

export default function Submit ({ imageToUpload, uploadBy }: { imageToUpload: ImageToUpload, uploadBy: UploadBy }): React.JSX.Element {
  const { images, setImages, setImagesToShow } = useImgContext()
  const { setPopUpOpen } = usePopUpContext()
  const { label, image, url } = imageToUpload
  const imageRef = ref(storage, `/images/${image != null ? image.name : url}`)
  
  const handleSubmit = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    const checkLabel = images.some(e => e.label === label)
    let checkUrl
    try {
      checkUrl = url != null ? new URL(url) : null
    } catch {
      toast.error('Invalid URL')
      return
    }
    if (label === null) {
      toast.warning('Enter a label')
      return
    }
    if (checkLabel) {
      toast.warning("The label already exists")
      return
    }
    if (images.length === 15) {
      toast.error("Images limit reached")
      return
    }
    if (image === null && url === null) {
      toast.warning("Enter an image")
      return
    }
    if (url !== null) {
      if ((!url.endsWith("jpg") && !url.endsWith("jpeg") && !url.endsWith("png")) || checkUrl === null) {
        toast.error("Invalid URL")
        return
      }
      if (checkUrl?.origin !== 'https://i.pinimg.com') {
        toast.error('You can only upload images from Pinterest')
        return
      }
    }
    
    if (uploadBy === 'File' && image !== null) {
      uploadBytes(imageRef, image, { customMetadata: { label } }).then(() => {
        getDownloadURL(imageRef).then((imgUrl) => {
          setImages([...images, { label, url: imgUrl }])
          setImagesToShow([...images, { label, url: imgUrl }])
          toast.success('Image uploaded successfully')
        }).catch(e => {
          console.log(e)
        })
      }).catch(e => {
        toast.error('There was a problem uploading the image')
      })
    } else if (uploadBy === 'URL' && url !== null) {
      addDoc(collection(db, 'images'), {
        url,
        label
      }).then(res => {
        setImages([...images, { label, url }])
        setImagesToShow([...images, { label, url }])
        toast.success('Image uploaded successfully')
      }).catch(e => {
        toast.error('There was a problem uploading the image')
      })
    }
    setPopUpOpen(false)
  }

  return (
    <button onClick={handleSubmit} className="bg-[#3db46d] transition-colors shadow-lg p-3 cursor-pointer hover:bg-green-700 font-semibold rounded-xl text-sm text-white w-28">Submit</button>
  )
}
