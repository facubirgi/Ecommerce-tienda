'use client'

import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"

type AddToCartButtonProps = {
  product: HttpTypes.StoreProduct
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string
  const router = useRouter()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Si el producto tiene múltiples variantes, redirigir a la página del producto
    if ((product.variants?.length ?? 0) > 1) {
      router.push(`/${countryCode}/products/${product.handle}`)
      return
    }

    // Si tiene una sola variante, agregarla directamente
    const variant = product.variants?.[0]
    if (!variant?.id) return

    setIsAdding(true)

    try {
      await addToCart({
        variantId: variant.id,
        quantity: 1,
        countryCode,
      })

      // Opcional: Mostrar notificación de éxito
      alert('Producto agregado al carrito')

      // Recargar para actualizar el contador del carrito
      router.refresh()
    } catch (error) {
      console.error('Error al agregar al carrito:', error)
      alert('Error al agregar al carrito')
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="w-full bg-black text-white font-serif text-xs tracking-[0.15em] uppercase py-3 hover:bg-gray-800 transition-colors disabled:opacity-50"
      style={{ fontWeight: 400 }}
    >
      {isAdding ? 'AGREGANDO...' : 'AGREGAR AL CARRITO'}
    </button>
  )
}
