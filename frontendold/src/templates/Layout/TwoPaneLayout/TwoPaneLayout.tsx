import { ComponentProps } from 'react'

type Props = ComponentProps<'div'>
export const TwoPaneLayout = ({ className, children, ...props }: Props) => {
  return (
    <div
      className={`${className} md:mr-6 md:ml-2 h-full grid grid-cols-[1fr] gap-6`}
      {...props}
    >
      {children}
    </div>
  )
}
