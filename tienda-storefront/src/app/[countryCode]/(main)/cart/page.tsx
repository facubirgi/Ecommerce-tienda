import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import LoginTemplate from "@modules/account/templates/login-template"
import CartTemplate from "@modules/cart/templates"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Cart",
  description: "View your cart",
}

export default async function Cart() {
  const customer = await retrieveCustomer().catch(() => null)

  if (!customer) {
    return (
      <div className="flex justify-center py-12">
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Inicia sesión para ver tu carrito
          </h1>
          <LoginTemplate />
        </div>
      </div>
    )
  }

  const cart = await retrieveCart().catch((error) => {
    console.error(error)
    return notFound()
  })

  return <CartTemplate cart={cart} customer={customer} />
}
