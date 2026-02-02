"use client"

import { HttpTypes } from "@medusajs/types"
import { createContext } from "react"

type MercadoPagoWrapperProps = {
  paymentSession: HttpTypes.StorePaymentSession
  children: React.ReactNode
}

export const MercadoPagoContext = createContext(false)

const MercadoPagoWrapper: React.FC<MercadoPagoWrapperProps> = ({
  paymentSession,
  children,
}) => {
  // MercadoPago no requiere inicialización especial en el cliente
  // El init_point se usa para redirigir al usuario a completar el pago
  const initPoint = paymentSession?.data?.init_point as string | undefined

  if (!initPoint) {
    throw new Error(
      "Mercado Pago init_point is missing. Cannot initialize Mercado Pago."
    )
  }

  return (
    <MercadoPagoContext.Provider value={true}>
      {children}
    </MercadoPagoContext.Provider>
  )
}

export default MercadoPagoWrapper
