import { NavigationRailMenuIcon } from '@/components/Navigation/NavigationRail'
import { useNavigationContext } from '../NavigationContext'

export const NavigationRailMenuIconClient = () => {
  const { setIsDrawerModalOpen } = useNavigationContext()
  const handleMenuIconClick = () => {
    setIsDrawerModalOpen(true)
  }
  return <NavigationRailMenuIcon onClick={handleMenuIconClick} />
}
