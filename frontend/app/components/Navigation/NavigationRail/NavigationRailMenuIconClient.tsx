import { NavigationRailMenuIcon } from '@ayataka/tailwind-md3'
import { useNavigationContext } from '../NavigationContext'

export const NavigationRailMenuIconClient = () => {
  const { setIsDrawerModalOpen } = useNavigationContext()
  const handleMenuIconClick = () => {
    setIsDrawerModalOpen(true)
  }
  return <NavigationRailMenuIcon onClick={handleMenuIconClick} />
}
