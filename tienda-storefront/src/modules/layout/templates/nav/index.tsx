import { Suspense } from "react"
import Image from "next/image"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import ProductsDropdown from "@modules/layout/components/products-dropdown"
import SearchBar from "@modules/layout/components/search-bar"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 bg-white">
      <header className="relative mx-auto bg-white">
        <div className="content-container">
          {/* Top bar with logo, search and cart */}
          <div className="relative flex items-center h-20 border-b border-grey-20">
            {/* Mobile menu - Left */}
            <div className="small:hidden flex-shrink-0">
              <SideMenu regions={regions} />
            </div>

            {/* Logo - Absolutely centered */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <LocalizedClientLink
                href="/"
                className="block"
                data-testid="nav-store-link"
              >
                <div className="relative h-44 w-[26rem] sm:h-48 sm:w-[32rem]">
                  <Image
                    src="/logostorebypauli.png"
                    alt="Store by Pauli"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </LocalizedClientLink>
            </div>

            {/* Search and Cart - Right */}
            <div className="flex items-center gap-4 ml-auto">
              <div className="hidden small:flex">
                <SearchBar />
              </div>
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-ui-fg-base flex gap-2"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </div>

          {/* Navigation menu */}
          <nav className="hidden small:flex items-center justify-center gap-8 h-14 text-sm uppercase tracking-[0.25em] font-serif" style={{ fontWeight: 400 }}>
            <LocalizedClientLink
              href="/"
              className="hover:text-black text-grey-60 transition-colors"
            >
              Inicio
            </LocalizedClientLink>
            <ProductsDropdown />
            <LocalizedClientLink
              href="/about"
              className="hover:text-black text-grey-60 transition-colors"
            >
              Quienes Somos
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/returns"
              className="hover:text-black text-grey-60 transition-colors"
            >
              Política de Cambio
            </LocalizedClientLink>
          </nav>
        </div>
      </header>
    </div>
  )
}
