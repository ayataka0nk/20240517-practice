import { createContext, useContext } from 'react'

import resolveConfig from 'tailwindcss/resolveConfig'
import { BaseTailwindConfig } from './getTailwindConfig'

export type TailwindContextValue = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tailwindConfig: ReturnType<typeof resolveConfig<any>>
}

const TailwindContext = createContext<TailwindContextValue | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useTailwindConfig = <
  TailwindConfig = BaseTailwindConfig,
>(): TailwindConfig => {
  const context = useContext(TailwindContext)
  if (context === null) {
    throw new Error('useTailwindConfig must be used within a UIContextProvider')
  }
  return context.tailwindConfig
}

export const TailwindContextProvider = ({
  tailwindConfig,
  children
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tailwindConfig: ReturnType<typeof resolveConfig<any>>
  children: React.ReactNode
}) => {
  return (
    <TailwindContext.Provider value={{ tailwindConfig }}>
      {children}
    </TailwindContext.Provider>
  )
}
