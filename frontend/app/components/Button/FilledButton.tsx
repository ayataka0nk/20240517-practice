import { Icon, IconType } from '../Icon'
import { ButtonColor, ButtonProps } from './types'

export const FilledButton = <E extends React.ElementType>({
  className,
  children,
  color = 'primary',
  icon,
  component,
  ...props
}: ButtonProps<E>) => {
  const Component = component || 'button'
  const style = getStyle({ color, icon })
  return (
    <Component {...props} className={`${style} ${className}`}>
      {icon && <Icon type={icon} variant="solid" className="w-5 h-5" />}
      <p>{children}</p>
    </Component>
  )
}

const getStyle = ({ color, icon }: { color: ButtonColor; icon?: IconType }) => {
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
    'before:rounded-full',
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
    'h-10',
    'rounded-3xl',
    'px-6',
    'text-sm',
    'font-semibold',
    'shadow-sm',
    'before:bg-on-primary'
  ]
  switch (color) {
    case 'primary':
      styles = [
        ...styles,
        'bg-primary',
        'text-on-primary',
        'hover:after:bg-on-primary',
        'active:after:bg-on-primary',
        'focus-visible:after:bg-on-primary'
      ]
      break
    case 'secondary':
      styles = [
        ...styles,
        'bg-secondary',
        'text-on-secondary',
        'hover:after:bg-on-secondary',
        'active:after:bg-on-secondary',
        'focus-visible:after:bg-on-secondary'
      ]
      break
    case 'tertiary':
      styles = [
        ...styles,
        'bg-tertiary',
        'text-on-tertiary',
        'hover:after:bg-on-tertiary',
        'active:after:bg-on-tertiary',
        'focus-visible:after:bg-on-tertiary'
      ]
      break
  }
  if (typeof icon !== 'undefined') {
    styles = [...styles, 'pl-4']
  }
  return styles.join(' ')
}
