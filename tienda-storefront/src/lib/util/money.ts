type ConvertToLocaleParams = {
  amount: number
  currency_code?: string // Mantenido por compatibilidad
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  locale?: string
}

export const convertToLocale = ({
  amount,
  minimumFractionDigits,
  maximumFractionDigits,
  locale = "es-AR",
}: ConvertToLocaleParams) => {
  // Formatear montos en pesos argentinos
  const formatted = new Intl.NumberFormat(locale, {
    style: "decimal",
    minimumFractionDigits: minimumFractionDigits ?? 2,
    maximumFractionDigits: maximumFractionDigits ?? 2,
  }).format(amount)

  return `$ ${formatted}`
}
