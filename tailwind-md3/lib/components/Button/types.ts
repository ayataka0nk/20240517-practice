import { IconType } from '../Icon'

export type ButtonVariant = 'filled' | 'outlined' | 'text'
export type ButtonColor = 'primary' | 'secondary' | 'tertiary'

type OwnProps<E extends React.ElementType> = {
  color?: ButtonColor
  icon?: IconType
  component?: E
}

export type ButtonProps<E extends React.ElementType> = OwnProps<E> &
  Omit<React.ComponentProps<E>, keyof OwnProps<E>>
