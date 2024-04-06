import { ComponentPropsWithoutRef } from 'react'
import { IconType } from '../Icon'
import { TextFieldVariant } from '../TextField/type'

export type TextAreaProps = ComponentPropsWithoutRef<'textarea'> & {
  id?: string
  label?: string
  icon?: IconType
  error?: string
  supportingText?: string
  variant?: TextFieldVariant
}
