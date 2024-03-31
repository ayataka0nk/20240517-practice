import { ComponentPropsWithoutRef } from 'react'
import { Breakpoint } from '../../type'
import { BackgroundColorToken, getBackgroundStyle } from '../BackgroundColor'

type Props = ComponentPropsWithoutRef<'div'> & {
  isViewOpen: boolean
  docked: Breakpoint
  bg: BackgroundColorToken
}

export const SearchView = ({
  isViewOpen,
  docked,
  bg,
  className,
  ...props
}: Props) => {
  const bgStyle = getBackgroundStyle(bg)
  const style = getContainerStyle({ isViewOpen, docked })

  return <div className={`${style} ${className} ${bgStyle}`} {...props} />
}

const getContainerStyle = ({
  isViewOpen,
  docked
}: Pick<Props, 'isViewOpen' | 'docked'>) => {
  let styles = [
    'absolute',
    'z-10',
    'w-full',
    'top-14',
    'border-t',
    'border-outline',
    'pb-4',
    'overflow-y-auto',
    `${docked}:rounded-b-4xl`,
    'h-[calc(100vh-3.5rem)]',
    `${docked}:h-auto`
  ]

  if (!isViewOpen) {
    styles = [...styles, 'hidden']
  }

  return styles.join(' ')
}
