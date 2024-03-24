import { MouseEventHandler } from 'react'
import { IconButton } from '../../IconButton'

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
