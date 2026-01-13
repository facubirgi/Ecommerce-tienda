import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import BrandLogos from "@modules/home/components/brand-logos"
import NewArrivals from "@modules/home/components/new-arrivals"
import VideoSection from "@modules/home/components/video-section"
import BenefitsSection from "@modules/home/components/benefits-section"

export const metadata: Metadata = {
  title: "Store by Pauli - Moda y Accesorios de Lujo",
  description:
    "Descubre las mejores marcas de moda y accesorios de lujo en Store by Pauli.",
}

export default async function Home() {
  return (
    <>
      <Hero />
      <BrandLogos />
      <VideoSection />
      <NewArrivals />
      <BenefitsSection />
    </>
  )
}
