import { ComponentPropsWithoutRef } from 'react'
import { TriangleIcon } from './TriangleIcon'

type Props = ComponentPropsWithoutRef<'button'>
export const MenuButton = ({
  className,
  children,
  disabled,
  ...props
}: Props) => {
  const style = getStyle({ disabled })
  return (
    <button className={`${style} ${className}`} {...props}>
      <span className="mr-2">{children}</span>
      <span className="w-2 h-2">{!disabled && <TriangleIcon />}</span>
    </button>
  )
}

type StyleProps = Pick<Props, 'disabled'>
const getStyle = ({ disabled }: StyleProps) => {
  let styles = ['relative', 'overflow-hidden', 'h-[40px]', 'pl-2', 'pr-1']

  if (disabled) {
    styles = [...styles, 'text-on-surface', 'opacity-[0.38]', 'cursor-default']
  } else {
    styles = [
      ...styles,
      'cursor-pointer',
      'text-on-surface',
      // hover
      'rounded-full',
      'hover:after:absolute',
      'hover:after:inset-0',
      'hover:after:full-width',
      'hover:after:opacity-8',
      'hover:after:bg-on-surface-variant',
      // ripple
      'before:absolute',
      'before:pointer-events-none',
      'before:inset-0',
      'before:bg-no-repeat',
      'before:bg-center',
      'before:opacity-0',
      'before:transform',
      'before:scale-10',
      'before:[transition:transform_.3s,opacity_2s]',
      'active:before:opacity-10',
      'active:before:scale-0',
      'active:before:opacity-10',
      'active:before:duration-0',
      'before:bg-on-surface-variant',
      'before:rounded-full'
    ]
  }
  return styles.join(' ')
}
