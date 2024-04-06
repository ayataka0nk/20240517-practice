import { ComponentPropsWithoutRef } from 'react'
import { IconType } from '../Icon'

// export type TextFieldOwnProps = {
//   id?: string
//   label?: string
//   icon?: IconType
//   error?: string
//   supportingText?: string
// }

// export type TextInputProps = React.ComponentPropsWithoutRef<'input'> &
//   TextFieldOwnProps & {
//     multiline?: false
//   }
// export type TextAreaProps = React.ComponentPropsWithoutRef<'textarea'> &
//   TextFieldOwnProps & {
//     multiline: true
//   }

// export type TextFieldProps = TextInputProps | TextAreaProps

export type TextFieldProps = ComponentPropsWithoutRef<'input'> & {
  id?: string
  label?: string
  icon?: IconType
  error?: string
  supportingText?: string
}
