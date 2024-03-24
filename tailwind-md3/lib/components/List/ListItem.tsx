import { ComponentProps, memo } from 'react'
import { Icon, IconType } from '../Icon'

type OwnProps<E extends React.ElementType> = {
  component?: E
  headline?: string
  icon?: IconType
}

type Props<E extends React.ElementType> = OwnProps<E> &
  Omit<ComponentProps<E>, keyof OwnProps<E> | 'children'>

const ListItemComponent = <E extends React.ElementType = 'div'>({
  headline,
  icon,
  className,
  component,
  ...props
}: Props<E>) => {
  const Component = component || 'div'
  const hasAction =
    typeof props.onClick !== 'undefined' || typeof props.href !== 'undefined'
  const style = getStyle({ hasAction })
  return (
    <Component className={`${style} ${className}`} {...props}>
      {icon && <Icon variant="outline" type={icon} className="w-6 h-6 mr-4" />}
      <p className="text-on-surface">{headline}</p>
    </Component>
  )
}

export const ListItem = memo(ListItemComponent) as typeof ListItemComponent

const getStyle = ({ hasAction }: { hasAction: boolean }) => {
  let styles = ['relative', 'block', 'w-full', 'flex', 'items-center']
  if (hasAction) {
    styles = [
      ...styles, // hover
      'cursor-pointer',
      'hover:after:absolute',
      'hover:after:inset-0',
      'hover:after:w-full',
      'hover:after:h-full',
      'hover:after:bg-on-surface',
      'hover:after:bg-opacity-8',
      // ripple
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
  }
  // one line
  styles = [...styles, 'px-4', 'py-2', 'h-14']
  return styles.join(' ')
}
