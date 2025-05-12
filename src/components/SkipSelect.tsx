import { useEffect, useState } from "react"
import useSkips from "../hooks/useSkips"
import { Skip } from "../types"
import SkipCard from "./SkipCard"
import FilterBar, { Filters } from "./FilterBar"
import StepHeader from "./StepHeader"

interface Props {
  postcode: string
  area: string
}

export default function SkipSelect({ postcode, area }: Props) {
  const { skips, loading, error } = useSkips({ postcode, area })

  const [selected, setSelected] = useState<Skip | null>(null)

  const [filters, setFilters] = useState<Filters>({
    minSize: 4,
    maxSize: 40,
    minPrice: 50,
    maxPrice: 1000,
    minHire: 1,
    maxHire: 28,
  })

  useEffect(() => {
    if (!skips.length || filters.minSize) return 
    const sizes = skips.map((s) => s.yards)
    const prices = skips.map((s) => s.price)
    const hires = skips.map((s) => s.hirePeriodDays)

    setFilters({
      minSize: Math.min(...sizes).toString(),
      maxSize: Math.max(...sizes).toString(),
      minPrice: Math.min(...prices).toString(),
      maxPrice: Math.max(...prices).toString(),
      minHire: Math.min(...hires).toString(),
      maxHire: Math.max(...hires).toString(),
    })
  }, [skips, filters.minSize])

  const filteredSkips = skips.filter((s) => {
    const pass =
      (!filters.minSize || s.yards >= +filters.minSize) &&
      (!filters.maxSize || s.yards <= +filters.maxSize) &&
      (!filters.minPrice || s.price >= +filters.minPrice) &&
      (!filters.maxPrice || s.price <= +filters.maxPrice) &&
      (!filters.minHire || s.hirePeriodDays >= +filters.minHire) &&
      (!filters.maxHire || s.hirePeriodDays <= +filters.maxHire)
    return pass
  })

  useEffect(() => {
    if (selected && !filteredSkips.some((s) => s.id === selected.id)) {
      setSelected(null)
    }
  }, [filteredSkips, selected])

  if (loading) return <p className="p-4">Loading skips…</p>
  if (error) return <p className="p-4 text-red-500">{error}</p>

  return (
    <>
      <section
        className="min-h-screen bg-ivory mb-24
             before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.015),transparent_60%)]
             before:pointer-events-none"
      >
        <StepHeader />

        <header className="text-center mb-10">
          <h2 className="font-serif text-3xl font-semibold text-gray-900">
            Choose Your Skip Size
          </h2>
          <p className="mt-2 text-gray-500">
            Select the skip size that best suits your needs
          </p>
        </header>

        <FilterBar filters={filters} setFilters={setFilters} />

        {filteredSkips.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            {filteredSkips.map((skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                selected={selected?.id === skip.id}
                onSelect={setSelected}
              />
            ))}
          </div>
        ) : (
          <p className="p-4 max-w-6xl mx-auto">
            No skips match the current filters.
          </p>
        )}
      </section>

      {selected && (
        <footer
          className="fixed inset-x-0 bottom-0 z-40
         bg-white/70 backdrop-blur-md
         shadow-[0_-4px_16px_rgba(0,0,0,0.08)]
         ring-1 ring-white/40"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 max-[600px]:flex-col">
            <div className="flex flex-col">
              <span className="font-serif text-base font-semibold text-gray-900">
                8&nbsp;Yard&nbsp;Skip
              </span>
              <span className="text-lg font-bold text-gray-800">
                £375
                <span className="ml-1 text-sm font-normal text-gray-500">
                  (14-day hire)
                </span>
              </span>
            </div>

            <div className="flex gap-3">
              <button
                className="rounded-xl border border-gray-300/70 bg-white/60 px-6 py-2
               text-sm font-medium text-gray-600
               hover:bg-gray-100/70 active:scale-95 transition"
              >
                Back
              </button>

              <button
                className="inline-flex items-center gap-2 rounded-full
               bg-gradient-to-r from-gold to-amber-500 px-7 py-2
               text-sm font-semibold text-white shadow-md
               hover:brightness-105 active:scale-95 transition"
              >
                Continue
                <svg
                  className="h-4 w-4 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      )}
    </>
  )
}
