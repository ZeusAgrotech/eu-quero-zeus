import { EmailTemplate } from '@/transactional/email-template'
import type { FormData } from '@/types'
import { Resend } from 'resend'

const resend = new Resend(String(process.env.NEXT_RESEND_API_KEY))

export async function POST({ name, phone, area, crop, otherCrop }: FormData) {
  if (otherCrop) crop = otherCrop

  try {
    const { data, error } = await resend.emails.send({
      from: 'Zeus Agro <noreply@zeusagro.com>', // 'Acme <onboarding@resend.dev>',
      to: 'edsonsjr+euquerozeus@gmail.com', // 'delivered@resend.dev',
      subject: '[campanha] Eu quero Zeus',
      react: EmailTemplate({
        name,
        phone,
        area,
        crop,
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
