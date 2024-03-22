import { ComponentProps } from 'react'

type Props = ComponentProps<'div'>

export const NavigationRailItems = ({
  className,
  children,
  ...props
}: Props) => {
  return (
    <div
      className={`flex flex-col items-center gap-3 mt-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
