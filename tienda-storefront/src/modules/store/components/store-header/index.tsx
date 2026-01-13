"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import SortProducts, { SortOptions } from "../refinement-list/sort-products"

type StoreHeaderProps = {
  sortBy: SortOptions
}

const StoreHeader = ({ sortBy }: StoreHeaderProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <div className="flex items-center justify-between mb-8">
      <h1
        className="font-serif text-2xl md:text-3xl tracking-[0.1em] text-black uppercase"
        style={{ fontWeight: 400 }}
        data-testid="store-page-title"
      >
        TODOS LOS PRODUCTOS
      </h1>
      <div className="hidden small:block">
        <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} />
      </div>
    </div>
  )
}

export default StoreHeader
