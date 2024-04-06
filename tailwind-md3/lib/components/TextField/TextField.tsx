import { forwardRef } from 'react'
import { FilledTextField } from './FilledTextField'
import { TextFieldProps } from './type'

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    return <FilledTextField ref={ref} {...props} />
  }
)
