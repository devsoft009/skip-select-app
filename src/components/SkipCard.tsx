import { Skip } from "../types"
import { ArrowRight } from "lucide-react"
import clsx from "clsx"

interface Props {
  skip: Skip
  selected: boolean
  onSelect: (skip: Skip) => void
}

export default function SkipCard({ skip, selected, onSelect }: Props) {
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onSelect(skip)
    }
  }

  return (
    <article
      tabIndex={0}
      role="button"
      onClick={() => onSelect(skip)}
      onKeyDown={handleKey}
      className={clsx(
        "group relative rounded-2xl bg-white shadow-elegant ring-1 ring-transparent transition-all duration-300 ease-swift hover:-translate-y-1 hover:ring-gold/30",
        "max-w-xs mx-auto",
        "hover:shadow-md hover:shadow-neutral-500/100",
        selected ? " shadow-md shadow-neutral-500/100" : ""
      )}
    >
      <span className="absolute right-4 top-4 z-10 rounded-full bg-coal px-3 py-1 text-xs font-medium tracking-wide text-white shadow">
        {skip.yards} Yards
      </span>
      <div className="overflow-hidden rounded-t-2xl">
        <img
          src={skip.image}
          alt={skip.name}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-swift group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="space-y-1 px-6 py-5">
        <h3 className="font-serif text-lg font-semibold text-coal">
          {skip.name}
        </h3>
        <span className="text-sm text-gray-500">
          {skip.hirePeriodDays}-day hire period
        </span>

        <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2">
          <p className="pt-3 font-sans text-lg font-medium text-coal">
            £{skip.price}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation() 
              onSelect(skip)
            }}
            className={clsx(
              "inline-flex items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition",
              selected
                ? "bg-neutral-600 text-white"
                : "bg-transparent ring-1 ring-neutral-600 hover:ring-brand/80 focus-visible:ring-2 focus-visible:ring-brand"
            )}
          >
            {selected ? "Selected" : "Select This Skip"}
            {!selected && <ArrowRight size={14} />}
          </button>
        </div>
      </div>
    </article>
  )
}
