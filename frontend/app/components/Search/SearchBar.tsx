import React, { forwardRef } from 'react'
import { IconButton } from '../IconButton'
import { IconType } from '../Icon'
import { SearchVariant } from './type'
import { BackgroundColorToken, getBackgroundStyle } from '../BackgroundColor'

type OwnProps = {
  variant: SearchVariant
  isViewOpen: boolean
  leadingIcon: IconType
  onLeadingIconClick: React.MouseEventHandler<HTMLButtonElement>
  trailingIcon?: IconType
  onTrailingIconClick?: React.MouseEventHandler<HTMLButtonElement>
  bg: BackgroundColorToken
}

type Props = Omit<React.ComponentPropsWithoutRef<'input'>, keyof OwnProps> &
  OwnProps

export const SearchBar = forwardRef<HTMLInputElement, Props>(
  (
    {
      variant,
      isViewOpen,
      leadingIcon,
      onLeadingIconClick,
      trailingIcon,
      onTrailingIconClick,
      className,
      bg,
      ...props
    },
    ref
  ) => {
    const containerStyle = getContainerStyle({ isViewOpen, variant })
    const inputStyle = getInputStyle()
    const leadingIconStyle = getLeadingIconStyle()
    const trailingIconStyle = getTrailingIconStyle()
    const bgStyle = getBackgroundStyle(bg)

    return (
      <div className={`${containerStyle} ${className}`}>
        <IconButton
          icon={leadingIcon}
          variant="standard"
          className={leadingIconStyle}
          onClick={onLeadingIconClick}
          type="button"
          noRipple
        />
        <input
          ref={ref}
          type="text"
          className={`${inputStyle} ${bgStyle}`}
          {...props}
        />
        {trailingIcon && (
          <IconButton
            icon={trailingIcon}
            className={trailingIconStyle}
            type="button"
            onClick={onTrailingIconClick}
            noRipple
          />
        )}
      </div>
    )
  }
)
SearchBar.displayName = 'SearchBar'

const getContainerStyle = ({
  isViewOpen,
  variant
}: {
  isViewOpen: boolean
  variant: SearchVariant
}) => {
  let styles = [
    'block',
    'w-full',
    'relative',
    'overflow-hidden',
    'flex',
    'items-center',
    'cursor-pointer',
    // hover
    'hover:after:absolute',
    'hover:after:full-width',
    'hover:after:opacity-8',
    'hover:after:inset-0',
    'after:pointer-events-none',
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

  if (!isViewOpen) {
    styles = [...styles, 'hover:after:bg-on-surface']
  }

  if (variant === 'docked') {
    if (isViewOpen) {
      styles = [...styles, 'rounded-t-4xl', 'before:rounded-t-4xl']
    } else {
      styles = [...styles, 'rounded-4xl', 'before:rounded-4xl']
    }
  } else {
    if (isViewOpen) {
      styles = [...styles, 'rounded-none']
    } else {
      styles = [...styles, 'rounded-4xl']
    }
  }
  return styles.join(' ')
}

const getInputStyle = () => {
  const styles = [
    'h-14',
    'outline-none',
    'pl-14',
    'pr-14',
    'w-full',
    'cursor-pointer',
    'placeholder:text-on-surface-variant',
    'text-on-surface'
  ]
  return styles.join(' ')
}

const getLeadingIconStyle = () => {
  const styles = ['absolute', 'left-1', 'z-10', 'text-on-surface']
  return styles.join(' ')
}
const getTrailingIconStyle = () => {
  const styles = [
    'absolute',
    'w-6',
    'h-6',
    'right-1',
    'z-10',
    'text-on-surface'
  ]
  return styles.join(' ')
}
