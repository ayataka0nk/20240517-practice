import { forwardRef } from 'react'
import { BackgroundColorToken, getBackgroundStyle } from '../../BackgroundColor'
import { Breakpoint } from '../../../type'
import { LeadingIcon } from './LeadingIcon'
import { TrailingIcon } from './TrailingIcon'

type Props = React.ComponentPropsWithoutRef<'input'> & {
  searchedValue: string
  isViewOpen: boolean
  docked: Breakpoint
  bg: BackgroundColorToken
  handleBackClick: () => void
  handleMenuClick: () => void
  handleClearClick: () => void
}

export const SearchBar = forwardRef<HTMLInputElement, Props>(
  (
    {
      searchedValue,
      isViewOpen,
      docked,
      bg,
      handleBackClick,
      handleMenuClick,
      handleClearClick,
      className,
      ...props
    },
    ref
  ) => {
    const containerStyle = getContainerStyle({ isViewOpen, docked })
    const inputStyle = getInputStyle()

    const bgStyle = getBackgroundStyle(bg)
    return (
      <div className={`${containerStyle} ${className}`}>
        <input
          ref={ref}
          type="text"
          className={`${inputStyle} ${bgStyle}`}
          {...props}
        />
        <LeadingIcon
          searchedValue={searchedValue}
          isViewOpen={isViewOpen}
          docked={docked}
          handleBackClick={handleBackClick}
          handleMenuClick={handleMenuClick}
        />
        <TrailingIcon
          isViewOpen={isViewOpen}
          docked={docked}
          handleClearClick={handleClearClick}
        />
      </div>
    )
  }
)

const getContainerStyle = ({
  isViewOpen,
  docked
}: {
  isViewOpen: boolean
  docked: Breakpoint
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
  if (docked === 'sm') {
    styles = [...styles, '']
  }

  if (isViewOpen) {
    styles = [
      ...styles,
      'rounded-none',
      `${docked}:rounded-t-4xl`,
      `${docked}:before:rounded-t-4xl`
    ]
  } else {
    styles = [...styles, 'rounded-4xl', `${docked}:before:rounded-4xl`]
  }

  return styles.join(' ')
}

const getInputStyle = () => {
  const styles = [
    'peer',
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
