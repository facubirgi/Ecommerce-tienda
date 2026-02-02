"use client"

import { useSearchParams, useRouter, useParams } from "next/navigation"
import { Heading, Text } from "@medusajs/ui"

export default function MercadoPagoFailurePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const params = useParams()
  const countryCode = params.countryCode as string

  const paymentId = searchParams.get("payment_id")
  const status = searchParams.get("status")
  const externalReference = searchParams.get("external_reference")

  const getErrorMessage = () => {
    switch (status) {
      case "rejected":
        return "Tu pago fue rechazado. Por favor intenta con otro método de pago."
      case "cancelled":
        return "El pago fue cancelado."
      default:
        return "Hubo un problema con tu pago. Por favor intenta nuevamente."
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto p-8 text-center">
        <div className="text-red-500 mb-6">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <Heading level="h1" className="text-2xl mb-4 text-red-600">
          Pago Rechazado
        </Heading>

        <Text className="text-ui-fg-subtle mb-6">
          {getErrorMessage()}
        </Text>

        {paymentId && (
          <Text className="text-ui-fg-muted text-sm mb-6">
            Referencia de pago: {paymentId}
          </Text>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push(`/${countryCode}/checkout`)}
            className="bg-ui-bg-interactive text-ui-fg-on-color px-6 py-3 rounded-md hover:bg-ui-bg-interactive-hover transition-colors"
          >
            Intentar Nuevamente
          </button>

          <button
            onClick={() => router.push(`/${countryCode}/cart`)}
            className="bg-ui-bg-subtle text-ui-fg-base px-6 py-3 rounded-md hover:bg-ui-bg-subtle-hover transition-colors border border-ui-border-base"
          >
            Volver al Carrito
          </button>
        </div>

        <div className="mt-8 p-4 bg-ui-bg-subtle rounded-md">
          <Text className="text-ui-fg-subtle text-sm">
            <strong>Consejos:</strong>
          </Text>
          <ul className="text-ui-fg-subtle text-sm text-left mt-2 space-y-1">
            <li>• Verifica que los datos de tu tarjeta sean correctos</li>
            <li>• Asegúrate de tener fondos suficientes</li>
            <li>• Intenta con otro método de pago</li>
            <li>• Contacta a tu banco si el problema persiste</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
