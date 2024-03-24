import React from 'react'
import { IconForIconButton } from './IconForIconButton'
import { IconButtonProps } from './types'

const FilledIconButtonComponent = <E extends React.ElementType>({
  icon,
  variant = 'standard',
  disabled = false,
  active = false,
  noRipple = false,
  className,
  ...props
}: IconButtonProps<E>) => {
  const buttonStyle = getButtonStyle()
  const wrapperClassName = getIconWrapperStyle({ disabled, noRipple })
  const iconClassName = getIconStyle({ active })
  return (
    <button {...props} className={`${buttonStyle} ${className}`}>
      <div className={wrapperClassName}>
        <IconForIconButton
          icon={icon}
          variant={variant}
          active={active}
          className={iconClassName}
        />
      </div>
    </button>
  )
}

export const FilledIconButton = React.memo(
  FilledIconButtonComponent
) as typeof FilledIconButtonComponent

const getButtonStyle = () => {
  const styles = [
    'inline-flex',
    'align-bottom',
    'h-12',
    'w-12',
    'min-h-12',
    'min-w-12',
    'items-center',
    'justify-center',
    'group',
    'focus-visible:outline-none'
  ]
  return styles.join(' ')
}

const getIconWrapperStyle = ({
  disabled,
  noRipple
}: {
  disabled: boolean
  noRipple: boolean
}) => {
  let styles = [
    'relative',
    'inline-flex',
    'items-center',
    'justify-center',
    'overflow-hidden',
    'w-10',
    'h-10',
    'rounded-full'
  ]

  if (disabled) {
    styles = [...styles, 'opacity-38']
  }

  styles = [
    ...styles,
    // base
    'bg-primary',
    'text-on-primary',
    // hover
    'group-hover:after:bg-on-primary',
    // focus
    'group-focus-visible:after:bg-on-primary',
    // active
    'group-active:after:bg-on-primary',
    // ripple
    'before:bg-on-primary'
  ]

  if (!disabled) {
    styles = [
      ...styles,
      // hover
      'group-hover:after:absolute',
      'group-hover:after:full-width',
      'group-hover:after:full-height',
      'group-hover:after:inset-0',
      'group-hover:after:opacity-8',
      'group-hover:after:rounded-full',
      // focus
      'group-focus-visible:after:absolute',
      'group-focus-visible:after:full-width',
      'group-focus-visible:after:full-height',
      'group-focus-visible:after:inset-0',
      'group-focus-visible:after:opacity-10',
      'group-focus-visible:after:rounded-full',
      'group-focus-visible:outline-none',
      // active
      'group-active:after:absolute',
      'group-active:after:full-width',
      'group-active:after:full-height',
      'group-active:after:inset-0',
      'group-active:after:opacity-10',
      'group-active:after:rounded-full'
    ]

    if (!noRipple) {
      styles = [
        ...styles,
        'before:absolute',
        'before:rounded-full',
        'before:full-width',
        'before:full-height',
        'before:inset-0',
        'before:pointer-events-none',
        'before:bg-no-repeat',
        'before:bg-center',
        'before:opacity-0',
        'before:transform',
        'before:scale-10',
        'before:[transition:transform_.3s,opacity_1.2s]',
        'group-active:before:scale-0',
        'group-active:before:duration-0',
        'group-active:before:opacity-10'
      ]
    }
  }

  return styles.join(' ')
}

const getIconStyle = ({ active }: { active: boolean }) => {
  let styles: string[] = []
  if (active) {
    styles = [...styles, 'text-on-primary']
  } else {
    styles = [...styles, 'text-on-primary']
  }
  return styles.join(' ')
}
