import { sliders } from "../config/slider-config"
import { RangeSlider } from "./RangeSlider"

interface Filters {
  minSize: number
  maxSize: number
  minPrice: number
  maxPrice: number
  minHire: number
  maxHire: number
}

type FilterKey = keyof Filters

export default function FilterBar({ filters, setFilters }: Props) {
  const handleRange =
    <Low extends FilterKey, High extends FilterKey>(
      lowKey: Low,
      highKey: High
    ) =>
    ([low, high]: number[]) => {
      setFilters((prev) => ({
        ...prev,
        [lowKey]: low,
        [highKey]: high,
      }))
    }

  const reset = () =>
    setFilters({
      minSize: 4,
      maxSize: 40,
      minPrice: 50,
      maxPrice: 1000,
      minHire: 1,
      maxHire: 28,
    })

  return (
    <div className="mx-auto max-w-6xl mb-10 px-2 py-2">
      <form className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 py-8">
        {sliders.map((cfg) => (
          <RangeSlider
            key={cfg.label}
            label={cfg.label}
            minValue={filters[cfg.minKey]}
            maxValue={filters[cfg.maxKey]}
            min={cfg.min}
            max={cfg.max}
            step={cfg.step}
            unit={cfg.unit}
            onChange={handleRange(cfg.minKey, cfg.maxKey)}
          />
        ))}
      </form>

      <div className="mt-12 flex justify-center">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-8 py-3
                     text-sm font-medium text-gray-600 shadow hover:bg-gray-200
                     active:scale-95 transition"
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}
