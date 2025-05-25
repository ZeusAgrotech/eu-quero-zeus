'use client'

import type { FormData } from '@/types'
import { maskPhone, validatePhone } from '@/utils'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'
import { Spinner } from './_components'

const crops = {
  Anual: [
    { value: 3, label: 'Algodão' },
    { value: 23, label: 'Arroz' },
    { value: 24, label: 'Crotalaria' },
    { value: 25, label: 'Ervilha' },
    { value: 4, label: 'Feijão' },
    { value: 26, label: 'Gergelim' },
    { value: 28, label: 'Girasol' },
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

export default function Home() {
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

  const itemVariants = {
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

  return (
    <motion.div
      className="isolate flex min-h-screen select-none flex-col items-center justify-between gap-6 bg-gradient-to-br from-zeus-300 to-zeus-500 p-6 lg:px-16 dark:from-zeus-800 dark:to-zeus-950 dark:text-white"
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
    >
      <motion.h1
        className="font-bold font-mono text-4xl tracking-tighter"
        variants={titleVariants}
      >
        Eu quero Zeus
      </motion.h1>

      <motion.div
        className="dark flex w-full max-w-md flex-col items-center gap-4 rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100 p-4 shadow-[0_2px_4px_rgba(0,0,0,0.3)] md:rounded-4xl md:p-6 dark:from-stone-700 dark:to-stone-900"
        variants={containerVariants}
      >
        <motion.figure className="mb-2 w-full" variants={itemVariants}>
          <Image
            src="/assets/images/logo-zeus-gradient.svg"
            alt="Logo do Zeus"
            width={512}
            height={150}
            className="w-48 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] dark:hidden"
            role="presentation"
          />
          <Image
            src="/assets/images/logo-zeus-gradient-dark.svg"
            alt="Logo do Zeus"
            width={512}
            height={150}
            className="hidden w-48 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] dark:block"
            role="presentation"
          />
        </motion.figure>

        <form onSubmit={handleSubmit} className="w-full">
          <fieldset disabled={isSending || isSent} className="w-full space-y-4">
            <motion.div className="flex flex-col gap-2" variants={itemVariants}>
              <label htmlFor="name" className="mx-1">
                Como gostaria de ser chamado?
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Digite seu nome"
                autoCapitalize="words"
                value={formData.name}
                onChange={e => handleFormChange(e)}
                required
              />
            </motion.div>
            <motion.div
              className="relative flex flex-col gap-2"
              variants={itemVariants}
            >
              <label htmlFor="phone" className="mx-1">
                Celular / WhatsApp:
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="(__) _____-____"
                className={`rounded-md border ${
                  isPhoneInvalid
                    ? 'animate-wobble border-red-600 border-dashed bg-red-50 bg-clip-padding text-red-600 focus:outline-red-600 dark:bg-red-800 dark:text-red-100'
                    : 'border-stone-300 bg-white focus:outline-zeus-400 dark:border-stone-600 dark:bg-stone-700'
                } px-3 py-2 focus:outline-2 md:rounded-xl`}
                value={formData.phone}
                maxLength={15}
                onChange={handlePhoneChange}
                onBlur={e => handlePhoneValidation(e.target.value)}
                required
              />
              {isPhoneInvalid && (
                <span
                  className="absolute right-3 bottom-2.5 animate-wobble"
                  aria-hidden="true"
                >
                  🚫
                </span>
              )}
            </motion.div>
            <div className="flex gap-4">
              <motion.div
                className="flex w-1/2 flex-col gap-2"
                variants={itemVariants}
              >
                <label htmlFor="crop" className="mx-1">
                  Cultura:
                </label>
                <select
                  id="crop"
                  name="crop"
                  value={formData.crop}
                  onChange={handleFormChange}
                  className="form-control"
                  required
                >
                  <option value="">Selecione</option>
                  {Object.entries(crops).map(([group, options]) => (
                    <optgroup key={group} label={group}>
                      {(
                        options as Array<{
                          value: number
                          label: string | null
                        }>
                      ).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                  <option disabled>----------------</option>
                  <option value="outra">Outra</option>
                </select>
              </motion.div>
              <motion.div
                className="flex w-1/2 flex-col gap-2"
                variants={itemVariants}
              >
                <label htmlFor="area" className="mx-1">
                  Área plantio:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="area"
                    name="area"
                    className="form-control w-[calc(100%_-_2rem)]"
                    placeholder="1000"
                    min={100}
                    max={1000000}
                    value={formData.area}
                    onClick={e => e.currentTarget.select()}
                    onChange={e => handleFormChange(e)}
                    required
                  />
                  ha
                </div>
              </motion.div>
            </div>
            {showOtherCrop && (
              <input
                type="text"
                id="otherCrop"
                name="otherCrop"
                placeholder="Qual?"
                value={formData.otherCrop}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    otherCrop: e.target.value,
                  }))
                }
                className="form-control"
                // biome-ignore lint/a11y/noAutofocus: <explanation>
                autoFocus={true}
                required
              />
            )}
            <motion.div className="flex flex-col gap-2" variants={itemVariants}>
              <div className="mx-1 flex items-center gap-3">
                <label htmlFor="file">Anexar arquivo*:</label>
                <div className="group relative flex h-5 w-5 cursor-help items-center justify-center rounded-full bg-stone-300 text-xs dark:bg-stone-600">
                  <b aria-label="help">?</b>
                  <span
                    className="-translate-x-1/2 pointer-events-none absolute bottom-full left-1/2 mb-2 w-50 text-pretty rounded-xl border border-stone-300 bg-white p-2 text-center opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100 dark:border-stone-700 dark:bg-stone-800"
                    aria-labelledby="help"
                  >
                    Envie arquivo KML ou KMZ contendo suas áreas de plantio
                    <br />
                    (opcional)
                  </span>
                </div>
              </div>
              <input
                type="file"
                id="file"
                name="file"
                className="form-control"
                accept=".kml, .kmz"
                onChange={e => handleFileChange(e)}
              />
              <p className="mx-1 flex gap-1 text-xs opacity-50">
                <span aria-hidden="true">*</span> Apenas arquivos .KML e .KMZ
                são permitidos. (opcional)
              </p>
            </motion.div>
            <motion.button
              type="submit"
              className="btn btn-primary mt-8 w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={itemVariants}
              disabled={isPhoneInvalid || isSending || isSent}
            >
              {isSending ? <Spinner /> : 'Enviar'}
            </motion.button>

            <AnimatePresence>
              {isSent && (
                <motion.p
                  className="mt-4 flex gap-1 text-pretty rounded-md border border-green-600 bg-green-50 px-4 py-3 text-green-600 text-sm leading-tight md:rounded-xl dark:border-green-700 dark:bg-green-800 dark:text-green-100"
                  variants={feedbackVariants}
                >
                  <span aria-hidden="true">✅</span>
                  <span>
                    <b>Dados enviados!</b>
                    <br /> Aguarde que em breve entraremos em contato.
                  </span>
                  <button
                    type="button"
                    className="ml-auto"
                    onClick={() => resetForm()}
                  >
                    ✖︎
                  </button>
                </motion.p>
              )}

              {hasError && (
                <motion.p
                  className="flex gap-1 text-pretty rounded-md border border-red-600 bg-red-50 px-4 py-3 text-red-600 text-sm leading-tight md:rounded-xl dark:border-red-700 dark:bg-red-800 dark:text-red-100"
                  variants={feedbackVariants}
                >
                  <span aria-hidden="true">⛔</span>
                  <span>
                    <b>Erro no servidor.</b>
                    <br />
                    Tente novamente mais tarde.
                  </span>
                  <button
                    type="button"
                    className="ml-auto"
                    onClick={() => setHasError(false)}
                  >
                    ✖︎
                  </button>
                </motion.p>
              )}
            </AnimatePresence>
          </fieldset>
        </form>
      </motion.div>

      <motion.p
        className="text-pretty text-center text-sm"
        variants={{
          hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
          visible: {
            opacity: 0.5,
            y: 0,
            filter: 'blur(0px)',
            transition: { delay: 0.5, duration: 1, ease: 'easeOut' },
          },
        }}
      >
        &copy; ZEUSAGRO TECNOLOGIA E SERVIÇOS AGRÍCOLAS S/A,{' '}
        {new Date().getFullYear()}.
        <br />
        CNPJ: <span className="text-nowrap">24.915.907/0001-49</span>
      </motion.p>

      <div
        className="-z-[1] fixed inset-0 bg-[length:100_100] bg-[url(/assets/images/bg-noise.png)] dark:mix-blend-multiply"
        aria-hidden="true"
      />
      <div
        className="-z-[2] fixed inset-0 dark:bg-black/70"
        aria-hidden="true"
      />
    </motion.div>
  )
}
