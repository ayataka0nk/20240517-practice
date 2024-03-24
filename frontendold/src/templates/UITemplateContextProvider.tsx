import React from 'react'
import { NavigationContextProvider } from './Navigation/NavigationContext'

export const UITemplateContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  return <NavigationContextProvider>{children}</NavigationContextProvider>
}
