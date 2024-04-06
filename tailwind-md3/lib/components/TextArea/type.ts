import { ComponentPropsWithoutRef } from 'react'
import { IconType } from '../Icon'

export type TextAreaProps = ComponentPropsWithoutRef<'textarea'> & {
  id?: string
  label?: string
  icon?: IconType
  error?: string
  supportingText?: string
}
