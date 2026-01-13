import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-48 px-2 flex flex-col justify-center items-center text-center" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="font-serif text-4xl md:text-5xl mb-6 tracking-wide"
      >
        Tu Carrito
      </Heading>
      <Text className="font-serif text-gray-600 text-base md:text-lg mt-2 mb-8 max-w-[28rem] leading-relaxed">
        Aún no has agregado productos a tu carrito. Descubre nuestra colección y encuentra lo que buscas.
      </Text>
      <LocalizedClientLink href="/store">
        <button
          className="bg-black text-white font-serif text-xs tracking-[0.15em] uppercase px-8 py-3 hover:bg-gray-800 transition-colors"
          style={{ fontWeight: 400 }}
        >
          Explorar Productos
        </button>
      </LocalizedClientLink>
    </div>
  )
}

export default EmptyCartMessage
