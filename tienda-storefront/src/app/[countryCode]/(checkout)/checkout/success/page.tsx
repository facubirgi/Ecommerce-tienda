"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter, useParams } from "next/navigation"
import { Heading, Text } from "@medusajs/ui"

export default function MercadoPagoSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const params = useParams()
  const countryCode = params.countryCode as string

  const [status, setStatus] = useState<"processing" | "success" | "error">("processing")
  const [message, setMessage] = useState("Procesando tu pago...")

  useEffect(() => {
    const processPayment = async () => {
      const paymentId = searchParams.get("payment_id")
      const externalReference = searchParams.get("external_reference")
      const paymentStatus = searchParams.get("status")
      const collectionStatus = searchParams.get("collection_status")

      if (!paymentId || !externalReference) {
        setStatus("error")
        setMessage("Información de pago incompleta")
        return
      }

      try {
        // Completar la orden
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"}/store/carts/${externalReference}/complete`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        const data = await response.json()

        if (data.type === "order" && data.order?.id) {
          setStatus("success")
          setMessage("¡Pago exitoso! Redirigiendo a tu orden...")

          // Limpiar el carrito de las cookies
          document.cookie = "_medusa_cart_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

          // Redirigir a la página de confirmación
          setTimeout(() => {
            router.push(`/${countryCode}/order/${data.order.id}/confirmed`)
          }, 2000)
        } else {
          // Si la orden ya fue completada, intentar obtener el order_id del cart
          setStatus("success")
          setMessage("¡Pago procesado! Redirigiendo...")
          setTimeout(() => {
            router.push(`/${countryCode}/account/orders`)
          }, 2000)
        }
      } catch (error) {
        console.error("Error completing order:", error)
        setStatus("error")
        setMessage("Error al procesar la orden. Por favor contacta soporte.")
      }
    }

    processPayment()
  }, [searchParams, router, countryCode])

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto p-8 text-center">
        {status === "processing" && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-ui-fg-base mx-auto mb-6"></div>
            <Heading level="h1" className="text-2xl mb-4">
              Procesando tu pago
            </Heading>
            <Text className="text-ui-fg-subtle">
              {message}
            </Text>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-500 mb-6">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <Heading level="h1" className="text-2xl mb-4 text-green-600">
              ¡Pago Exitoso!
            </Heading>
            <Text className="text-ui-fg-subtle">
              {message}
            </Text>
          </>
        )}

        {status === "error" && (
          <>
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
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <Heading level="h1" className="text-2xl mb-4 text-red-600">
              Error en el Pago
            </Heading>
            <Text className="text-ui-fg-subtle mb-6">
              {message}
            </Text>
            <button
              onClick={() => router.push(`/${countryCode}/checkout`)}
              className="bg-ui-bg-interactive text-ui-fg-on-color px-6 py-3 rounded-md hover:bg-ui-bg-interactive-hover transition-colors"
            >
              Volver al Checkout
            </button>
          </>
        )}
      </div>
    </div>
  )
}
