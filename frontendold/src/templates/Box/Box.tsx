import { ComponentProps } from 'react'

type Props = ComponentProps<'div'>

export const Box = ({ className, children, ...props }: Props) => {
  const style = getStyle()
  return (
    <div className={`${className} ${style}`} {...props}>
      {children}
    </div>
  )
}

const getStyle = () => {
  const styles: string[] = []
  return styles.join(' ')
}
