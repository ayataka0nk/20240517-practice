import { ComponentProps } from 'react'

type Props = ComponentProps<'div'>

export const NavigationDrawerItems = ({
  className,
  children,
  ...props
}: Props) => {
  return (
    <div className={`${className} px-3`} {...props}>
      {children}
    </div>
  )
}
