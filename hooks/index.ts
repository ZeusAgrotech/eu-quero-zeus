import type { FormData } from '@/types'
import { maskPhone, validatePhone } from '@/utils'
import { useState } from 'react'

const selectOptions = {
  Anual: [
    { value: 3, label: 'Algodão' },
    { value: 23, label: 'Arroz' },
    { value: 24, label: 'Crotalaria' },
    { value: 25, label: 'Ervilha' },
    { value: 4, label: 'Feijão' },
    { value: 26, label: 'Gergelim' },
    { value: 28, label: 'Girassol' },
    { value: 29, label: 'Milheto' },
    { value: 2, label: 'Milho' },
    { value: 30, label: 'Painço' },
    { value: 1, label: 'Soja' },
    { value: 5, label: 'Sorgo' },
    { value: 21, label: 'Tomate' },
    { value: 20, label: 'Trigo' },
  ],
  Perene: [
    { value: 16, label: 'Alho' },
    { value: 27, label: 'Banana' },
    { value: 7, label: 'Café' },
    { value: 22, label: 'Pastagem' },
  ],
  'Semi perene': [
    { value: 6, label: 'Cana planta' },
    { value: 19, label: 'Cana soca' },
  ],
}

export default function useHome() {
  const initialFormData: FormData = {
    name: '',
    phone: '',
    area: 100,
    crop: '',
    otherCrop: '',
    file: null,
  }

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isPhoneInvalid, setIsPhoneInvalid] = useState(false)
  const [showOtherCrop, setShowOtherCrop] = useState(false)
  const [showFileInput, setShowFileInput] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleFormChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target

    if (name === 'crop' && value === 'outra') {
      setShowOtherCrop(true)
    } else if (name === 'crop' && value !== 'outra') {
      setShowOtherCrop(false)
      setFormData(prev => ({ ...prev, otherCrop: '' }))
    }

    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPhoneInvalid(false)
    const formatted = maskPhone(e.target.value.replace(/\D/g, ''))
    setFormData(prev => ({ ...prev, phone: formatted }))
  }

  const handlePhoneValidation = (phone: string) => {
    if (phone.length > 0) setIsPhoneInvalid(!validatePhone(phone))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFormData(prev => ({ ...prev, file: file || null }))
  }

  const resetForm = () => {
    setFormData(initialFormData)

    // Reset the file input element directly
    const fileInput = document.getElementById('file') as HTMLInputElement
    if (fileInput) fileInput.value = ''

    setShowOtherCrop(false)
    setIsSent(false)
    setShowFileInput(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsSending(true)

      // Create a copy of form data for submission
      const submissionData = { ...formData }

      // Convert file to base64 if it exists
      if (formData.file instanceof File) {
        const convertFileToBase64 = (file: File): Promise<string> => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = error => reject(error)
          })
        }
        const fileBase64 = await convertFileToBase64(formData.file)
        submissionData.file = {
          content: fileBase64,
          filename: formData.file.name,
          type: formData.file.type || 'application/vnd.google-earth.kml+xml',
        }
      }

      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      })

      if (response.ok) {
        setIsSent(true)
        setTimeout(() => {
          resetForm()
        }, 4000)
      } else {
        setHasError(true)
        setIsSent(false)
        throw new Error('Erro ao enviar o formulário')
      }
    } catch (error) {
      setHasError(true)
      console.error(error)
    } finally {
      setIsSending(false)
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -24, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.4,
      },
    },
  }

  const formItemVariants = {
    hidden: { opacity: 0, y: -24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween',
        ease: 'easeOut',
      },
    },
  }

  const feedbackVariants = {
    hidden: { opacity: 0, y: -24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stifness: 160,
        damping: 8,
      },
    },
  }

  const copyrightVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: {
      opacity: 0.5,
      y: 0,
      filter: 'blur(0px)',
      transition: { delay: 0.5, duration: 1, ease: 'easeOut' },
    },
  }

  return {
    containerVariants,
    copyrightVariants,
    feedbackVariants,
    formData,
    formItemVariants,
    handleFileChange,
    handleFormChange,
    handlePhoneChange,
    handlePhoneValidation,
    handleSubmit,
    hasError,
    isPhoneInvalid,
    isSending,
    isSent,
    resetForm,
    selectOptions,
    setFormData,
    setHasError,
    setShowFileInput,
    showFileInput,
    showOtherCrop,
    titleVariants,
  }
}
