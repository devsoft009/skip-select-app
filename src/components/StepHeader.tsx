import {
  MapPin,
  Trash2,
  Truck,
  ShieldCheck,
  CalendarDays,
  CreditCard,
} from "lucide-react"

import { useMediaQuery } from "../hooks/useMediaQuery"

const steps = [
  { label: "Postcode", icon: MapPin },
  { label: "Waste Type", icon: Trash2 },
  { label: "Select Skip", icon: Truck },
  { label: "Permit Check", icon: ShieldCheck },
  { label: "Choose Date", icon: CalendarDays },
  { label: "Payment", icon: CreditCard },
]

export default function StepHeader() {
  const current = 2 

  const isDesktop = useMediaQuery("(max-width: 1080px)")
  const isMobile = useMediaQuery("(max-width: 640px)")

  const visibleSteps = isMobile
    ? [steps[2]]
    : isDesktop
    ? steps.slice(1, 4)
    : steps
  const visibleCurrent = isMobile ? 0 : isDesktop ? 1 : 2

  return (
    <nav className="py-12">
      <ol className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 text-sm mr-10">
        {visibleSteps.map(({ label, icon: Icon }, idx) => (
          <li
            key={label}
            className={`
          relative flex shrink-0 items-center gap-2 ml-10 
          ${
            idx === visibleCurrent
              ? "font-semibold text-gray-900 text-lg"
              : "font-medium text-gray-400"
          }
          after:absolute after:top-1/2 after:left-full after:ml-5 
          after:h-px after:w-10 after:bg-neutral-400
          last:after:hidden
        `}
          >
            <Icon
              size={18}
              className={
                idx === visibleCurrent ? "text-gray-800" : "text-gray-400"
              }
            />
            <span>{label}</span>
          </li>
        ))}
      </ol>
    </nav>
  )
}
