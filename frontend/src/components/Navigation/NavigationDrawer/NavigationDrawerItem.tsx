import { Icon, IconType } from '@/components/Icon'
import { ElementType, memo } from 'react'

import { PolymorphicComponentProps } from '@/components/type'

type OwnProps = {
  icon?: IconType
  labelText: string
  active?: boolean
}

const NavigationDrawerItemComponent = <E extends ElementType = 'div'>({
  component,
  icon,
  labelText,
  active = false,
  className,
  ...props
}: PolymorphicComponentProps<E, OwnProps>) => {
  const Component = component || 'div'

  const style = getRootStyle(active)
  return (
    <Component className={`${className} ${style}`} {...props}>
      {icon && <Icon variant="outline" type={icon} className="h-6 w-6 mr-3" />}

      <p>{labelText}</p>
    </Component>
  )
}

export const NavigationDrawerItem = memo(
  NavigationDrawerItemComponent
) as typeof NavigationDrawerItemComponent

const getRootStyle = (active: boolean) => {
  let styles = [
    'relative',
    'overflow-hidden',
    'w-full',
    'flex',
    'items-center',
    'h-14',
    'pl-4',
    'pr-6',
    'rounded-full',
    'text-sm',
    // hover
    'hover:after:absolute',
    'hover:after:inset-0',
    'hover:after:w-full',
    'hover:after:opacity-8',
    // ripple
    'before:rounded-full',
    'before:bg-on-surface',
    'before:absolute',
    'before:inset-0',
    'before:full-width',
    'before:pointer-events-none',
    'before:bg-no-repeat',
    'before:bg-center',
    'before:transform',
    'before:opacity-0',
    'before:scale-10',
    'before:[transition:transform_.3s,opacity_1s]',
    'active:before:scale-0',
    'active:before:duration-0',
    'active:before:opacity-10'
  ]
  if (active) {
    styles = [
      ...styles,
      'bg-secondary-container',
      'hover:after:bg-on-secondary-container',
      'text-on-secondary-container',
      'font-bold'
    ]
  } else {
    styles = [
      ...styles,
      'bg-transparent',
      'hover:after:bg-on-secondary-container',
      'text-on-surface-variant',
      'font-medium'
    ]
  }
  return styles.join(' ')
}
