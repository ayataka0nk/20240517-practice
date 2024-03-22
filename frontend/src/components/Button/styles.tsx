import { IconType } from '../Icon'
import { ButtonColor, ButtonVariant } from './types'

export const getCommonClasses = () => {
  return [
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
    'focus-visible:outline-none'
  ]
}

export const getVariantClasses = (variant: ButtonVariant) => {
  switch (variant) {
    case 'filled':
      return [
        'h-10',
        'rounded-3xl',
        'px-6',
        'text-sm',
        'font-semibold',
        'shadow-sm',
        'before:bg-on-primary'
      ]
    case 'outlined':
      return [
        'bg-surface',
        'h-10',
        'rounded-3xl',
        'px-6',
        'text-sm',
        'font-semibold',
        'shadow-sm',
        'ring-1',
        'ring-outline'
      ]
    case 'text':
      return ['h-10', 'rounded-3xl', 'px-3', 'text-sm', 'font-semibold']
    default:
      return []
  }
}

export const getColorClasses = (variant: ButtonVariant, color: ButtonColor) => {
  switch (variant) {
    case 'filled':
      switch (color) {
        case 'primary':
          return [
            'bg-primary',
            'text-on-primary',
            'hover:after:bg-on-primary',
            'active:after:bg-on-primary',
            'focus-visible:after:bg-on-primary'
          ]
        case 'secondary':
          return [
            'bg-secondary',
            'text-on-secondary',
            'hover:after:bg-on-secondary',
            'active:after:bg-on-secondary',
            'focus-visible:after:bg-on-secondary'
          ]
        case 'tertiary':
          return [
            'bg-tertiary',
            'text-on-tertiary',
            'hover:after:bg-on-tertiary',
            'active:after:bg-on-tertiary',
            'focus-visible:after:bg-on-tertiary'
          ]
      }
    case 'outlined':
      switch (color) {
        case 'primary':
          return [
            'text-primary',
            'hover:after:bg-primary',
            'active:after:bg-primary',
            'focus-visible:after:bg-primary',
            'before:bg-primary'
          ]
        case 'secondary':
          return [
            'text-secondary',
            'hover:after:bg-secondary',
            'active:after:bg-secondary',
            'focus-visible:after:bg-secondary',
            'before:bg-secondary'
          ]
        case 'tertiary':
          return [
            'text-tertiary',
            'hover:after:bg-tertiary',
            'active:after:bg-tertiary',
            'focus-visible:after:bg-tertiary',
            'before:bg-tertiary'
          ]
      }
    case 'text':
      switch (color) {
        case 'primary':
          return [
            'text-primary',
            'hover:after:bg-primary',
            'active:after:bg-primary',
            'focus-visible:after:bg-primary',
            'before:bg-primary'
          ]
        case 'secondary':
          return [
            'text-secondary',
            'hover:after:bg-secondary',
            'active:after:bg-secondary',
            'focus-visible:after:bg-secondary',
            'before:bg-secondary'
          ]
        case 'tertiary':
          return [
            'text-tertiary',
            'hover:after:bg-tertiary',
            'active:after:bg-tertiary',
            'focus-visible:after:bg-tertiary',
            'before:bg-tertiary'
          ]
      }
  }
}

export const getIconClasses = (icon?: IconType) => {
  if (typeof icon === 'undefined') {
    return []
  } else {
    return ['pl-4']
  }
}

export const getButtonClassName = ({
  variant,
  color,
  icon
}: {
  variant: ButtonVariant
  color: ButtonColor
  icon?: IconType
}) => {
  const commonClasses = getCommonClasses()
  const variantClasses = getVariantClasses(variant)
  const colorClasses = getColorClasses(variant, color)
  const iconClasses = getIconClasses(icon)
  return [
    ...commonClasses,
    ...variantClasses,
    ...colorClasses,
    ...iconClasses
  ].join(' ')
}
