import { ComponentPropsWithoutRef } from 'react'
import { IconType } from '../Icon'

export type TextFieldVariant = 'filled' | 'outlined'

export type TextFieldProps = ComponentPropsWithoutRef<'input'> & {
  id?: string
  label?: string
  icon?: IconType
  error?: string
  supportingText?: string
  variant?: TextFieldVariant
}
