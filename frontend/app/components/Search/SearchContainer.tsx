import { ComponentProps } from 'react'

type Props = ComponentProps<'div'>

export const SearchContainer = ({ className, children, ...props }: Props) => {
  return (
    <div className={`relative ${className}`} {...props}>
      {children}
    </div>
  )
}
