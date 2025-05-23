import { EmailTemplate } from '@/transactional/email-template'
import type { FormData } from '@/types'
import { Resend } from 'resend'

const resend = new Resend(String(process.env.NEXT_RESEND_API_KEY))

export async function POST(request: Request) {
  const formData: FormData = await request.json()

  const { name, phone, area, crop, otherCrop } = formData

  let finalCrop = crop
  if (otherCrop) finalCrop = otherCrop

  try {
    const { data, error } = await resend.emails.send({
      from: 'Zeus Agro <noreply@zeusagro.com>', // 'Acme <onboarding@resend.dev>',
      to: 'edsonsjr+euquerozeus@gmail.com', // 'delivered@resend.dev',
      subject: '[campanha] Eu quero Zeus',
      react: EmailTemplate({
        name,
        phone,
        area,
        crop: finalCrop,
      }) as React.ReactElement,
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
