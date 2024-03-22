import React from 'react'
import { IconType } from '../Icon'

export type TextFieldOwnProps = {
  id?: string
  label?: string
  icon?: IconType
  error?: string
  supportingText?: string
}

export type TextInputProps = React.ComponentProps<'input'> &
  TextFieldOwnProps & {
    multiline?: false
  }
export type TextAreaProps = React.ComponentProps<'textarea'> &
  TextFieldOwnProps & {
    multiline: true
  }

export type TextFieldProps = TextInputProps | TextAreaProps
