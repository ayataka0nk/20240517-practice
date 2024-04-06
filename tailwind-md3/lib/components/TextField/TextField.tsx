import { forwardRef } from 'react'
import { FilledTextField } from './FilledTextField'
import { TextFieldProps } from './type'
import { OutlinedTextField } from './OutlinedTextField'

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    if (typeof props.variant === 'undefined' || props.variant === 'filled') {
      return <FilledTextField ref={ref} {...props} />
    } else if (props.variant === 'outlined') {
      return <OutlinedTextField ref={ref} {...props} />
    }
  }
)
