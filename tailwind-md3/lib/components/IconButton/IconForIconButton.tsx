import { IconType, Icon } from '../Icon'
import { IconVariant } from '../Icon/types'
import { IconButtonVariant } from './types'

type Props = {
  className?: string
  icon: IconType
  variant: IconButtonVariant
  active: boolean
  iconVariant?: IconVariant
}
export const IconForIconButton = ({
  className,
  icon,
  variant,
  active,
  iconVariant
}: Props) => {
  const classNameLocal = className + ' w-6 h-6'
  switch (variant) {
    case 'standard':
      if (active) {
        return <Icon type={icon} variant="solid" className={classNameLocal} />
      } else {
        return (
          <Icon
            type={icon}
            variant={iconVariant || 'outline'}
            className={classNameLocal}
          />
        )
      }
    case 'filled':
      if (active) {
        return <Icon type={icon} variant="solid" className={classNameLocal} />
      } else {
        return <Icon type={icon} variant="outline" className={classNameLocal} />
      }
    case 'filled-tonal':
      if (active) {
        return <Icon type={icon} variant="solid" className={classNameLocal} />
      } else {
        return <Icon type={icon} variant="outline" className={classNameLocal} />
      }
  }
}
