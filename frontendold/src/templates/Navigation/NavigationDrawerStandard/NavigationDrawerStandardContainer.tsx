import { ComponentProps } from 'react'

type Props = ComponentProps<'nav'>

export const NavigationDrawerStandardContainer = ({
  className,
  children,
  ...props
}: Props) => {
  return (
    <nav className={`${className} overflow-y-auto`} {...props}>
      {children}
    </nav>
  )
}
