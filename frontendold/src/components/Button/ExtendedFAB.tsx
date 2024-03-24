import { Icon, IconType } from '../Icon'
import { ButtonColor } from './types'

type OwnProps<E extends React.ElementType> = {
  color?: ButtonColor
  icon?: IconType
  component?: E
  floating?: boolean
}

type Props<E extends React.ElementType> = OwnProps<E> &
  Omit<React.ComponentProps<E>, keyof OwnProps<E>>

export const ExtendedFAB = <E extends React.ElementType = 'button'>({
  className,
  children,
  color = 'primary',
  icon,
  component,
  floating,
  ...props
}: Props<E>) => {
  const Component = component || 'button'
  const style = getStyle({ color, icon, floating })
  return (
    <Component {...props} className={`${className} ${style}`}>
      {icon && <Icon type={icon} variant="outline" className="w-6 h-6" />}
      <span>{children}</span>
    </Component>
  )
}

const getStyle = ({
  color,
  icon,
  floating
}: {
  color: ButtonColor
  icon?: IconType
  floating?: boolean
}) => {
  let styles = [
    'relative',
    'inline-flex',
    'items-center',
    'justify-center',
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
    'before:rounded-2xl',
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
    'h-14',
    'rounded-2xl',
    'px-6',
    'text-sm',
    'font-semibold'
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
  if (typeof icon !== 'undefined') {
    styles = [...styles, 'pl-4']
  }
  if (floating) {
    styles = [...styles, 'shadow-6dp']
  }
  return styles.join(' ')
}
