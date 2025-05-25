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
        <table cellpadding="2" cellspacing="0" border="0">
          <tr>
            <td>
              <b style="font-size:14px;font-family:sans-serif;">
                Nome:
              </b>
            </td>
            <td>
              <span style="font-size:14px;font-family:sans-serif;">
                ${name}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <b style="font-size:14px;font-family:sans-serif;">
                Celular / WhatsApp:
              </b>
            </td>
            <td>
              <span style="font-size:14px;font-family:sans-serif;">
                <a href="https://wa.me/55${phone.replace(/\D/g, '')}" style="color:#ff7f2f">
                  ${phone}
                </a>
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <b style="font-size:14px;font-family:sans-serif;">
                Área de plantio:
              </b>
            </td>
            <td>
              <span style="font-size:14px;font-family:sans-serif;">
                ${area}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <b style="font-size:14px;font-family:sans-serif;">
                Cultura:
              </b>
            </td>
            <td>
              <span style="font-size:14px;font-family:sans-serif;">
                ${finalCrop}
              </span>
            </td>
          </tr>
          ${
            file &&
            `<tr>
              <td>
                <b style="font-size:14px;font-family:sans-serif;">
                  Anexo:
                </b>
              </td>
              <td>
                <span style="font-size:14px;font-family:sans-serif;">
                  ${
                    typeof file === 'object' && 'filename' in file
                      ? file.filename
                      : file instanceof File
                        ? file.name
                        : ''
                  }
                </span>
              </td>
            </tr>`
          }
        </table>
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
