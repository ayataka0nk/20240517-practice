import { ComponentPropsWithRef, forwardRef } from 'react'
import { Breakpoint } from '../../type'
import { BackgroundColorToken } from '../BackgroundColor'
import { SearchBar } from './SearchBar'
import { SearchView } from './SearchView'

type Props = {
  searchedValue: string
  isViewOpen: boolean
  docked: Breakpoint
  bg?: BackgroundColorToken
  onBackClick: () => void
  onMenuClick: () => void
  onClearClick: () => void
} & ComponentPropsWithRef<'input'>

export const SearchField = forwardRef<HTMLInputElement, Props>(
  (
    {
      searchedValue,
      isViewOpen,
      docked,
      bg = 'surface-container-highest',
      onBackClick,
      onMenuClick,
      onClearClick,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const rootStyle = getRootStyle({ isViewOpen })
    return (
      <div className={`${rootStyle} ${className}`}>
        <div className="relative">
          <SearchBar
            ref={ref}
            searchedValue={searchedValue}
            isViewOpen={isViewOpen}
            docked={docked}
            bg={bg}
            handleBackClick={onBackClick}
            handleMenuClick={onMenuClick}
            handleClearClick={onClearClick}
            {...props}
          />
          <SearchView isViewOpen={isViewOpen} docked={docked} bg={bg}>
            {children}
          </SearchView>
        </div>
      </div>
    )
  }
)

const getRootStyle = ({ isViewOpen }: { isViewOpen: boolean }) => {
  let styles: string[] = []
  if (isViewOpen) {
    styles = [
      ...styles,
      'fixed',
      'top-0',
      'left-0',
      'z-[2]',
      'w-full',
      'md:static',
      'md:w-auto',
      'md:z-auto'
    ]
  }

  return styles.join(' ')
}
