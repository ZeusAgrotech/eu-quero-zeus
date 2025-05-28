'use client'

import { Spinner } from '@/components'
import useHome from '@/hooks'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'

export default function Home() {
  const {
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
  } = useHome()

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
        className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100 p-4 shadow-[0_2px_4px_rgba(0,0,0,0.3)] md:rounded-4xl md:p-6 dark:from-stone-700 dark:to-stone-900"
        variants={containerVariants}
        layout
      >
        <motion.figure className="mb-2 w-full" variants={formItemVariants}>
          <Image
            src="/euquerozeus/assets/images/logo-zeus-gradient.svg"
            alt="Logo Zeus"
            width={512}
            height={150}
            className="w-48 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] dark:hidden"
            role="presentation"
          />
          <Image
            src="/euquerozeus/assets/images/logo-zeus-gradient-dark.svg"
            alt="Logo Zeus"
            width={512}
            height={150}
            className="hidden w-48 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] dark:block"
            role="presentation"
          />
        </motion.figure>

        <form onSubmit={handleSubmit} className="w-full">
          <fieldset disabled={isSending || isSent} className="w-full space-y-4">
            <motion.div
              className="flex flex-col gap-2"
              variants={formItemVariants}
            >
              <label htmlFor="name" className="mx-1 w-fit">
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
              variants={formItemVariants}
            >
              <label htmlFor="phone" className="mx-1 w-fit">
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
                } px-3 py-2 focus:outline-2 disabled:opacity-50 md:rounded-xl`}
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
                variants={formItemVariants}
              >
                <label htmlFor="crop" className="mx-1 w-fit">
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
                  {Object.entries(selectOptions).map(([group, options]) => (
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
                  <option disabled>------------------</option>
                  <option value="outra">Outra</option>
                </select>
              </motion.div>
              <motion.div
                className="flex w-1/2 flex-col gap-2"
                variants={formItemVariants}
              >
                <label htmlFor="area" className="mx-1 w-fit">
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
            <motion.div
              className="flex items-center gap-2"
              variants={formItemVariants}
            >
              <button
                type="button"
                className="flex flex-row-reverse items-center gap-2 rounded-md p-1 focus:outline-2 focus:outline-zeus-400 md:rounded-xl"
                onClick={e => {
                  setShowFileInput(!showFileInput)
                  e.currentTarget.blur()
                }}
              >
                Anexar arquivo?
                <span
                  className={`h-4 w-4 rounded-sm border border-stone-300 transition-colors dark:border-stone-600 ${showFileInput ? 'bg-zeus-400' : 'bg-white dark:bg-stone-700'}`}
                  style={isSending || isSent ? { opacity: 0.5 } : {}}
                  aria-hidden="true"
                />
              </button>
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
            </motion.div>
            <AnimatePresence>
              {showFileInput && (
                <motion.div
                  className="flex flex-col gap-2"
                  exit={{ opacity: 0, y: -24 }}
                  variants={formItemVariants}
                >
                  <input
                    type="file"
                    id="file"
                    name="file"
                    className="form-control"
                    accept=".kml, .kmz"
                    onChange={e => handleFileChange(e)}
                    required={showFileInput}
                  />
                  <p className="mx-1 flex gap-1 text-xs opacity-50">
                    <span aria-hidden="true">*</span> Apenas arquivos .KML e
                    .KMZ são permitidos.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              type="submit"
              className="btn btn-primary mt-8 w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={formItemVariants}
              disabled={isPhoneInvalid || hasError}
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
                  <span aria-hidden="true">⚠️</span>
                  <span>
                    <b>Erro ao enviar!</b>
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
        variants={copyrightVariants}
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
