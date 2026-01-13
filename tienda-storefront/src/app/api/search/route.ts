import { NextRequest, NextResponse } from 'next/server'
import { listProducts } from '@lib/data/products'
import { listCollections } from '@lib/data/collections'
import { listCategories } from '@lib/data/categories'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')

  if (!query || query.trim().length < 2) {
    return NextResponse.json({
      products: [],
      collections: [],
      categories: []
    })
  }

  try {
    const searchTerm = query.toLowerCase()

    // Buscar productos
    const { response: { products } } = await listProducts({
      queryParams: {
        q: query,
        limit: 10
      },
      countryCode: 'ar' // Ajusta según tu región por defecto
    })

    // Buscar colecciones (marcas)
    const { collections: allCollections } = await listCollections()
    const collections = allCollections.filter(collection =>
      collection.title?.toLowerCase().includes(searchTerm)
    ).slice(0, 5)

    // Buscar categorías
    const allCategories = await listCategories()
    const categories = allCategories.filter(category =>
      category.name?.toLowerCase().includes(searchTerm)
    ).slice(0, 5)

    return NextResponse.json({
      products: products.map(p => ({
        id: p.id,
        title: p.title,
        handle: p.handle,
        thumbnail: p.thumbnail
      })),
      collections: collections.map(c => ({
        id: c.id,
        title: c.title,
        handle: c.handle
      })),
      categories: categories.map(c => ({
        id: c.id,
        name: c.name,
        handle: c.handle
      }))
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({
      products: [],
      collections: [],
      categories: []
    }, { status: 500 })
  }
}
