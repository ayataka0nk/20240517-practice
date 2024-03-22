import { IconType, Icon } from '../Icon'
import { ButtonVariant } from './types'

type Props = {
  icon: IconType
  variant: ButtonVariant
}
export const IconForButton = ({ icon, variant }: Props) => {
  switch (variant) {
    case 'filled':
      return <Icon type={icon} variant="solid" className="w-5 h-5" />
    case 'outlined':
      return <Icon type={icon} variant="outline" className="w-5 h-5" />
    case 'text':
      return <Icon type={icon} variant="outline" className="w-5 h-5" />
  }
}
