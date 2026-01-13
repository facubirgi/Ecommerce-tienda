import { Suspense } from "react"
import { listProducts } from "@lib/data/products"
import { listCollections } from "@lib/data/collections"
import { listCategories } from "@lib/data/categories"
import ProductPreview from "@modules/products/components/product-preview"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"

type SearchPageProps = {
  params: Promise<{
    countryCode: string
  }>
  searchParams: Promise<{
    q?: string
  }>
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { countryCode } = await params
  const { q: query } = await searchParams

  if (!query || query.trim().length === 0) {
    return (
      <div className="content-container py-12">
        <h1 className="text-3xl font-serif tracking-wider mb-4">Búsqueda</h1>
        <p className="text-grey-60">Por favor, ingresa un término de búsqueda.</p>
      </div>
    )
  }

  const searchTerm = query.toLowerCase()

  // Buscar productos
  const { response: { products } } = await listProducts({
    queryParams: {
      q: query,
      limit: 100
    },
    countryCode
  })

  // Buscar colecciones (marcas)
  const { collections: allCollections } = await listCollections()
  const collections = allCollections.filter(collection =>
    collection.title?.toLowerCase().includes(searchTerm)
  )

  // Buscar categorías
  const allCategories = await listCategories()
  const categories = allCategories.filter(category =>
    category.name?.toLowerCase().includes(searchTerm)
  )

  const totalResults = products.length + collections.length + categories.length

  return (
    <div className="content-container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-serif tracking-wider mb-2">
          Resultados de búsqueda
        </h1>
        <p className="text-grey-60">
          {totalResults} resultado{totalResults !== 1 ? 's' : ''} para "{query}"
        </p>
      </div>

      {totalResults === 0 ? (
        <div className="text-center py-12">
          <p className="text-grey-60 text-lg mb-4">
            No se encontraron resultados para "{query}"
          </p>
          <LocalizedClientLink
            href="/store"
            className="text-black hover:underline font-semibold"
          >
            Ver todos los productos
          </LocalizedClientLink>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Categorías */}
          {categories.length > 0 && (
            <div>
              <h2 className="text-2xl font-serif tracking-wider mb-6">
                Categorías ({categories.length})
              </h2>
              <div className="grid grid-cols-1 small:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <LocalizedClientLink
                    key={category.id}
                    href={`/categories/${category.handle}`}
                    className="border border-grey-20 rounded-md p-4 hover:border-grey-40 transition-colors"
                  >
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    {category.description && (
                      <p className="text-sm text-grey-60 mt-2">{category.description}</p>
                    )}
                  </LocalizedClientLink>
                ))}
              </div>
            </div>
          )}

          {/* Marcas */}
          {collections.length > 0 && (
            <div>
              <h2 className="text-2xl font-serif tracking-wider mb-6">
                Marcas ({collections.length})
              </h2>
              <div className="grid grid-cols-1 small:grid-cols-3 gap-4">
                {collections.map((collection) => (
                  <LocalizedClientLink
                    key={collection.id}
                    href={`/collections/${collection.handle}`}
                    className="border border-grey-20 rounded-md p-4 hover:border-grey-40 transition-colors"
                  >
                    <h3 className="font-semibold text-lg">{collection.title}</h3>
                  </LocalizedClientLink>
                ))}
              </div>
            </div>
          )}

          {/* Productos */}
          {products.length > 0 && (
            <div>
              <h2 className="text-2xl font-serif tracking-wider mb-6">
                Productos ({products.length})
              </h2>
              <Suspense fallback={<SkeletonProductGrid numberOfProducts={products.length} />}>
                <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8 small:gap-y-12">
                  {products.map((product) => (
                    <li key={product.id}>
                      <ProductPreview product={product} region={undefined} />
                    </li>
                  ))}
                </ul>
              </Suspense>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
