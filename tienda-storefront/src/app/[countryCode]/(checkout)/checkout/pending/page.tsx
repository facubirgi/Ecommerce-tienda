"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter, useParams } from "next/navigation"
import { Heading, Text } from "@medusajs/ui"

export default function MercadoPagoPendingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const params = useParams()
  const countryCode = params.countryCode as string

  const [orderCreated, setOrderCreated] = useState(false)

  const paymentId = searchParams.get("payment_id")
  const externalReference = searchParams.get("external_reference")
  const status = searchParams.get("status")

  useEffect(() => {
    const createPendingOrder = async () => {
      if (!externalReference) return

      try {
        // Intentar completar la orden aunque el pago esté pendiente
        // El webhook de MercadoPago actualizará el estado cuando se confirme
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
          setOrderCreated(true)
          // Limpiar el carrito de las cookies
          document.cookie = "_medusa_cart_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        }
      } catch (error) {
        console.error("Error creating pending order:", error)
      }
    }

    createPendingOrder()
  }, [externalReference])

  const getPendingMessage = () => {
    switch (status) {
      case "in_process":
        return "Tu pago está siendo procesado por el banco."
      case "pending":
        return "Tu pago está pendiente de confirmación."
      default:
        return "Estamos esperando la confirmación de tu pago."
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto p-8 text-center">
        <div className="text-yellow-500 mb-6">
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <Heading level="h1" className="text-2xl mb-4 text-yellow-600">
          Pago Pendiente
        </Heading>

        <Text className="text-ui-fg-subtle mb-6">
          {getPendingMessage()}
        </Text>

        {paymentId && (
          <Text className="text-ui-fg-muted text-sm mb-6">
            Referencia de pago: {paymentId}
          </Text>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
          <Text className="text-yellow-800 text-sm">
            <strong>Importante:</strong> Tu pedido ha sido registrado. Te notificaremos por email
            cuando el pago sea confirmado.
          </Text>
        </div>

        {orderCreated && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
            <Text className="text-green-800 text-sm">
              Tu orden ha sido creada exitosamente. Puedes revisar el estado en tu cuenta.
            </Text>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push(`/${countryCode}/account/orders`)}
            className="bg-ui-bg-interactive text-ui-fg-on-color px-6 py-3 rounded-md hover:bg-ui-bg-interactive-hover transition-colors"
          >
            Ver Mis Pedidos
          </button>

          <button
            onClick={() => router.push(`/${countryCode}`)}
            className="bg-ui-bg-subtle text-ui-fg-base px-6 py-3 rounded-md hover:bg-ui-bg-subtle-hover transition-colors border border-ui-border-base"
          >
            Seguir Comprando
          </button>
        </div>

        <div className="mt-8 p-4 bg-ui-bg-subtle rounded-md">
          <Text className="text-ui-fg-subtle text-sm">
            <strong>¿Qué significa pago pendiente?</strong>
          </Text>
          <ul className="text-ui-fg-subtle text-sm text-left mt-2 space-y-1">
            <li>• El pago está siendo procesado por tu banco o entidad financiera</li>
            <li>• Puede tomar entre 1 a 3 días hábiles en confirmarse</li>
            <li>• Recibirás un email cuando el pago sea aprobado</li>
            <li>• Si elegiste pago en efectivo, tienes tiempo limitado para realizarlo</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
