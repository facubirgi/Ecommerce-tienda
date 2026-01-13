"use client"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text, useToggleState } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="bg-white">
      <LocalizedClientLink
        href="/cart"
        className="text-gray-700 hover:text-black inline-flex items-center gap-x-2 font-serif text-sm tracking-wide transition-colors mb-4"
        data-testid="back-to-cart-link"
      >
        <ChevronDown className="rotate-90" size={16} />
        <span className="hidden small:inline">Volver al carrito</span>
      </LocalizedClientLink>
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className="flex flex-row text-2xl font-serif tracking-wide gap-x-2 items-baseline text-black"
        >
          Dirección de Envío
          {!isOpen && <CheckCircleSolid />}
        </Heading>
        {!isOpen && cart?.shipping_address && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-gray-700 hover:text-black font-serif text-sm tracking-wide transition-colors"
              data-testid="edit-address-button"
            >
              Editar
            </button>
          </Text>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div>
                <Heading
                  level="h2"
                  className="text-2xl font-serif tracking-wide gap-x-4 pb-6 pt-8 text-black"
                >
                  Dirección de Facturación
                </Heading>

                <BillingAddress cart={cart} />
              </div>
            )}
            <SubmitButton className="mt-6 bg-black hover:bg-gray-800 text-white font-serif tracking-wide" data-testid="submit-address-button">
              Continuar a envío
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          <div className="text-sm font-serif">
            {cart && cart.shipping_address ? (
              <div className="flex items-start gap-x-8">
                <div className="flex items-start gap-x-1 w-full">
                  <div
                    className="flex flex-col w-1/3"
                    data-testid="shipping-address-summary"
                  >
                    <Text className="text-sm font-medium text-black mb-2 font-serif">
                      Dirección de Envío
                    </Text>
                    <Text className="text-sm text-gray-600 font-serif">
                      {cart.shipping_address.first_name}{" "}
                      {cart.shipping_address.last_name}
                    </Text>
                    <Text className="text-sm text-gray-600 font-serif">
                      {cart.shipping_address.address_1}{" "}
                      {cart.shipping_address.address_2}
                    </Text>
                    <Text className="text-sm text-gray-600 font-serif">
                      {cart.shipping_address.postal_code},{" "}
                      {cart.shipping_address.city}
                    </Text>
                    <Text className="text-sm text-gray-600 font-serif">
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </Text>
                  </div>

                  <div
                    className="flex flex-col w-1/3 "
                    data-testid="shipping-contact-summary"
                  >
                    <Text className="text-sm font-medium text-black mb-2 font-serif">
                      Contacto
                    </Text>
                    <Text className="text-sm text-gray-600 font-serif">
                      {cart.shipping_address.phone}
                    </Text>
                    <Text className="text-sm text-gray-600 font-serif">
                      {cart.email}
                    </Text>
                  </div>

                  <div
                    className="flex flex-col w-1/3"
                    data-testid="billing-address-summary"
                  >
                    <Text className="text-sm font-medium text-black mb-2 font-serif">
                      Dirección de Facturación
                    </Text>

                    {sameAsBilling ? (
                      <Text className="text-sm text-gray-600 font-serif">
                        La dirección de facturación es la misma que la de envío.
                      </Text>
                    ) : (
                      <>
                        <Text className="text-sm text-gray-600 font-serif">
                          {cart.billing_address?.first_name}{" "}
                          {cart.billing_address?.last_name}
                        </Text>
                        <Text className="text-sm text-gray-600 font-serif">
                          {cart.billing_address?.address_1}{" "}
                          {cart.billing_address?.address_2}
                        </Text>
                        <Text className="text-sm text-gray-600 font-serif">
                          {cart.billing_address?.postal_code},{" "}
                          {cart.billing_address?.city}
                        </Text>
                        <Text className="text-sm text-gray-600 font-serif">
                          {cart.billing_address?.country_code?.toUpperCase()}
                        </Text>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  )
}

export default Addresses
