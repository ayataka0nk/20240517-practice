import { ComponentProps } from 'react'

type Props = ComponentProps<'nav'>

export const NavigationRailContainer = ({
  className,
  children,
  ...props
}: Props) => {
  return (
    <nav
      className={`w-20 display flex flex-col items-center ${className}`}
      {...props}
    >
      {children}
    </nav>
  )
}
