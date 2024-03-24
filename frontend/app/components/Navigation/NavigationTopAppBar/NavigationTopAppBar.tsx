import { TopAppBar } from '@ayataka/tailwind-md3'
import { useNavigationContext } from '../NavigationContext'

type Props = {
  logo: React.ReactNode
  className?: string
}

export const NavigationTopAppBar = ({ className, logo }: Props) => {
  const { setIsDrawerModalOpen } = useNavigationContext()
  const handleLeadingIconClick = () => {
    setIsDrawerModalOpen(true)
  }
  return (
    <TopAppBar
      className={`${className}`}
      logo={logo}
      leadingIcon="Bars3"
      onLeadingIconClick={handleLeadingIconClick}
    />
  )
}
