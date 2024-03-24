import { ComponentProps } from 'react'

type Props = ComponentProps<'div'>

export const FirstPane = ({ className, children, ...props }: Props) => {
  return (
    <div
      className={`${className} h-full overflow-y-auto col-start-1 col-end-2 row-start-1 row-end-2`}
      {...props}
    >
      {children}
    </div>
  )
}
