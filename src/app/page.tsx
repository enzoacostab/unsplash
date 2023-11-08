'use client'

import React from 'react'
import Header from './components/header'
import Main from './components/main'
import ImageUploader from './components/image-uploader'
import { usePopUpContext } from '@/hooks/usePopUpContext'
import { Toaster } from 'sonner'

export default function Home (): React.JSX.Element {
  const { popUpOpen } = usePopUpContext()
  return (
    <div className="flex flex-col items-center h-full p-2">
      <Toaster richColors visibleToasts={1}/>
      <Header/>
      <Main/>
      { popUpOpen ? <ImageUploader/> : null }
    </div>
  )
}
