'use client'
import React, { createContext, useContext } from 'react'

export type NavigationContextValue = {
  isDrawerModalOpen: boolean
  setIsDrawerModalOpen: (isOpen: boolean) => void
}

export const NavigationContext = createContext<NavigationContextValue | null>(
  null
)

// eslint-disable-next-line react-refresh/only-export-components
export const useNavigationContext = () => {
  const context = useContext(NavigationContext)
  if (context === null) {
    throw new Error(
      'useNavigationContext must be used within a NavigationProvider'
    )
  }
  return context
}

export const NavigationContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [isDrawerModalOpen, setIsDrawerModalOpen] = React.useState(false)
  return (
    <NavigationContext.Provider
      value={{ isDrawerModalOpen, setIsDrawerModalOpen }}
    >
      {children}
    </NavigationContext.Provider>
  )
}
