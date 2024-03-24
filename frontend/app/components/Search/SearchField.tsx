import { ComponentPropsWithoutRef, MouseEventHandler, forwardRef } from 'react'
import { SearchVariant } from './type'
import { SearchContainer } from './SearchContainer'
import { SearchBar } from './SearchBar'
import { SearchView } from './SearchView'
import { IconType } from '../Icon'
import { BackgroundColorToken } from '../BackgroundColor'

type SearchFieldProps = ComponentPropsWithoutRef<'input'> & {
  isViewOpen: boolean
  variant: SearchVariant
  leadingIcon: IconType
  onLeadingIconClick: MouseEventHandler<HTMLButtonElement>
  trailingIcon?: IconType
  onTrailingIconClick?: MouseEventHandler<HTMLButtonElement>
  bg?: BackgroundColorToken
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      className,
      children,
      isViewOpen,
      variant,
      leadingIcon,
      onLeadingIconClick,
      trailingIcon,
      onTrailingIconClick,
      bg = 'surface-container-high',
      ...props
    },
    ref
  ) => {
    const style = getWrapperStyle({ isViewOpen })
    return (
      <div className={`${className} ${style}`}>
        <SearchContainer>
          <SearchBar
            ref={ref}
            isViewOpen={isViewOpen}
            variant={variant}
            leadingIcon={leadingIcon}
            onLeadingIconClick={onLeadingIconClick}
            trailingIcon={trailingIcon}
            onTrailingIconClick={onTrailingIconClick}
            bg={bg}
            {...props}
          />
          <SearchView variant={variant} isViewOpen={isViewOpen} bg={bg}>
            {children}
          </SearchView>
        </SearchContainer>
      </div>
    )
  }
)
const getWrapperStyle = ({ isViewOpen }: { isViewOpen: boolean }) => {
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

SearchField.displayName = 'SearchField'
