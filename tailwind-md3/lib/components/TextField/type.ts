import { ComponentPropsWithoutRef } from 'react'
import { IconType } from '../Icon'
import { BackgroundColorToken } from '../BackgroundColor'

export type TextFieldVariant = 'filled' | 'outlined'

export type TextFieldProps = ComponentPropsWithoutRef<'input'> & {
  id?: string
  label?: string
  icon?: IconType
  error?: string
  supportingText?: string
  variant?: TextFieldVariant
  bg?: BackgroundColorToken
}
