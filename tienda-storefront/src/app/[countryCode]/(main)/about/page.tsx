import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Quienes Somos - Store by Pauli",
  description:
    "Descubre la historia detrás de Store by Pauli. Más que una tienda, un estilo de vida.",
}

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-[#c5c5c5] py-20 md:py-32">
        <div className="content-container">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-4 font-light">
              NUESTRA HISTORIA
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight text-black leading-tight" style={{ fontWeight: 500 }}>
              MÁS QUE UNA TIENDA,
              <br />
              UN ESTILO DE VIDA.
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start max-w-6xl mx-auto">
            {/* Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm aspect-[3/4] bg-gray-200 overflow-hidden rounded-full">
                <Image
                  src="/quienessomos.png"
                  alt="Pauli Fundadora"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-6 text-black">
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-black" style={{ fontWeight: 500 }}>
                Bienvenidos a Store by Pauli
              </h2>
              <p>Un lugar creado con pasión por la moda, las tendencias y los pequeños detalles que hacen sentir especial a cada persona</p>

              <p className="text-base leading-relaxed text-gray-700" style={{ textAlign: 'justify' }}>
                Mi nombre es Paula, y soy una apasionada del mundo del estilo, los accesorios y
                todo aquello que inspira confianza y belleza.
              </p>

              <p className="text-base leading-relaxed text-gray-700" style={{ textAlign: 'justify' }}>
                Desde el primer día entendí que no se trata solo de vender carteras, gafas o body splash, sino de ofrecer una experiencia de lujo accesible, donde cada cliente pueda encontrar ese toque único que realza su personalidad.
                Emprender es una de mis grandes pasiones, pero lo que más disfruto es brindar una atención al cliente cercana, honesta y de calidad.
                Mi compromiso es que cada persona que llega a la tienda encuentre algo que encaje con su esencia y le haga sentir más seguro/a y auténtico/a.
              </p>

              <p className="text-base leading-relaxed text-gray-700" style={{ textAlign: 'justify' }}>
                Mi objetivo es que encuentres mucho más que accesorios:
                - Que vivas una experiencia de compra confiable, agradable y especial.
                - Que te sientas acompañado/a en cada elección.
                - Que disfrutes de productos auténticos que reflejen tu esencia.
                Gracias por apoyar este sueño y por ser parte de esta comunidad donde la moda es una forma de expresarse y sentirse único/a.
              </p>

              <p className="font-serif text-2xl mt-8 text-black italic" style={{ fontWeight: 400 }}>
                Pauli.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-black py-16 md:py-20">
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Exclusividad */}
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3 className="font-serif text-xl tracking-[0.2em] uppercase text-white" style={{ fontWeight: 500 }}>
                EXCLUSIVIDAD
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Seleccionamos cuidadosamente cada pieza de marcas internacionales como Zadig & Voltaire,
                Coach y Louis Vuitton.
              </p>
            </div>

            {/* Envíos */}
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h3 className="font-serif text-xl tracking-[0.2em] uppercase text-white" style={{ fontWeight: 500 }}>
                ENVÍOS A TODO EL PAÍS
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Llegamos a cada rincón de Argentina con un packaging seguro y premium para proteger tu
                compra.
              </p>
            </div>

            {/* Atención Personalizada */}
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 className="font-serif text-xl tracking-[0.2em] uppercase text-white" style={{ fontWeight: 500 }}>
                ATENCIÓN PERSONALIZADA
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Estamos para asesorarte. Si tienes dudas sobre un modelo o material, contáctanos directamente.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
