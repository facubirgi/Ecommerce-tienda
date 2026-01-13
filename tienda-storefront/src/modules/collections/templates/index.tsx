import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { getCollectionByHandle } from "@lib/data/collections"
import { HttpTypes } from "@medusajs/types"

export default async function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  // Detectar si es la colección de Victoria's Secret
  const isVictoriaSecret = collection.handle === "victoria-secret"

  // Si es Victoria's Secret, obtener las colecciones específicas
  let bodySplashCollection: HttpTypes.StoreCollection | null = null
  let bodyLotionCollection: HttpTypes.StoreCollection | null = null

  if (isVictoriaSecret) {
    try {
      bodySplashCollection = await getCollectionByHandle("bodysplash")
      bodyLotionCollection = await getCollectionByHandle("bodylotion")
    } catch (error) {
      console.error("Error fetching VS collections:", error)
    }
  }

  // Layout especial para Victoria's Secret
  if (isVictoriaSecret) {
    return (
      <>
        {/* Banner de Victoria's Secret para Mobile */}
        <div className="relative w-full h-[45vh] overflow-hidden mb-8 block md:hidden">
          <img
            src="/bannervsmobile.png"
            alt="Victoria's Secret Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Banner de Victoria's Secret para Desktop */}
        <div className="relative w-full h-[50vh] overflow-hidden mb-8 hidden md:block">
          <img
            src="/bannervs.png"
            alt="Victoria's Secret Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Contenido de productos */}
        <div className="content-container py-6">
          {/* Si hay colecciones específicas, mostrarlas por separado */}
          {bodySplashCollection && bodySplashCollection.products && bodySplashCollection.products.length > 0 ? (
            <>
              {/* Sección Body Splash */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl small:text-3xl tracking-[0.2em] text-black" style={{ fontWeight: 500 }}>
                    BODY SPLASH
                  </h2>
                </div>
                <Suspense fallback={<SkeletonProductGrid numberOfProducts={4} />}>
                  <PaginatedProducts
                    sortBy={sort}
                    page={1}
                    collectionId={bodySplashCollection.id}
                    countryCode={countryCode}
                  />
                </Suspense>
              </div>

              {/* Sección Body Lotion */}
              {bodyLotionCollection && bodyLotionCollection.products && bodyLotionCollection.products.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-2xl small:text-3xl tracking-[0.2em] text-black" style={{ fontWeight: 500 }}>
                      BODY LOTION
                    </h2>
                  </div>
                  <Suspense fallback={<SkeletonProductGrid numberOfProducts={4} />}>
                    <PaginatedProducts
                      sortBy={sort}
                      page={1}
                      collectionId={bodyLotionCollection.id}
                      countryCode={countryCode}
                    />
                  </Suspense>
                </div>
              )}
            </>
          ) : (
            // Si no hay productos en las colecciones, mostrar todos los productos de la colección victoria-secret
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl small:text-3xl tracking-[0.2em] text-black" style={{ fontWeight: 500 }}>
                  TODOS LOS PRODUCTOS
                </h2>
              </div>
              <Suspense fallback={<SkeletonProductGrid numberOfProducts={collection.products?.length} />}>
                <PaginatedProducts
                  sortBy={sort}
                  page={pageNumber}
                  collectionId={collection.id}
                  countryCode={countryCode}
                />
              </Suspense>
            </div>
          )}
        </div>
      </>
    )
  }

  // Layout normal para otras colecciones
  return (
    <div className="flex flex-col py-6 content-container small:min-h-screen">
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1>{collection.title}</h1>
        </div>
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={collection.products?.length}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            collectionId={collection.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
