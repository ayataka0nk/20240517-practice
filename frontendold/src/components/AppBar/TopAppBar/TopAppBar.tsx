import { IconType } from '@/components/Icon'
import { IconButton } from '@/components/IconButton'
import { ComponentProps, memo } from 'react'

type Props = ComponentProps<'header'> & {
  onLeadingIconClick: () => void
  leadingIcon: IconType
  logo: React.ReactNode
}

const TopAppBarComponent = ({
  className,
  leadingIcon,
  onLeadingIconClick,
  logo,
  ...props
}: Props) => {
  const style = getStyle()
  return (
    <header className={`${style} ${className}`} {...props}>
      <IconButton icon={leadingIcon} onClick={onLeadingIconClick} />
      {logo}
    </header>
  )
}

const getStyle = () => {
  return 'flex h-14 items-center min-w-full'
}

export const TopAppBar = memo(TopAppBarComponent) as typeof TopAppBarComponent
