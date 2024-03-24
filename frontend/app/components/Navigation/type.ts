import { IconType } from '@/components/Icon'
import React from 'react'

export type NavigationActionType = {
  icon: IconType
  labelText: string
  href?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export type NavigationItemType = {
  icon: IconType
  labelText: string
  href?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  externalHref?: string
  active: boolean
}

export type NavigationProps = {
  bgClass?: string
  modalBgClass?: string
  logo: React.ReactNode
  action?: NavigationActionType
  items: NavigationItemType[]
  fabHidden?: boolean
}
