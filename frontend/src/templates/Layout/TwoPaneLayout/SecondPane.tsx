import { ComponentProps } from 'react'

type Props = ComponentProps<'div'>

export const SecondPane = ({ className, children, ...props }: Props) => {
  return (
    <div
      className={`${className} h-full overflow-y-auto col-start-1 col-end-2 row-start-1 row-end-2 z-10 empty:z-[-1] xp:col-start-2 xp:col-end-3`}
      {...props}
    >
      {children}
    </div>
  )
}
