import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import LoginTemplate from "@modules/account/templates/login-template"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Checkout",
}

export default async function Checkout() {
  const customer = await retrieveCustomer().catch(() => null)

  if (!customer) {
    return (
      <div className="flex justify-center py-12">
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Inicia sesión para continuar con tu compra
          </h1>
          <LoginTemplate />
        </div>
      </div>
    )
  }

  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  return (
    <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
      <PaymentWrapper cart={cart}>
        <CheckoutForm cart={cart} customer={customer} />
      </PaymentWrapper>
      <CheckoutSummary cart={cart} />
    </div>
  )
}
