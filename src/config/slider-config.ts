export const sliders = [
  {
    label: "Size (yd)",
    minKey: "minSize",
    maxKey: "maxSize",
    min: 4,
    max: 40,
    step: 1,
    unit: "yd",
  },
  {
    label: "Price (£)",
    minKey: "minPrice",
    maxKey: "maxPrice",
    min: 50,
    max: 1000,
    step: 10,
    unit: "£",
  },
  {
    label: "Hire (days)",
    minKey: "minHire",
    maxKey: "maxHire",
    min: 1,
    max: 28,
    step: 1,
    unit: "d",
  },
] as const
