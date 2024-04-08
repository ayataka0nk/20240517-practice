import React from 'react'
import { IconType } from '../Icon'
import { IconVariant } from '../Icon/types'

export type IconButtonVariant = 'standard' | 'filled' | 'filled-tonal'
export type IconButtonColor = 'primary' | 'secondary' | 'tertiary'
type OwnProps<E extends React.ElementType> = {
  icon: IconType
  variant?: IconButtonVariant
  disabled?: boolean
  active?: boolean
  noRipple?: boolean
  iconVariant?: IconVariant
  component?: E
}

export type IconButtonProps<E extends React.ElementType> = OwnProps<E> &
  Omit<React.ComponentProps<E>, keyof OwnProps<E>>
