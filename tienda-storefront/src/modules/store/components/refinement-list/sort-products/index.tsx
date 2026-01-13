"use client"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const sortOptions = [
  {
    value: "created_at",
    label: "Relevancia",
  },
  {
    value: "price_asc",
    label: "Precio: Menor a Mayor",
  },
  {
    value: "price_desc",
    label: "Precio: Mayor a Menor",
  },
]

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQueryParams("sortBy", e.target.value as SortOptions)
  }

  return (
    <div className="flex items-center gap-2">
      <label className="font-serif text-sm text-gray-600 whitespace-nowrap" style={{ fontWeight: 400 }}>
        Ordenar por:
      </label>
      <select
        value={sortBy}
        onChange={handleChange}
        data-testid={dataTestId}
        className="font-serif text-sm text-black bg-white border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-black transition-colors cursor-pointer"
        style={{ fontWeight: 400 }}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SortProducts
