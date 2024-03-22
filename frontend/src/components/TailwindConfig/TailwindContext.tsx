import { createContext, useContext } from 'react'

import resolveConfig from 'tailwindcss/resolveConfig'
import { BaseTailwindConfig } from './getTailwindConfig'

export type TailwindContextValue = {
  tailwindConfig: ReturnType<typeof resolveConfig<any>>
}

const TailwindContext = createContext<TailwindContextValue | null>(null)

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
  tailwindConfig: ReturnType<typeof resolveConfig<any>>
  children: React.ReactNode
}) => {
  return (
    <TailwindContext.Provider value={{ tailwindConfig }}>
      {children}
    </TailwindContext.Provider>
  )
}
