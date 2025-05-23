import type { FormData } from '@/types'
import { Resend } from 'resend'

const resend = new Resend(String(process.env.NEXT_RESEND_API_KEY))

export async function POST(request: Request) {
  const formData: FormData = await request.json()

  const { name, phone, area, crop, otherCrop, file } = formData

  let finalCrop = crop
  if (otherCrop) finalCrop = otherCrop

  const attachments = []

  if (file && typeof file === 'object' && 'content' in file) {
    attachments.push({
      content: file.content,
      filename: file.filename,
      type: file.type,
    })
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // 'Zeus Agro <noreply@zeusagro.com>',
      to: 'delivered@resend.dev', // 'edsonsjr+euquerozeus@gmail.com',
      subject: '[campanha] Eu quero Zeus',
      html: `
        <p>
          <b>Nome:</b> ${name}
        </p>
        <p>
          <b>Celular:</b> <a href="https://wa.me/55${phone.replace(/\D/g, '')}" style="color:#ff7f2f">${phone}</a>
        </p>
        <p>
          <b>Área:</b> ${area} ha
        </p>
        <p>
          <b>Cultura:</b> ${finalCrop}
        </p>
      `,
      attachments,
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
