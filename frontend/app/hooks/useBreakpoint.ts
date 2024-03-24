import { useMemo } from 'react'
import { useMatchMedia } from './useMatchMedia'
import { useTailwindConfig } from '~/components/TailwindConfig'

export type Breakpoint = 'sm' | 'md' | 'xp' | 'lg' | 'xl'

export const useBreakpoint = (): Breakpoint => {
  const config = useTailwindConfig()
  const breakpoints = {
    md: `(min-width: ${config.theme.screens.md})`,
    xp: `(min-width: ${config.theme.screens.xp})`,
    lg: `(min-width: ${config.theme.screens.lg})`,
    xl: `(min-width: ${config.theme.screens.xl})`
  }
  const xlMatch = useMatchMedia(breakpoints.xl)
  const lgMatch = useMatchMedia(breakpoints.lg)
  const xpMatch = useMatchMedia(breakpoints.xp)
  const mdMatch = useMatchMedia(breakpoints.md)

  const breakpoint = useMemo(() => {
    if (xlMatch) return 'xl'
    if (lgMatch) return 'lg'
    if (xpMatch) return 'xp'
    if (mdMatch) return 'md'
    return 'sm'
  }, [mdMatch, xlMatch, lgMatch, xpMatch])

  return breakpoint
}
