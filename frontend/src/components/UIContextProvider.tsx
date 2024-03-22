import React from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import { TailwindContextProvider } from './TailwindConfig/TailwindContext'

export const UIContextProvider = ({
  tailwindConfig,
  children
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tailwindConfig: ReturnType<typeof resolveConfig<any>>
  children: React.ReactNode
}) => {
  return (
    <TailwindContextProvider tailwindConfig={tailwindConfig}>
      {children}
    </TailwindContextProvider>
  )
}
