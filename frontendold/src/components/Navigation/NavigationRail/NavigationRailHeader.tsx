import { ComponentProps } from 'react'

type Props = ComponentProps<'div'>
export const NavigationRailHeader = ({
  children,
  className,
  ...props
}: Props) => {
  return (
    <div
      className={`${className} h-14 flex justify-center items-center`}
      {...props}
    >
      {children}
    </div>
  )
}
