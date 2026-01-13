import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import WhatsAppButton from "@modules/common/components/whatsapp-button"
import "styles/globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={playfair.variable}>
      <body>
        <main className="relative">{props.children}</main>
        <WhatsAppButton />
      </body>
    </html>
  )
}
