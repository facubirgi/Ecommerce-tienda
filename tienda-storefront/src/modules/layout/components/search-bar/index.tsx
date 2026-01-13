'use client'

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Search from "@modules/common/icons/search"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type SearchResult = {
  products: Array<{
    id: string
    title: string
    handle: string
    thumbnail?: string
  }>
  collections: Array<{
    id: string
    title: string
    handle: string
  }>
  categories: Array<{
    id: string
    name: string
    handle: string
  }>
}

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<SearchResult | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Búsqueda con debounce
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm.trim().length >= 2) {
        setIsLoading(true)
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`)
          const data = await response.json()
          setResults(data)
          setIsOpen(true)
        } catch (error) {
          console.error('Error searching:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setResults(null)
        setIsOpen(false)
      }
    }, 300) // 300ms delay

    return () => clearTimeout(delayDebounce)
  }, [searchTerm])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
      setIsOpen(false)
    }
  }

  const handleResultClick = () => {
    setIsOpen(false)
    setSearchTerm("")
  }

  const hasResults = results && (
    results.products.length > 0 ||
    results.collections.length > 0 ||
    results.categories.length > 0
  )

  return (
    <div ref={searchRef} className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="search"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleInputChange}
          className="font-serif px-4 py-2 pr-10 text-sm border border-grey-20 rounded-md focus:outline-none focus:border-grey-40 w-48"
        />
        <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Search className="text-grey-40" size="18" />
        </button>
      </form>

      {/* Dropdown de resultados */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white shadow-2xl rounded-md overflow-hidden z-50 max-h-[500px] overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-grey-60 text-sm font-serif">
              Buscando...
            </div>
          ) : hasResults ? (
            <div className="py-2">
              {/* Productos */}
              {results.products.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-serif px-4 py-2 text-xs font-semibold text-grey-60 uppercase tracking-wider">
                    Productos
                  </h3>
                  {results.products.slice(0, 5).map((product) => (
                    <LocalizedClientLink
                      key={product.id}
                      href={`/products/${product.handle}`}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-grey-5 transition-colors"
                      onClick={handleResultClick}
                    >
                      {product.thumbnail && (
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}
                      <span className="font-serif text-sm text-grey-90">{product.title}</span>
                    </LocalizedClientLink>
                  ))}
                </div>
              )}

              {/* Marcas (Colecciones) */}
              {results.collections.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-serif px-4 py-2 text-xs font-semibold text-grey-60 uppercase tracking-wider">
                    Marcas
                  </h3>
                  {results.collections.slice(0, 5).map((collection) => (
                    <LocalizedClientLink
                      key={collection.id}
                      href={`/collections/${collection.handle}`}
                      className="font-serif block px-4 py-2 hover:bg-grey-5 transition-colors text-sm text-grey-90"
                      onClick={handleResultClick}
                    >
                      {collection.title}
                    </LocalizedClientLink>
                  ))}
                </div>
              )}

              {/* Categorías */}
              {results.categories.length > 0 && (
                <div>
                  <h3 className="font-serif px-4 py-2 text-xs font-semibold text-grey-60 uppercase tracking-wider">
                    Categorías
                  </h3>
                  {results.categories.slice(0, 5).map((category) => (
                    <LocalizedClientLink
                      key={category.id}
                      href={`/categories/${category.handle}`}
                      className="font-serif block px-4 py-2 hover:bg-grey-5 transition-colors text-sm text-grey-90"
                      onClick={handleResultClick}
                    >
                      {category.name}
                    </LocalizedClientLink>
                  ))}
                </div>
              )}

              {/* Ver todos los resultados */}
              {searchTerm && (
                <div className="border-t border-grey-20 mt-2">
                  <LocalizedClientLink
                    href={`/search?q=${encodeURIComponent(searchTerm)}`}
                    className="font-serif block px-4 py-3 text-sm font-semibold text-center hover:bg-grey-5 transition-colors"
                    onClick={handleResultClick}
                  >
                    Ver todos los resultados para "{searchTerm}"
                  </LocalizedClientLink>
                </div>
              )}
            </div>
          ) : searchTerm.trim().length >= 2 ? (
            <div className="p-4 text-center text-grey-60 text-sm font-serif">
              No se encontraron resultados para "{searchTerm}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default SearchBar
