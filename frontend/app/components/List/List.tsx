import { ComponentProps, memo } from 'react'

type OwnProps<E extends React.ElementType> = {
  component?: E
}

type Props<E extends React.ElementType> = OwnProps<E> &
  Omit<ComponentProps<E>, keyof OwnProps<E>>

const ListComponent = <E extends React.ElementType = 'div'>({
  children,
  className,
  component,
  ...props
}: Props<E>) => {
  const Component = component || 'div'
  return (
    <Component className={`${className}`} {...props}>
      {children}
    </Component>
  )
}

export const List = memo(ListComponent) as typeof ListComponent
