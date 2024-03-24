import { ComponentProps } from 'react'

export type Props = ComponentProps<'div'>
export const NavigationRailActionArea = ({
  className,
  children,
  ...props
}: Props) => {
  return (
    <div className={`${className} flex flex-col items-center`} {...props}>
      {children}
    </div>
  )
}
