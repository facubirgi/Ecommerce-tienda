"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  categories: HttpTypes.StoreProductCategory[]
  collections: HttpTypes.StoreCollection[]
  search?: boolean
  'data-testid'?: string
}

// Estructura del menú (fuera del componente para evitar problemas de hidratación)
const menuSections = [
    {
      title: "CARTERAS",
      items: [
        { label: "Zadig & Voltaire", href: "/collections/zadic&voltaire" },
        { label: "Prada", href: "/collections/prada" },
        { label: "Coach", href: "/collections/coach" },
        { label: "Louis Vuitton", href: "/collections/louisvuitton" },
        { label: "Lacoste", href: "/collections/lacoste" },
        { label: "Balenciaga", href: "/collections/balenciaga" },
        { label: "Miu Miu", href: "/collections/miu-miu" },
        { label: "Zara", href: "/collections/zara" },
        { label: "Yves Saint Laurent", href: "/collections/yvessaintlaurent" },
        { label: "Tommy Hilfiger", href: "/collections/tommyhilfiger" },
      ],
      verTodo: { label: "VER TODO CARTERAS", href: "/categories/carteras" },
    },
    {
      title: "GAFAS",
      items: [],
      verTodo: { label: "VER TODO GAFAS", href: "/categories/gafas" },
    },
    {
      title: "VICTORIA'S SECRET",
      items: [
        { label: "Body Splash", href: "/collections/bodysplash" },
        { label: "Body Lotion", href: "/collections/bodylotion" },
      ],
      verTodo: { label: "VER TODO VS", href: "/collections/victoria-secret" },
    },
]

const RefinementList = ({
  sortBy,
  'data-testid': dataTestId
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  // Detectar si estamos en la sección de Victoria's Secret
  const isVictoriaSecretSection = pathname.includes("victoria-secret") ||
                                   pathname.includes("bodysplash") ||
                                   pathname.includes("bodylotion")

  // Detectar si estamos en la sección de Gafas
  const isGafasSection = pathname.includes("gafas")

  // Detectar si estamos en la sección de Carteras (cualquier marca)
  const isCarterasSection = pathname.includes("zadic") ||
                            pathname.includes("prada") ||
                            pathname.includes("coach") ||
                            pathname.includes("louisvuitton") ||
                            pathname.includes("lacoste") ||
                            pathname.includes("balenciaga") ||
                            pathname.includes("miu-miu") ||
                            pathname.includes("zara") ||
                            pathname.includes("yvessaintlaurent") ||
                            pathname.includes("tommyhilfiger")

  // Obtener solo la sección de Victoria's Secret
  const victoriaSecretSection = menuSections.find(section => section.title === "VICTORIA'S SECRET")

  // Obtener solo la sección de Gafas
  const gafasSection = menuSections.find(section => section.title === "GAFAS")

  // Obtener solo la sección de Carteras
  const carterasSection = menuSections.find(section => section.title === "CARTERAS")

  return (
    <div className="flex flex-col gap-8 py-4 small:min-w-[280px] small:max-w-[280px]">
      {/* Sort Dropdown - Solo en mobile */}
      <div className="small:hidden mb-4">
        <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
      </div>

      {/* Menú de navegación */}
      <div className="pb-8">
        {isCarterasSection ? (
          // Menú simplificado para Carteras
          <div className="space-y-6">
            {/* Botón Volver a Productos */}
            <LocalizedClientLink
              href="/store"
              className="flex items-center gap-2 font-serif text-[13px] text-gray-600 hover:text-black transition-colors tracking-wider uppercase mb-6"
              style={{ fontWeight: 400 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Volver a Productos
            </LocalizedClientLink>

            {/* Menú Carteras */}
            {carterasSection && (
              <div>
                <h3 className="font-serif text-[13px] tracking-[0.25em] text-black mb-4 uppercase" style={{ fontWeight: 500 }}>
                  {carterasSection.title}
                </h3>
                <div className="space-y-2.5">
                  {carterasSection.items.map((item) => (
                    <LocalizedClientLink
                      key={item.label}
                      href={item.href}
                      className="block font-serif text-[13px] text-gray-600 hover:text-black transition-colors tracking-wider uppercase"
                      style={{ fontWeight: 400 }}
                    >
                      {item.label}
                    </LocalizedClientLink>
                  ))}
                  <LocalizedClientLink
                    href={carterasSection.verTodo.href}
                    className="block font-serif text-[13px] text-black hover:text-gray-600 transition-colors tracking-[0.2em] uppercase"
                    style={{ fontWeight: 500 }}
                  >
                    {carterasSection.verTodo.label}
                  </LocalizedClientLink>
                </div>
              </div>
            )}
          </div>
        ) : isVictoriaSecretSection ? (
          // Menú simplificado para Victoria's Secret
          <div className="space-y-6">
            {/* Botón Volver a Productos */}
            <LocalizedClientLink
              href="/store"
              className="flex items-center gap-2 font-serif text-[13px] text-gray-600 hover:text-black transition-colors tracking-wider uppercase mb-6"
              style={{ fontWeight: 400 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Volver a Productos
            </LocalizedClientLink>

            {/* Menú Victoria's Secret */}
            {victoriaSecretSection && (
              <div>
                <h3 className="font-serif text-[13px] tracking-[0.25em] text-black mb-4 uppercase" style={{ fontWeight: 500 }}>
                  {victoriaSecretSection.title}
                </h3>
                <div className="space-y-2.5">
                  {victoriaSecretSection.items.map((item) => (
                    <LocalizedClientLink
                      key={item.label}
                      href={item.href}
                      className="block font-serif text-[13px] text-gray-600 hover:text-black transition-colors tracking-wider uppercase"
                      style={{ fontWeight: 400 }}
                    >
                      {item.label}
                    </LocalizedClientLink>
                  ))}
                  <LocalizedClientLink
                    href={victoriaSecretSection.verTodo.href}
                    className="block font-serif text-[13px] text-black hover:text-gray-600 transition-colors tracking-[0.2em] uppercase"
                    style={{ fontWeight: 500 }}
                  >
                    {victoriaSecretSection.verTodo.label}
                  </LocalizedClientLink>
                </div>
              </div>
            )}
          </div>
        ) : isGafasSection ? (
          // Menú simplificado para Gafas
          <div className="space-y-6">
            {/* Botón Volver a Productos */}
            <LocalizedClientLink
              href="/store"
              className="flex items-center gap-2 font-serif text-[13px] text-gray-600 hover:text-black transition-colors tracking-wider uppercase mb-6"
              style={{ fontWeight: 400 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Volver a Productos
            </LocalizedClientLink>

            {/* Menú Gafas */}
            {gafasSection && (
              <div>
                <h3 className="font-serif text-[13px] tracking-[0.25em] text-black mb-4 uppercase" style={{ fontWeight: 500 }}>
                  {gafasSection.title}
                </h3>
                <div className="space-y-2.5">
                  <LocalizedClientLink
                    href={gafasSection.verTodo.href}
                    className="block font-serif text-[13px] text-black hover:text-gray-600 transition-colors tracking-[0.2em] uppercase"
                    style={{ fontWeight: 500 }}
                  >
                    {gafasSection.verTodo.label}
                  </LocalizedClientLink>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Menú completo para otras secciones
          <ul className="space-y-6">
            {menuSections.map((section) => (
              <li key={section.title}>
                {/* Título de la sección */}
                <h3 className="font-serif text-[13px] tracking-[0.25em] text-black mb-4 uppercase" style={{ fontWeight: 500 }}>
                  {section.title}
                </h3>

                {/* Items de la sección */}
                <div className="space-y-2.5">
                  {section.items.map((item) => (
                    <LocalizedClientLink
                      key={item.label}
                      href={item.href}
                      className="block font-serif text-[13px] text-gray-600 hover:text-black transition-colors tracking-wider uppercase"
                      style={{ fontWeight: 400 }}
                    >
                      {item.label}
                    </LocalizedClientLink>
                  ))}

                  {/* Ver Todo */}
                  <LocalizedClientLink
                    href={section.verTodo.href}
                    className="block font-serif text-[13px] text-black hover:text-gray-600 transition-colors tracking-[0.2em] uppercase"
                    style={{ fontWeight: 500 }}
                  >
                    {section.verTodo.label}
                  </LocalizedClientLink>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default RefinementList
