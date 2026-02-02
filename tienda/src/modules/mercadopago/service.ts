import { AbstractPaymentProvider } from "@medusajs/framework/utils"
import {
  InitiatePaymentInput,
  InitiatePaymentOutput,
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  ProviderWebhookPayload,
  WebhookActionResult,
} from "@medusajs/types"
import { MercadoPagoConfig, Preference, Payment } from "mercadopago"

type MercadoPagoOptions = {
  access_token: string
  back_url_success?: string
  back_url_failure?: string
  back_url_pending?: string
  notification_url?: string
}

export class MercadoPagoProviderService extends AbstractPaymentProvider<MercadoPagoOptions> {
  static identifier = "mercadopago"
  protected client_: MercadoPagoConfig
  protected preference_: Preference
  protected payment_: Payment
  protected options_: MercadoPagoOptions

  constructor(container: any, options: MercadoPagoOptions) {
    super(container, options)
    this.options_ = options

    if (!options.access_token) {
      throw new Error("MercadoPago access token is required")
    }

    this.client_ = new MercadoPagoConfig({
      accessToken: options.access_token,
    })

    this.preference_ = new Preference(this.client_)
    this.payment_ = new Payment(this.client_)
  }

  async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
    const { amount, currency_code, context } = input
    const ctx = context as any

    console.log(">>> MercadoPago initiatePayment called with:", {
      amount,
      currency_code,
      resource_id: ctx?.resource_id,
      email: ctx?.email,
    })

    // Fallback URLs - usar localhost si no están configuradas
    const storeUrl = process.env.STORE_URL || "http://localhost:8000"
    const backendUrl = process.env.BACKEND_URL || "http://localhost:9000"

    const backUrls = {
      success: this.options_.back_url_success || `${storeUrl}/checkout/success`,
      failure: this.options_.back_url_failure || `${storeUrl}/checkout/failure`,
      pending: this.options_.back_url_pending || `${storeUrl}/checkout/pending`,
    }

    console.log(">>> MercadoPago back_urls:", backUrls)

    // Solo usar auto_return si no es localhost (MercadoPago no acepta localhost)
    const isLocalhost = backUrls.success.includes("localhost")

    const preferenceData: any = {
      items: [
        {
          id: ctx?.resource_id || "item",
          title: `Pedido ${ctx?.resource_id || ""}`,
          quantity: 1,
          unit_price: Number(amount) / 100,
          currency_id: currency_code.toUpperCase(),
        },
      ],
      payer: {
        email: ctx?.email || ctx?.customer?.email || "customer@example.com",
      },
      back_urls: backUrls,
      ...(isLocalhost ? {} : { auto_return: "approved" }),
      notification_url: this.options_.notification_url || `${backendUrl}/webhooks/mercadopago`,
      external_reference: ctx?.resource_id || "",
      metadata: {
        cart_id: ctx?.resource_id,
      },
    }

    console.log(">>> MercadoPago preference data:", JSON.stringify(preferenceData, null, 2))

    try {
      const preference = await this.preference_.create({ body: preferenceData })

      console.log(">>> MercadoPago preference created:", preference.id)

      if (!preference.id || !preference.init_point) {
        throw new Error("Failed to create MercadoPago preference - missing id or init_point")
      }

      return {
        id: preference.id,
        data: {
          preference_id: preference.id,
          init_point: preference.init_point,
          sandbox_init_point: preference.sandbox_init_point,
        },
      }
    } catch (error: any) {
      console.error(">>> MercadoPago ERROR:", error.message)
      console.error(">>> MercadoPago ERROR details:", JSON.stringify(error, null, 2))
      throw error
    }
  }

  async authorizePayment(input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
    const { data } = input
    const paymentId = data?.payment_id as string

    if (!paymentId) {
      return {
        status: "pending",
        data: data,
      }
    }

    const payment = await this.payment_.get({ id: paymentId })

    if (!payment) {
      throw new Error("Payment not found")
    }

    let status: "authorized" | "pending" | "error" | "canceled"
    switch (payment.status) {
      case "approved":
        status = "authorized"
        break
      case "pending":
      case "in_process":
        status = "pending"
        break
      case "rejected":
      case "cancelled":
        status = "canceled"
        break
      default:
        status = "pending"
    }

    return {
      status,
      data: {
        ...data,
        payment_id: payment.id,
        status: payment.status,
        status_detail: payment.status_detail,
      },
    }
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    return {
      data: {
        ...input.data,
        cancelled: true,
      },
    }
  }

  async capturePayment(input: CapturePaymentInput): Promise<CapturePaymentOutput> {
    return {
      data: input.data,
    }
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return {
      data: input.data,
    }
  }

  async getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
    const paymentId = input.data?.payment_id as string

    if (!paymentId) {
      return { status: "pending" }
    }

    const payment = await this.payment_.get({ id: paymentId })

    switch (payment.status) {
      case "approved":
        return { status: "authorized" }
      case "pending":
      case "in_process":
        return { status: "pending" }
      case "rejected":
      case "cancelled":
        return { status: "canceled" }
      default:
        return { status: "pending" }
    }
  }

  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    // MercadoPago refunds requieren llamar a la API directamente
    // Por ahora, retornamos los datos marcando que el refund fue procesado
    return {
      data: {
        ...input.data,
        refund_requested: true,
        refunded_amount: input.amount,
      },
    }
  }

  async retrievePayment(input: RetrievePaymentInput): Promise<RetrievePaymentOutput> {
    const paymentId = input.data?.payment_id as string

    if (!paymentId) {
      return { data: input.data || {} }
    }

    const payment = await this.payment_.get({ id: paymentId })

    return {
      data: {
        ...input.data,
        payment_id: payment.id,
        status: payment.status,
        status_detail: payment.status_detail,
      },
    }
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    return {
      data: input.data || {},
    }
  }

  async getWebhookActionAndData(payload: ProviderWebhookPayload["payload"]): Promise<WebhookActionResult> {
    const data = payload.data as any

    if (!data || !data.id) {
      return {
        action: "not_supported",
      }
    }

    try {
      const payment = await this.payment_.get({ id: data.id })

      if (payment.status === "approved" && payment.external_reference) {
        return {
          action: "authorized",
          data: {
            session_id: payment.external_reference,
            amount: (payment.transaction_amount || 0) * 100,
          },
        }
      }

      return {
        action: "not_supported",
      }
    } catch (error) {
      return {
        action: "not_supported",
      }
    }
  }
}

export default MercadoPagoProviderService
