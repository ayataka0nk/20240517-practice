'use client'
import {
  NavigationDrawerHeader,
  NavigationDrawerItems,
  NavigationDrawerItem
} from '@/components/Navigation/NavigationDrawer'

import { useNavigationContext } from '../NavigationContext'
import React, { MouseEventHandler } from 'react'
import { NavigationDrawerModalScrim } from './NavigationDrawerModalScrim'
import { NavigationDrawerModalContainer } from './NavigationDrawerModalContainer'
import { NavigationProps } from '..'
import { Link } from 'react-router-dom'

export const NavigationDrawerModal = ({
  logo,
  items,
  className
}: NavigationProps & {
  className?: string
}) => {
  const { isDrawerModalOpen, setIsDrawerModalOpen } = useNavigationContext()
  const handleCloseClick = () => {
    setIsDrawerModalOpen(false)
  }
  const handleNavigationDrawerModalScrimClick = () => {
    setIsDrawerModalOpen(false)
  }
  return (
    <>
      <NavigationDrawerModalScrim
        className="lg:hidden"
        isDrawerModalOpen={isDrawerModalOpen}
        onClick={handleNavigationDrawerModalScrimClick}
      />

      <NavigationDrawerModalContainer
        className={`'w-[360px] h-screen ${className}`}
        isOpen={isDrawerModalOpen}
      >
        <NavigationDrawerHeader
          icon="ChevronDoubleLeft"
          onIconClick={handleCloseClick}
        >
          {logo}
        </NavigationDrawerHeader>
        <NavigationDrawerItems>
          {items.map((item, index) => {
            if (item.href) {
              return (
                <NavigationDrawerItem
                  key={index}
                  icon={item.icon}
                  labelText={item.labelText}
                  to={item.href}
                  component={Link}
                  onClick={handleCloseClick}
                  active={item.active}
                />
              )
            } else if (item.onClick) {
              const handleOnClick: MouseEventHandler<HTMLButtonElement> = (
                event
              ) => {
                handleCloseClick()
                item.onClick && item.onClick(event)
              }
              //TODO standard と modalのitemは共通化できる
              return (
                <NavigationDrawerItem
                  key={index}
                  icon={item.icon}
                  labelText={item.labelText}
                  onClick={handleOnClick}
                  component="button"
                />
              )
            } else if (item.externalHref) {
              return (
                <NavigationDrawerItem
                  key={index}
                  icon={item.icon}
                  labelText={item.labelText}
                  href={item.externalHref}
                  component="a"
                />
              )
            } else {
              return <React.Fragment key={index} />
            }
          })}
        </NavigationDrawerItems>
      </NavigationDrawerModalContainer>
    </>
  )
}
