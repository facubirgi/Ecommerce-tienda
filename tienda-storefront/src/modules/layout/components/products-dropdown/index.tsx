'use client'

import { useState, useRef } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

const ProductsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Abrir dropdown al pasar el mouse
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }

  // Cerrar dropdown al salir (con delay para mejor UX)
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 200)
  }

  const menuItems = [
    {
      category: "CARTERAS",
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
      category: "GAFAS",
      items: [],
      verTodo: { label: "VER TODO GAFAS", href: "/categories/gafas" },
    },
    {
      category: "VICTORIA'S SECRET",
      items: [
        { label: "Body Splash", href: "/collections/bodysplash" },
        { label: "Body Lotion", href: "/collections/bodylotion" },
      ],
      verTodo: { label: "VER TODO VS", href: "/collections/victoria-secret" },
    },
  ]

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <LocalizedClientLink
        href="/store"
        className="hover:text-black text-grey-60 transition-colors flex items-center gap-1 uppercase tracking-[0.25em] font-serif text-sm"
        style={{ fontWeight: 400 }}
      >
        Productos
        <ChevronDown
          size="14"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </LocalizedClientLink>

      {isOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-white shadow-2xl rounded-sm overflow-hidden z-50 min-w-[280px]">
          <div className="py-8 px-10">
            {menuItems.map((section, index) => (
              <div key={section.category}>
                {/* Línea separatoria */}
                {index > 0 && (
                  <div className="border-t border-gray-200 mb-8"></div>
                )}

                {/* Título de categoría */}
                <h3 className="font-serif text-[13px] tracking-[0.25em] text-black mb-4 uppercase" style={{ fontWeight: 500 }}>
                  {section.category}
                </h3>

                {/* Items de la categoría */}
                <div className="space-y-2.5">
                  {section.items.map((item) => (
                    <LocalizedClientLink
                      key={item.label}
                      href={item.href}
                      className="block font-serif text-[13px] text-gray-600 hover:text-black transition-colors tracking-wider uppercase"
                      style={{ fontWeight: 400 }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </LocalizedClientLink>
                  ))}

                  {/* Ver Todo */}
                  <LocalizedClientLink
                    href={section.verTodo.href}
                    className="block font-serif text-[13px] text-black hover:text-gray-600 transition-colors mt-4 tracking-[0.2em] uppercase"
                    style={{ fontWeight: 500 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {section.verTodo.label}
                  </LocalizedClientLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsDropdown
