import { useEffect, useState } from "react"

export function useMediaQuery(query: string) {
  const getMatches = () => window.matchMedia(query).matches
  const [matches, setMatches] = useState(getMatches)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener("change", handler)

    return () => mql.removeEventListener("change", handler)
  }, [query])

  return matches
}
