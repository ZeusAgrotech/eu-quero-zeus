'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'
import { Range } from 'react-range'

type FormData = {
  name: string
  phone: string
  area: number
  crop: string
  otherCrop: string
}

export default function Home() {
  const initialFormData: FormData = {
    name: '',
    phone: '',
    area: 500,
    crop: '',
    otherCrop: '',
  }

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [showOtherCrop, setShowOtherCrop] = useState(false)

  const handleFormChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target

    if (name === 'crop' && value === 'outra') {
      setShowOtherCrop(true)
      setFormData(prev => ({ ...prev, otherCrop: '' }))
    } else {
      setShowOtherCrop(false)
    }

    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const formatCellphone = (value: string) => {
    const digits = value.replace(/\D/g, '')

    if (digits.length <= 2) {
      return `(${digits}`
    }
    if (digits.length <= 6) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    }
    if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
    }

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCellphone(e.target.value)
    setFormData(prev => ({ ...prev, phone: formatted }))
  }

  const handleSliderChange = (values: number[]) => {
    setFormData(prev => ({ ...prev, area: values[0] }))
  }

  const formatValue = (value: number) =>
    new Intl.NumberFormat('pt-BR').format(value)

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

  return (
    <motion.div
      className="isolate flex min-h-screen select-none flex-col items-center justify-between gap-6 p-6 lg:px-16"
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
    >
      <motion.h1
        className="font-bold text-4xl tracking-tighter"
        variants={{
          hidden: { opacity: 0, y: -24, filter: 'blur(8px)' },
          visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
        }}
      >
        Eu quero Zeus
      </motion.h1>

      <motion.div
        className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100 p-4 shadow-[0_2px_4px_rgba(0,0,0,0.3)] md:rounded-4xl md:p-6"
        variants={{
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
        }}
      >
        <motion.figure variants={itemVariants}>
          <Image
            src="/assets/images/logo-zeus-gradient.svg"
            alt="Logo do Zeus"
            width={512}
            height={150}
            className="w-48 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
            role="presentation"
          />
        </motion.figure>

        <form className="w-full space-y-4">
          <motion.div className="flex flex-col gap-2" variants={itemVariants}>
            <label htmlFor="name" className="mx-1">
              Como gostaria de ser chamado?
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="rounded-md border border-stone-300 bg-white px-3 py-2 focus:outline-zeus-400 md:rounded-xl"
              placeholder="Digite seu nome"
              value={formData.name}
              onChange={e => handleFormChange(e)}
              required
            />
          </motion.div>
          <motion.div className="flex flex-col gap-2" variants={itemVariants}>
            <label htmlFor="phone" className="mx-1">
              Celular / WhatsApp:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="(__) _____-____"
              className="rounded-md border border-stone-300 bg-white px-3 py-2 focus:outline-zeus-400 md:rounded-xl"
              value={formData.phone}
              maxLength={15}
              onChange={handlePhoneChange}
              required
            />
          </motion.div>
          <motion.div className="flex flex-col gap-2" variants={itemVariants}>
            <label
              htmlFor="area"
              className="mx-1 mb-1 flex items-center justify-between"
            >
              <span>Área de plantio:</span>{' '}
              <span>{formatValue(formData.area)} ha</span>
            </label>
            <Range
              // label="Select your value"
              step={100}
              min={100}
              max={1000000}
              values={[formData.area]}
              onChange={values => handleSliderChange(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-zeus-200)',
                    height: 'calc(var(--spacing) * 1)',
                    marginInline: 'auto',
                    width: 'calc(100% - 1.25rem)',
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  key={props.key}
                  style={{
                    ...props.style,
                    backgroundColor: 'var(--color-zeus-400)',
                    borderRadius: '50%',
                    height: 'calc(var(--spacing) * 4)',
                    outlineColor: 'var(--color-zeus-400)',
                    outlineOffset: '2px',
                    transform: 'translateY(-6px)',
                    width: 'calc(var(--spacing) * 4)',
                  }}
                />
              )}
            />
          </motion.div>
          <motion.div className="flex flex-col gap-2" variants={itemVariants}>
            <label htmlFor="crop" className="mx-1">
              Cultura plantada:
            </label>
            <select
              id="crop"
              name="crop"
              className="rounded-md border border-stone-300 bg-white px-3 py-2 focus:outline-zeus-400 md:rounded-xl"
              required
              value={formData.crop}
              onChange={e => handleFormChange(e)}
            >
              <option value="">Selecione</option>
              <option value="Algodão">Algodão</option>
              <option value="Arroz">Arroz</option>
              <option value="Cana-de-açúcar">Cana-de-açúcar</option>
              <option value="Feijão">Feijão</option>
              <option value="Milho">Milho</option>
              <option value="Soja">Soja</option>
              <option value="Trigo">Trigo</option>
              <option value="outra">Outra</option>
            </select>
            {showOtherCrop && (
              <input
                type="text"
                id="otherCrop"
                name="otherCrop"
                placeholder="Qual?"
                value={formData.otherCrop}
                onChange={e => handleFormChange(e)}
                className="rounded-md border border-stone-300 bg-white px-3 py-2 focus:outline-zeus-400 md:rounded-xl"
              />
            )}
          </motion.div>
          {/* <motion.div
            className="flex flex-col gap-2"
            variants={itemVariants}
          >
            <label
              htmlFor="file"
              className="mx-1 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                Anexar KML:{' '}
                <span
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-stone-300 font-bold text-xs"
                  title="Envie seu arquivo KML contendo suas áreas de plantio"
                >
                  ?
                </span>
              </span>
              <span className="mr-1 text-[10px] text-stone-400 uppercase">
                Opcional
              </span>
            </label>
            <input
              type="file"
              id="file"
              name="file"
              className="rounded-md border border-stone-300 bg-white px-3 py-2 focus:outline-zeus-400 md:rounded-xl"
              accept=".kml, .kmz"
              // value={formData.file}
              // onChange={e => handleFormChange(e)}
            />
          </motion.div> */}
          <motion.button
            type="submit"
            className="btn btn-primary mt-8 w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
          >
            Enviar
          </motion.button>
        </form>
      </motion.div>

      <motion.p
        className="text-pretty text-center text-black/70 text-sm"
        variants={{
          hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
          visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { delay: 1.5, duration: 1, ease: 'easeOut' },
          },
        }}
      >
        &copy; ZEUSAGRO TECNOLOGIA E SERVIÇOS AGRÍCOLAS S/A,{' '}
        {new Date().getFullYear()}.
        <br />
        CNPJ: 24.915.907/0001-49
      </motion.p>

      <div
        className="-z-[1] fixed inset-0 bg-[length:100_100] bg-[url(/assets/images/bg-noise.png)] mix-blend-overlay"
        aria-hidden="true"
      />
      <div
        className="-z-[2] fixed inset-0 bg-gradient-to-br from-zeus-300 to-zeus-500"
        aria-hidden="true"
      />
    </motion.div>
  )
}
