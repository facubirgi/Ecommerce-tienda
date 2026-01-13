'use client'

import Image from "next/image"

interface Marca {
  nombre: string
  imagen: string
}

const LogosMarcas = () => {
  const marcas: Marca[] = [
    { nombre: "Zadig & Voltaire", imagen: "/zadiacyvoltaire.png" },
    { nombre: "Coach", imagen: "/coach.png" },
    { nombre: "Louis Vuitton", imagen: "/louisvuitton.png" },
    { nombre: "Lacoste", imagen: "/lacoste.png" },
    { nombre: "Balenciaga", imagen: "/balenciaga.png" },
    { nombre: "Victoria's Secret", imagen: "/victoria secret.png" },
    { nombre: "Miu Miu", imagen: "/miumiu.png" },
    { nombre: "Zara", imagen: "/zara.png" },
    { nombre: "Prada", imagen: "/prada.png" },
    { nombre: "Yves Saint Laurent", imagen: "/yvessaintlaurent.png" },
    { nombre: "Tommy Hilfiger", imagen: "/tommyhilfiger.png" },
  ]

  // Duplicamos las marcas para el efecto de carrusel infinito sin saltos
  const marcasDuplicadas = [...marcas, ...marcas, ...marcas, ...marcas]

  return (
    <section className="w-full bg-white py-16 overflow-hidden">
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 45s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Carrusel infinito */}
      <div className="relative w-full">
        <div className="flex animate-scroll">
          {marcasDuplicadas.map((marca, index) => (
            <div
              key={`${marca.nombre}-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12"
            >
              {/* Círculo con fondo gris claro */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-gray-100 shadow-lg flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:shadow-xl">
                <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
                  <Image
                    src={marca.imagen}
                    alt={`Logo de ${marca.nombre}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LogosMarcas
