'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useMemo } from 'react'
import { HttpTypes } from "@medusajs/types"
import { addToCart } from "@lib/data/cart"
import { useParams, useRouter } from "next/navigation"
import { convertToLocale } from "@lib/util/money"

import { isEqual } from "lodash"
import Image from "next/image"
import X from '@modules/common/icons/x'

type ProductQuickViewProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  isOpen: boolean
  onClose: () => void
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductQuickView({
  product,
  region,
  isOpen,
  onClose,
}: ProductQuickViewProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string
  const router = useRouter()

  // Preseleccionar opciones si solo hay una variante
  useState(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  })

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return product.variants?.[0]
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }
    if (selectedVariant?.allow_backorder) {
      return true
    }
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }
    return false
  }, [selectedVariant])

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return

    setIsAdding(true)

    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity: 1,
        countryCode,
      })
      onClose()
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsAdding(false)
    }
  }

  const price = selectedVariant?.calculated_price?.calculated_amount
  const originalPrice = selectedVariant?.calculated_price?.original_amount
  const currencyCode = selectedVariant?.calculated_price?.currency_code || 'ars'
  const brand = typeof product.metadata?.brand === 'string' ? product.metadata.brand : null

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-lg bg-white shadow-2xl transition-all">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                  {/* Image Column */}
                  <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    {product.thumbnail ? (
                      <Image
                        src={product.thumbnail}
                        alt={product.title || ''}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  {/* Info Column */}
                  <div className="flex flex-col">
                    {/* Brand */}
                    {brand && (
                      <p className="font-serif text-xs tracking-[0.15em] text-gray-500 uppercase mb-2">
                        {brand}
                      </p>
                    )}

                    {/* Title */}
                    <h2 className="font-serif text-2xl text-black mb-4">
                      {product.title}
                    </h2>

                    {/* Price */}
                    <div className="mb-6">
                      {price !== undefined && price !== null && (
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-2xl text-black price-text">
                            {convertToLocale({
                              amount: price,
                              currency_code: currencyCode,
                            })}
                          </span>
                          {originalPrice && originalPrice !== price && (
                            <span className="font-serif text-lg text-gray-400 line-through price-text">
                              {convertToLocale({
                                amount: originalPrice,
                                currency_code: currencyCode,
                              })}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {product.description && (
                      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                        {product.description}
                      </p>
                    )}

                    {/* Options/Variants */}
                    {(product.variants?.length ?? 0) > 1 && (
                      <div className="space-y-4 mb-6">
                        {(product.options || []).map((option) => (
                          <div key={option.id}>
                            <label className="block font-serif text-sm text-gray-700 mb-2 uppercase tracking-wider">
                              {option.title}
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {option.values?.map((value) => {
                                const isSelected = options[option.id] === value.value
                                return (
                                  <button
                                    key={value.id}
                                    onClick={() => setOptionValue(option.id, value.value)}
                                    className={`
                                      px-4 py-2 border rounded font-serif text-sm
                                      transition-colors
                                      ${isSelected
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-black border-gray-300 hover:border-black'
                                      }
                                    `}
                                  >
                                    {value.value}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Stock Status */}
                    {!inStock && (
                      <p className="text-red-600 text-sm mb-4">
                        Agotado
                      </p>
                    )}

                    {/* Add to Cart Button */}
                    <button
                      onClick={handleAddToCart}
                      disabled={!inStock || !selectedVariant || isAdding}
                      className="w-full bg-black text-white font-serif text-sm tracking-[0.15em] uppercase py-4 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAdding ? 'AGREGANDO...' : !selectedVariant ? 'SELECCIONA OPCIONES' : !inStock ? 'AGOTADO' : 'AGREGAR AL CARRITO'}
                    </button>

                    {/* View Full Details Link */}
                    <button
                      onClick={() => {
                        onClose()
                        router.push(`/${countryCode}/products/${product.handle}`)
                      }}
                      className="mt-4 text-sm text-gray-600 hover:text-black transition-colors underline"
                    >
                      Ver detalles completos
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
