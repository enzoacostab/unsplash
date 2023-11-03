export interface ImgContext {
  images: ImgType[]
  setImages: React.Dispatch<React.SetStateAction<ImgType[]>>
  imagesToShow: ImgType[]
  setImagesToShow: React.Dispatch<React.SetStateAction<ImgType[]>>
}

export interface PopUpContext {
  popUpOpen: boolean
  setPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ImgType {
  url: string
  label: string | undefined
}

export type UploadBy = "URL" | "File"

export interface ImageToUpload {
  image: File | null
  label: string | null
  url: string | null
}
