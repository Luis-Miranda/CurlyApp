import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { email, name, date, time } = await req.json()

    if (!email || !name || !date || !time) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })
    }

    // Convertir a formato para Google Calendar (ej. 20250915T100000Z)
    const start = `${date.replace(/-/g, '')}T${time.replace(':', '')}00Z`
    const end = `${date.replace(/-/g, '')}T${time.replace(':', '')}30Z`

    const calendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?text=Cita+Maravilla+Curly&dates=${start}/${end}&details=Tu+cita+en+Maravilla+Curly&location=Av.+Miguel+Ángel+de+Quevedo+520a,+CDMX`
    const mapsUrl = `https://www.google.com/maps?q=Av.+Miguel+Ángel+de+Quevedo+520a,+CDMX`

    const emailData = await resend.emails.send({
      from: 'Maravilla Curly <contacto@maravillacurly.com.mx>',
      to: email,
      subject: 'Confirmación de tu cita en Maravilla Curly 💖',
      html: `
        <div style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: auto;">
          <h2 style="color: #000;">¡Hola, ${name}!</h2>
          <p style="font-size: 16px;">Tu cita ha sido agendada con éxito en <strong>Maravilla Curly</strong>.</p>

          <ul style="list-style: none; padding-left: 0; font-size: 16px;">
            <li><strong>📅 Fecha:</strong> ${date}</li>
            <li><strong>🕒 Hora:</strong> ${time}</li>
            <li><strong>📍 Dirección:</strong> Av. Miguel Ángel de Quevedo 520a, CDMX</li>
          </ul>

          <div style="margin: 30px 0;">
            <a href="${calendarUrl}" target="_blank" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block; margin-bottom: 10px;">
              Agregar a Google Calendar 📅
            </a>
            <br />
            <a href="${mapsUrl}" target="_blank" style="color: #000;">Ver ubicación en Google Maps</a>
          </div>

          <p style="font-size: 14px; color: #555;">Si necesitas cambiar o cancelar tu cita, por favor contáctanos con al menos 48h de anticipación.</p>

          <p style="margin-top: 40px; font-size: 14px; color: #888;">Gracias por confiar en Maravilla Curly 🌟</p>
        </div>
      `,
    })

    return NextResponse.json(emailData)
  } catch (error) {
    console.error('Error al enviar el correo:', error)
    return NextResponse.json({ error: 'Error al enviar el correo' }, { status: 500 })
  }
}