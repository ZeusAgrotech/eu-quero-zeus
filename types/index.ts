type FileAttachment = {
  content: string
  filename: string
  type: string
}

export type FormData = {
  name: string
  phone: string
  area: number
  crop: string
  otherCrop?: string
  file: File | FileAttachment | null
}
