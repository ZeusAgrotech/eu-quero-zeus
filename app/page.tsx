'use client'

import Image from 'next/image'
import { useState } from 'react'

type FormData = {
  name: string
  phone: string
  area: number
  crop: string
}

export default function Home() {
  const initialFormData: FormData = {
    name: '',
    phone: '',
    area: 500,
    crop: '',
  }

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [showOtherCrop, setShowOtherCrop] = useState(false)

  const handleFormChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setShowOtherCrop(value === 'outra')
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="isolate flex min-h-screen flex-col gap-6 items-center justify-between p-6 lg:px-16">
      <h1 className="font-bold text-4xl">Eu quero Zeus</h1>

      <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-4xl bg-gradient-to-br from-stone-50 to-stone-100 p-6 shadow-[0_3px_6px_rgba(0,0,0,0.3)]">
        <Image
          src="/assets/images/logo-zeus-gradient.svg"
          alt="Logo do Zeus"
          width={512}
          height={150}
          className="w-48 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
          role="presentation"
        />

        <form className="w-full space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="ml-1">
              Como gostaria de ser chamado?
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="rounded-md border border-stone-300 bg-white px-4 py-2"
              placeholder="Digite seu nome"
              value={formData.name}
              onChange={e => handleFormChange(e)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="ml-1">
              Celular/WhatsApp:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="(__) _____-____"
              className="rounded-md border border-stone-300 bg-white px-4 py-2"
              value={formData.phone}
              onChange={e => handleFormChange(e)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="area" className="ml-1">
              Área de plantio: {formData.area} ha
            </label>
            <input
              type="range"
              id="area"
              name="area"
              className="w-full"
              min={100}
              step={100}
              max={1000000}
              value={formData.area}
              onChange={e => handleFormChange(e)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="crop" className="ml-1">
              Cultura plantada:
            </label>
            <select
              id="crop"
              name="crop"
              className="rounded-md border border-stone-300 bg-white px-4 py-2"
              required
              value={formData.crop}
              onChange={e => handleFormChange(e)}
            >
              <option value="">Selecione</option>
              <option value="soja">Soja</option>
              <option value="milho">Milho</option>
              <option value="trigo">Trigo</option>
              <option value="algodao">Algodão</option>
              <option value="feijao">Feijão</option>
              <option value="arroz">Arroz</option>
              <option value="outra">Outra</option>
            </select>
            {showOtherCrop && (
              <input
                type="text"
                id="otherCrop"
                name="otherCrop"
                placeholder="Qual?"
                value={formData.crop}
                onChange={e => handleFormChange(e)}
                className="rounded-md border border-stone-300 bg-white px-4 py-2"
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="file"
              className="ml-1 flex items-center justify-between"
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
              className="rounded-md border border-stone-300 bg-white px-4 py-2"
              accept=".kml, .kmz"
              // value={formData.file}
              // onChange={e => handleFormChange(e)}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-8 w-full">
            Enviar
          </button>
        </form>
      </div>

      <p className="text-center text-black/70 text-sm">
        &copy; ZEUSAGRO TECNOLOGIA E SERVIÇOS AGRÍCOLAS S/A,{' '}
        {new Date().getFullYear()}.
        <br />
        CNPJ: 24.915.907/0001-49
      </p>

      <div
        className="-z-[1] fixed inset-0 bg-[length:100_100] bg-[url(/assets/images/bg-noise.png)] mix-blend-overlay"
        aria-hidden="true"
      />
      <div
        className="-z-[2] fixed inset-0 bg-gradient-to-br from-zeus-300 to-zeus-500"
        aria-hidden="true"
      />
    </div>
  )
}
