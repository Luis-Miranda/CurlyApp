export default function PoliticasPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-center">Política de Reservas y Cancelaciones</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">⏰ Tolerancia:</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Se permite una tolerancia máxima de 20 minutos, SIN excepciones.</li>
          <li>Al cumplir el minuto 21 la cita será cancelada sin derecho a reembolso del anticipo.</li>
          <li>En paquetes: si llegas después de 15 minutos, solo se realizará el corte o tratamiento.</li>
          <li>Si tu especialista comienza después de 15 minutos, obtienes 10% de descuento.</li>
          <li>En caso de accidente o enfermedad, envía comprobante el mismo día para reagendar sin perder el anticipo.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">🔁 Reagenda:</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Puedes reagendar con al menos 48 horas de anticipación vía WhatsApp.</li>
          <li>Si solicitas el cambio con menos de 48 horas, deberás pagar un nuevo anticipo.</li>
          <li>Solo se permiten dos cambios por cita agendada.</li>
          <li>Si tomas una cita cancelada de última hora o el mismo día y no asistes, pierdes el anticipo.</li>
          <li>Si Maravilla debe reagendar por salud del personal, se respetan las condiciones y se otorga 15% de descuento.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">🌀 Importante:</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Si el servicio no corresponde a textura/largo reales, podría no realizarse por falta de tiempo.</li>
          <li>En ese caso, deberá reagendarse y pagarse un nuevo anticipo.</li>
          <li>Envía fotos de tu cabello seco (atrás y perfil) antes de agendar para confirmar el servicio adecuado.</li>
          <li>Si reservas un servicio XL o afro sin corresponder, se te cobrará el servicio agendado.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">❌ Cancelaciones:</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Cancelaciones con más de 48 horas vía WhatsApp tienen derecho a reembolso del anticipo.</li>
          <li>Reembolsos hechos por transferencia con -5% de comisión y toma 5 a 7 días hábiles.</li>
          <li>Internacionales se hacen vía PayPal (comisiones aplican).</li>
          <li>Cancelaciones con menos de 48 horas no son reembolsables.</li>
          <li>Si no confirmas la cita por WhatsApp 24h antes, la cita se libera sin reembolso.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">✨ Indicaciones previas:</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>No se permiten acompañantes, salvo niños con un adulto.</li>
          <li>Notifica asistencia especial con 48h de anticipación.</li>
          <li>Llega con el cabello limpio, seco y sin productos de estilizado.</li>
          <li>Peinados, rastas o nudos deben retirarse antes. Si no, podría cancelarse tu cita sin reembolso.</li>
          <li>Trae fotos de los ingredientes de tus productos capilares actuales.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">💵 Pagos:</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>No se aceptan billetes de $1,000 en efectivo.</li>
          <li>Todos los servicios requieren un anticipo de $400.</li>
          <li>En pagos en efectivo mayores a $1500 se descuenta 10% solo sobre el sobrante.</li>
          <li>El descuento no aplica a productos.</li>
          <li>Transferencias solo para anticipos; en sucursal, pago en efectivo o tarjeta.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Garantía del servicio:</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Aplica hasta 15 días naturales después del servicio.</li>
          <li>Servicios: corte, tratamiento, estilizado, tintes.</li>
          <li>Envía receta, productos usados, fotos del cabello y error, y no modificar el cabello por cuenta propia.</li>
          <li>Evaluación y corrección sin costo si aplica. Si no, se escala a administración.</li>
          <li>No aplica si: pasaron más de 15 días, modificaste tu cabello, no seguiste instrucciones o tu expectativa fue distinta.</li>
        </ul>
        <p className="mt-4">Nuestro compromiso es escucharte y brindarte una solución empática y profesional.</p>
      </section>
    </div>
  )
}