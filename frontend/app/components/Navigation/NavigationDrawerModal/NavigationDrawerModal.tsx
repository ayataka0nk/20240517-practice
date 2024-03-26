import { useNavigationContext } from '../NavigationContext'
import React, { MouseEventHandler } from 'react'
import { NavigationDrawerModalScrim } from './NavigationDrawerModalScrim'
import { NavigationDrawerModalContainer } from './NavigationDrawerModalContainer'
import { NavigationProps } from '..'
import {
  NavigationDrawerHeader,
  NavigationDrawerItem,
  NavigationDrawerItems
} from '@ayataka/tailwind-md3'
import { Link } from '@remix-run/react'

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
        className={`'w-[360px] h-screen overflow-y-auto ${className}`}
        isOpen={isDrawerModalOpen}
      >
        <NavigationDrawerHeader
          className="sticky top-0 z-50 bg-surface-container-low"
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
