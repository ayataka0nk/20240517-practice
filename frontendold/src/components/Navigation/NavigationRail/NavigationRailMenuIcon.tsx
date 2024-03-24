import { IconButton } from '@/components/IconButton'
import { MouseEventHandler } from 'react'

type Props = {
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const NavigationRailMenuIcon = ({ className, onClick }: Props) => {
  return (
    <IconButton
      variant="standard"
      icon="Bars3"
      className={`${className}`}
      onClick={onClick}
    />
  )
}
