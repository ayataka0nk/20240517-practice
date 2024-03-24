import React from 'react'
import { ButtonProps, ButtonVariant } from './types'
import { FilledButton } from './FilledButton'
import { OutlinedButton } from './OutlinedButton'
import { TextButton } from './TextButton'

export const Button = <E extends React.ElementType = 'button'>(
  props: ButtonProps<E> & { variant?: ButtonVariant }
) => {
  const variant = props.variant || 'filled'
  if (variant === 'filled') {
    return <FilledButton {...props} />
  } else if (variant === 'outlined') {
    return <OutlinedButton {...props} />
  } else if (variant === 'text') {
    return <TextButton {...props} />
  }
}
