import { IconType } from '@/components/Icon'
import { IconButton } from '@/components/IconButton'
import { ComponentProps } from 'react'

type Props = ComponentProps<'div'> & {
  icon?: IconType
  onIconClick?: () => void
}

export const NavigationDrawerHeader = ({
  className,
  children,
  icon,
  onIconClick,
  ...props
}: Props) => {
  const style = getStyle({ icon })
  return (
    <div className={`${className} ${style}`} {...props}>
      {icon && <IconButton icon={icon} onClick={onIconClick} />}
      <div>{children}</div>
    </div>
  )
}

const getStyle = ({ icon }: { icon?: IconType }) => {
  let styles = ['h-14', 'flex', 'items-center']
  if (icon) {
    styles = [...styles, 'ml-0', 'md:ml-4']
  } else {
    styles = [...styles, 'ml-7']
  }
  return styles.join(' ')
}
