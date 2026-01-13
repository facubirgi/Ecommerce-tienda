import { listProducts } from "@lib/data/products"
import { getCategoryByHandle } from "@lib/data/categories"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function CategorySection({
  categoryHandle,
  title,
  region,
}: {
  categoryHandle: string
  title: string
  region: HttpTypes.StoreRegion
}) {
  try {
    // Obtener la categoría
    const category = await getCategoryByHandle([categoryHandle])

    if (!category) {
      console.log(`❌ Categoría no encontrada: ${categoryHandle}`)
      return (
        <div className="w-full py-16 bg-yellow-50">
          <div className="content-container">
            <div className="border-2 border-yellow-500 rounded p-4">
              <p className="text-lg font-bold text-yellow-800">⚠️ Debug: Categoría no encontrada</p>
              <p className="text-sm text-yellow-700 mt-2">Handle buscado: <code className="bg-yellow-100 px-2 py-1 rounded">{categoryHandle}</code></p>
              <p className="text-xs text-yellow-600 mt-2">Esta sección aparecerá cuando se ejecute el seed correctamente.</p>
            </div>
          </div>
        </div>
      )
    }

    console.log(`✅ Categoría encontrada: ${category.name} (ID: ${category.id})`)

    // Construir array de IDs incluyendo subcategorías
    const categoryIds = [category.id]
    if (category.category_children && category.category_children.length > 0) {
      category.category_children.forEach((child) => {
        categoryIds.push(child.id)
        console.log(`  📁 Subcategoría: ${child.name} (ID: ${child.id})`)
      })
      console.log(`✅ Total subcategorías encontradas: ${category.category_children.length}`)
    } else {
      console.log(`⚠️ No hay subcategorías para ${category.name}`)
    }
    console.log(`🔍 Buscando productos en IDs: [${categoryIds.join(', ')}]`)

    // Obtener productos de la categoría y sus subcategorías
    const {
      response: { products: pricedProducts },
    } = await listProducts({
      regionId: region.id,
      queryParams: {
        category_id: categoryIds,
        fields: "*variants.calculated_price",
        limit: 4, // Mostrar solo 4 productos
      },
    })

    console.log(`✅ Productos encontrados en "${categoryHandle}": ${pricedProducts?.length || 0}`)

    if (pricedProducts && pricedProducts.length > 0) {
      pricedProducts.forEach((product, index) => {
        console.log(`  ${index + 1}. ${product.title}`)
      })
    }

    if (!pricedProducts || pricedProducts.length === 0) {
      console.log(`❌ No hay productos en la categoría: ${categoryHandle}`)
      return null
    }

    // Determinar la ruta correcta (collections para Victoria's Secret, categories para el resto)
    const linkPath = categoryHandle === "victoria-secret"
      ? `/collections/${categoryHandle}`
      : `/categories/${categoryHandle}`

    return (
      <section className="w-full py-16">
        <div className="content-container">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-serif text-3xl md:text-4xl tracking-wide text-black" style={{ fontWeight: 500 }}>
              {title}
            </h2>
            <LocalizedClientLink
              href={linkPath}
              className="font-serif text-sm tracking-[0.15em] text-gray-600 hover:text-black transition-colors uppercase"
              style={{ fontWeight: 400 }}
            >
              VER TODO
            </LocalizedClientLink>
          </div>

          {/* Products Grid */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricedProducts.map((product) => (
              <li key={product.id}>
                <ProductPreview product={product} region={region} isFeatured />
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  } catch (error) {
    console.error(`Error en CategorySection (${categoryHandle}):`, error)
    return null
  }
}
