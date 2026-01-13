'use client'

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { useState } from "react"
import ProductQuickView from "../product-quick-view"

type ProductPreviewProps = {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}

export default function ProductPreview({
  product,
  isFeatured,
  region,
}: ProductPreviewProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  const { cheapestPrice } = getProductPrice({
    product,
  })

  // Obtener marca desde metadata o collection
  const brand = (product.metadata?.brand as string) || product.collection?.title || "MARCA"

  return (
    <>
      <div className="bg-white overflow-hidden group" data-testid="product-wrapper">
        {/* Product Image */}
        <LocalizedClientLink href={`/products/${product.handle}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-gray-50">
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="full"
              isFeatured={isFeatured}
            />
          </div>
        </LocalizedClientLink>

        {/* Product Info */}
        <div className="p-4">
          <p
            className="font-serif text-xs tracking-[0.15em] text-gray-500 uppercase mb-1"
            style={{ fontWeight: 400 }}
          >
            {brand}
          </p>
          <LocalizedClientLink href={`/products/${product.handle}`}>
            <h3
              className="font-serif text-base text-black mb-2 hover:text-gray-600 transition-colors"
              style={{ fontWeight: 400 }}
              data-testid="product-title"
            >
              {product.title}
            </h3>
          </LocalizedClientLink>
          {/* Price */}
          <div className="mb-6">
            {cheapestPrice && (
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl text-black">
                  {cheapestPrice.calculated_price}
                </span>
                {cheapestPrice.original_price_number &&
                 cheapestPrice.original_price_number !== cheapestPrice.calculated_price_number && (
                  <span className="font-serif text-lg text-gray-400 line-through">
                    {cheapestPrice.original_price}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => setIsQuickViewOpen(true)}
            className="w-full bg-black text-white font-serif text-xs tracking-[0.15em] uppercase py-3 hover:bg-gray-800 transition-colors"
            style={{ fontWeight: 400 }}
          >
            AGREGAR AL CARRITO
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      <ProductQuickView
        product={product}
        region={region}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  )
}
