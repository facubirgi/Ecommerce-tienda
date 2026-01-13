'use client'

import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface Product {
  id: string
  brand: string
  name: string
  price: string
  image: string
  handle: string
}

const NewArrivals = () => {
  // Productos de ejemplo - reemplazar con datos reales de tu API
  const products: Product[] = [
    {
      id: "1",
      brand: "ZARA",
      name: "Cartera Crossbody",
      price: "$89.900",
      image: "/product1.jpg",
      handle: "cartera-crossbody-zara"
    },
    {
      id: "2",
      brand: "LOUIS VUITTON",
      name: "Neverfull Monogram",
      price: "$450.000",
      image: "/product2.jpg",
      handle: "neverfull-monogram-lv"
    },
    {
      id: "3",
      brand: "COACH",
      name: "Tabby Shoulder Bag",
      price: "$210.000",
      image: "/product3.jpg",
      handle: "tabby-shoulder-coach"
    },
    {
      id: "4",
      brand: "BALENCIAGA",
      name: "Hourglass XS",
      price: "$380.000",
      image: "/product4.jpg",
      handle: "hourglass-xs-balenciaga"
    },
    {
      id: "5",
      brand: "PRADA",
      name: "Re-Edition 2005",
      price: "$320.000",
      image: "/product5.jpg",
      handle: "re-edition-2005-prada"
    },
  ]

  // Duplicamos los productos para el carrusel infinito
  const productsDuplicated = [...products, ...products]

  return (
    <section className="w-full bg-gray-100 py-16">
      <style jsx>{`
        @keyframes scroll-products {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-products {
          animation: scroll-products 30s linear infinite;
        }

        .animate-scroll-products:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <div className="content-container">
        <div className="flex flex-col items-center justify-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl tracking-wide text-black uppercase" style={{ fontWeight: 500 }}>
            NUEVOS INGRESOS
          </h2>
        </div>
      </div>

      {/* Products Carousel - Full Width */}
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll-products gap-6">
          {productsDuplicated.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="flex-shrink-0 w-[280px] sm:w-[320px] bg-white overflow-hidden group"
            >
              {/* Product Image */}
              <LocalizedClientLink href={`/products/${product.handle}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="320px"
                  />
                </div>
              </LocalizedClientLink>

              {/* Product Info */}
              <div className="p-4">
                <p className="font-serif text-xs tracking-[0.15em] text-gray-500 uppercase mb-1" style={{ fontWeight: 400 }}>
                  {product.brand}
                </p>
                <LocalizedClientLink href={`/products/${product.handle}`}>
                  <h3 className="font-serif text-base text-black mb-2 hover:text-gray-600 transition-colors" style={{ fontWeight: 400 }}>
                    {product.name}
                  </h3>
                </LocalizedClientLink>
                <p className="font-serif text-lg text-black mb-4" style={{ fontWeight: 500 }}>
                  {product.price}
                </p>

                {/* Add to Cart Button */}
                <button className="w-full bg-black text-white font-serif text-xs tracking-[0.15em] uppercase py-3 hover:bg-gray-800 transition-colors" style={{ fontWeight: 400 }}>
                  AGREGAR AL CARRITO
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewArrivals
