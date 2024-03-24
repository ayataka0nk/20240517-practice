import {
  ExtendedFAB,
  NavigationDrawerActionArea,
  NavigationDrawerHeader,
  NavigationDrawerItem,
  NavigationDrawerItems
} from '@ayataka/tailwind-md3'
import { NavigationProps } from '..'
import { Link } from '@remix-run/react'

export const NavigationDrawerStandard = ({
  logo,
  action,
  items,
  className
}: NavigationProps & {
  className?: string
}) => {
  return (
    <nav className={`${className} w-[360px]`}>
      <NavigationDrawerHeader>{logo}</NavigationDrawerHeader>
      {action && (
        <NavigationDrawerActionArea>
          {action.href && (
            <ExtendedFAB
              className="w-full"
              to={action.href}
              icon={action.icon}
              component={Link}
            >
              {action.labelText}
            </ExtendedFAB>
          )}
          {action.onClick && (
            <ExtendedFAB
              icon={action.icon}
              onClick={action.onClick}
              type="button"
            >
              {action.labelText}
            </ExtendedFAB>
          )}
        </NavigationDrawerActionArea>
      )}
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
                active={item.active}
              />
            )
          } else if (item.onClick) {
            return (
              <NavigationDrawerItem
                key={index}
                icon={item.icon}
                labelText={item.labelText}
                onClick={item.onClick}
                component="button"
                active={item.active}
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
                active={item.active}
              />
            )
          } else {
            return <></>
          }
        })}
      </NavigationDrawerItems>
    </nav>
  )
}
