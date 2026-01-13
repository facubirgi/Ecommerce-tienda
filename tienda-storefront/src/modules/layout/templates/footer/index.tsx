import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="content-container py-12">
        {/* Top Section - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Logo & Social */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <LocalizedClientLink href="/" className="block">
              <div className="text-center md:text-left">
                <h2 className="font-serif text-2xl tracking-[0.3em] text-white" style={{ fontWeight: 500 }}>
                  STORE
                </h2>
                <p className="text-[10px] tracking-[0.4em] text-gray-400 font-light">
                  BY PAULI
                </p>
              </div>
            </LocalizedClientLink>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400 transition-colors"
              aria-label="Instagram"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>

          {/* Shipping Methods */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <h3 className="font-serif text-sm tracking-[0.2em] uppercase" style={{ fontWeight: 500 }}>
              Formas de Envío
            </h3>
            <p className="font-serif text-base text-white tracking-wide">
              Andreani
            </p>
          </div>
        </div>

        {/* Middle Section - Button */}
        <div className="flex justify-center mb-12">
          <button className="font-serif text-xs tracking-[0.15em] uppercase px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors" style={{ fontWeight: 400 }}>
            Botón de Arrepentimiento
          </button>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <p className="font-serif text-xs text-center text-gray-400 tracking-wide" style={{ fontWeight: 300 }}>
            © {new Date().getFullYear()} STORE BY PAULI - Todos los derechos reservados. Desarrollado por Facundo.
          </p>
        </div>
      </div>
    </footer>
  )
}
