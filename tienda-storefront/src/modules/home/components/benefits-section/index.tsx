'use client'

const BenefitsSection = () => {
  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

          {/* Beneficio 1: Envío Gratis */}
          <div className="flex flex-col items-center text-center px-6">
            <div className="mb-4">
              <svg
                className="w-16 h-16 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl tracking-wide text-black uppercase mb-3" style={{ fontWeight: 500 }}>
              ENVÍO GRATIS
            </h3>
            <p className="font-serif text-sm md:text-base text-gray-600 leading-relaxed" style={{ fontWeight: 400 }}>
              Superando los $150.000
            </p>
          </div>

          {/* Beneficio 2: 15% Transferencia */}
          <div className="flex flex-col items-center text-center px-6">
            <div className="mb-4">
              <svg
                className="w-16 h-16 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl tracking-wide text-black uppercase mb-3" style={{ fontWeight: 500 }}>
              15% TRANSFERENCIA
            </h3>
            <p className="font-serif text-sm md:text-base text-gray-600 leading-relaxed" style={{ fontWeight: 400 }}>
              Descuento por pago<br />
              con transferencia
            </p>
          </div>

          {/* Beneficio 3: Atención Personalizada */}
          <div className="flex flex-col items-center text-center px-6">
            <div className="mb-4">
              <svg
                className="w-16 h-16 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl tracking-wide text-black uppercase mb-3" style={{ fontWeight: 500 }}>
              ATENCIÓN 24/7
            </h3>
            <p className="font-serif text-sm md:text-base text-gray-600 leading-relaxed" style={{ fontWeight: 400 }}>
              Soporte vía WhatsApp<br />
              Respuesta inmediata
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
