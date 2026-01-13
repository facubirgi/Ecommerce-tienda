import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="font-serif text-sm text-gray-600 hover:text-gray-900 tracking-wide uppercase"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h2"
          className="font-serif text-3xl leading-10 text-ui-fg-base tracking-wide"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <Text
          className="font-serif text-base text-gray-600 whitespace-pre-line leading-relaxed"
          data-testid="product-description"
        >
          {product.description}
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo
