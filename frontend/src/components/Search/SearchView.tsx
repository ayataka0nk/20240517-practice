import { ComponentProps } from 'react'
import { SearchVariant } from '../Search/type'
import { BackgroundColorToken, getBackgroundStyle } from '../BackgroundColor'

type Props = {
  variant: SearchVariant
  isViewOpen: boolean
  bg: BackgroundColorToken
} & ComponentProps<'div'>

export const SearchView = ({
  className,
  variant,
  isViewOpen,
  children,
  bg,
  ...props
}: Props) => {
  const bgStyle = getBackgroundStyle(bg)
  const style = getContainerStyle(variant)
  if (!isViewOpen) {
    return <></>
  }
  return (
    <div className={`${style} ${className} ${bgStyle}`} {...props}>
      {children}
    </div>
  )
}

const getContainerStyle = (variant: SearchVariant) => {
  let styles = [
    'absolute',
    'z-10',
    'w-full',
    'top-14',
    'border-t',
    'border-outline',
    'pb-4',
    'overflow-y-auto'
  ]

  if (variant === 'docked') {
    styles = [...styles, 'rounded-b-4xl']
  } else if (variant === 'screen') {
    styles = [...styles, 'h-[calc(100vh-3.5rem)]']
  }

  return styles.join(' ')
}
