// lib/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendConfirmationEmail = async ({
  to,
  name,
  date,
  time,
  service,
  professional,
  branch
}: {
  to: string
  name: string
  date: string
  time: string
  service: string
  professional: string
  branch: string
}) => {
  try {
    await resend.emails.send({
      from: 'reservas@maravillacurly.com',
      to,
      subject: 'Confirmación de tu cita en Maravilla Curly ✨',
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2>¡Hola ${name}!</h2>
          <p>Gracias por agendar tu cita con nosotras 💇‍♀️</p>
          <p><strong>📅 Fecha:</strong> ${date}</p>
          <p><strong>🕒 Hora:</strong> ${time}</p>
          <p><strong>💆‍♀️ Servicio:</strong> ${service}</p>
          <p><strong>👩‍🔧 Profesional:</strong> ${professional}</p>
          <p><strong>📍 Sucursal:</strong> ${branch}</p>
          <br/>
          <p>Te esperamos con mucha emoción. ✨</p>
          <p>Maravilla Curly 💖</p>
        </div>
      `
    })
  } catch (error) {
    console.error('❌ Error al enviar el correo:', error)
  }
}