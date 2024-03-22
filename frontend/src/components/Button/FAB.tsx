import { Icon, IconType } from '../Icon'
import { ButtonColor } from './types'

type FABSize = 'small' | 'medium' | 'large'
type OwnProps<E extends React.ElementType> = {
  color?: ButtonColor
  icon: IconType
  component?: E
  floating?: boolean
  size?: FABSize
}

type Props<E extends React.ElementType> = OwnProps<E> &
  Omit<React.ComponentProps<E>, keyof OwnProps<E>>

export const FAB = <E extends React.ElementType = 'button'>({
  className,
  color = 'primary',
  icon,
  component,
  floating,
  size = 'medium',
  ...props
}: Props<E>) => {
  const Component = component || 'button'
  const style = getStyle({ color, floating, size })
  const iconStyle = getIconStyle({ size })
  return (
    <Component {...props} className={`${className}`}>
      <div className={style}>
        {icon && <Icon type={icon} variant="outline" className={iconStyle} />}
      </div>
    </Component>
  )
}

const getStyle = ({
  color,
  floating,
  size
}: {
  color: ButtonColor
  floating?: boolean
  size: FABSize
}) => {
  let styles = [
    'relative',
    'inline-flex',
    'items-center',
    'align-bottom',
    'gap-2',
    'overflow-hidden',
    'hover:after:absolute',
    'hover:after:inset-0',
    'hover:after:full-width',
    'hover:after:opacity-8',
    'active:after:absolute',
    'active:after:inset-0',
    'active:after:full-width',
    'active:after:opacity-10',
    'before:absolute',
    'before:inset-0',
    'before:full-width',
    'before:pointer-events-none',
    'before:bg-no-repeat',
    'before:bg-center',
    'before:opacity-0',
    'before:transform',
    'before:scale-10',
    'before:[transition:transform_.3s,opacity_2s]',
    'active:before:scale-0',
    'active:before:opacity-10',
    'active:before:duration-0',
    'focus-visible:after:absolute',
    'focus-visible:after:inset-0',
    'focus-visible:after:full-width',
    'focus-visible:after:opacity-10',
    'focus-visible:outline-none',

    'text-sm',
    'font-semibold',
    'flex',
    'justify-center',
    'items-center'
  ]
  switch (color) {
    case 'primary':
      styles = [
        ...styles,
        'bg-primary-container',
        'text-on-primary-container',
        'hover:after:bg-on-primary-container',
        'active:after:bg-on-primary-container',
        'focus-visible:after:bg-on-primary-container',
        'before:bg-on-primary-container'
      ]
      break
    case 'secondary':
      styles = [
        ...styles,
        'bg-secondary-container',
        'text-on-secondary-container',
        'hover:after:bg-on-secondary-container',
        'active:after:bg-on-secondary-container',
        'focus-visible:after:bg-on-secondary-container',
        'before:bg-on-secondary-container'
      ]
      break
    case 'tertiary':
      styles = [
        ...styles,
        'bg-tertiary-container',
        'text-on-tertiary-container',
        'hover:after:bg-on-tertiary-container',
        'active:after:bg-on-tertiary-container',
        'focus-visible:after:bg-on-tertiary-container',
        'before:bg-on-tertiary-container'
      ]
      break
  }

  if (floating) {
    styles = [...styles, 'shadow-6dp']
  }
  if (size === 'small') {
    styles = [
      ...styles,
      'w-10',
      'h-10',
      'rounded-[12px]',
      'before:rounded-[12px]'
    ]
  } else if (size === 'medium') {
    styles = [
      ...styles,
      'w-14',
      'h-14',
      'rounded-[16px]',
      'before:rounded-[16px]'
    ]
  } else if (size === 'large') {
    styles = [
      ...styles,
      'w-24',
      'h-24',
      'rounded-[28px]',
      'before:rounded-[28px]'
    ]
  }
  return styles.join(' ')
}

const getIconStyle = ({ size }: { size: FABSize }) => {
  if (size === 'small') {
    return 'w-6 h-6'
  } else if (size === 'medium') {
    return 'w-6 h-6'
  } else if (size === 'large') {
    return 'w-9 h-9'
  }
}
