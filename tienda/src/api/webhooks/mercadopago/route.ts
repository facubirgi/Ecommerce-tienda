import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

/**
 * Webhook handler for Mercado Pago IPN notifications
 * See: https://www.mercadopago.com.ar/developers/es/docs/your-integrations/notifications/ipn
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  try {
    const { type, data } = req.body as { type?: string; data?: { id?: string } }

    // Log the webhook for debugging
    console.log("Mercado Pago Webhook received:", { type, data })

    // Handle different notification types
    switch (type) {
      case "payment":
        // Payment notification - the most important one
        if (data?.id) {
          console.log("Payment notification received:", data.id)

          // The payment provider service will handle this via getWebhookActionAndData
          // which is automatically called by Medusa's webhook processing

          // Return success to Mercado Pago
          return res.status(200).json({ received: true })
        }
        break

      case "merchant_order":
        // Merchant order notification
        console.log("Merchant order notification:", data?.id)
        return res.status(200).json({ received: true })

      case "plan":
      case "subscription":
        // Subscription-related notifications
        console.log(`${type} notification:`, data?.id)
        return res.status(200).json({ received: true })

      default:
        console.log("Unknown notification type:", type)
        return res.status(200).json({ received: true })
    }

    return res.status(200).json({ received: true })
  } catch (error) {
    console.error("Error processing Mercado Pago webhook:", error)
    // Still return 200 to prevent Mercado Pago from retrying
    return res.status(200).json({ received: true })
  }
}

/**
 * GET endpoint for webhook verification (if needed)
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  return res.status(200).json({ status: "ok" })
}
