import * as Slider from "@radix-ui/react-slider"

interface RangeSliderProps {
  label: string
  minValue: number
  maxValue: number
  min: number
  max: number
  step: number
  onChange: (low: number, high: number) => void
  unit?: string
}

export const RangeSlider = ({
  label,
  minValue,
  maxValue,
  min,
  max,
  step,
  onChange,
  unit = "",
}: RangeSliderProps) => (
  <div className="max-w-xs w-full mx-auto space-y-4">
    <div className="flex items-baseline justify-between font-medium text-sm">
      <span>{label}</span>
      <span className="text-gray-600">
        {minValue}
        {unit} – {maxValue}
        {unit}
      </span>
    </div>

    <Slider.Root
      className="relative flex items-center select-none touch-none h-5"
      minStepsBetweenThumbs={1}
      min={min}
      max={max}
      step={step}
      value={[minValue, maxValue]}
      onValueChange={onChange}
    >
      <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
        <Slider.Range className="absolute h-full rounded-full bg-gray-600" />
      </Slider.Track>

      {[0, 1].map((i) => (
        <Slider.Thumb
          key={i}
          className="block w-4 h-4 rounded-full bg-white border border-gray-600 shadow
                     focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      ))}
    </Slider.Root>
  </div>
)
