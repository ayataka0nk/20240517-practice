import { Fab } from '@/components/Button'
import {
  NavigationRailActionArea,
  NavigationRailHeader,
  NavigationRailItem,
  NavigationRailItems
} from '@/components/Navigation/NavigationRail'
import { NavigationRailMenuIconClient } from './NavigationRailMenuIconClient'
import { NavigationProps } from '..'
import { Link } from 'react-router-dom'

export const NavigationRail = ({
  className,
  action,
  items
}: NavigationProps & {
  className?: string
}) => {
  return (
    <nav className={`flex flex-col items-center w-20 ${className} `}>
      <NavigationRailHeader>
        <NavigationRailMenuIconClient />
      </NavigationRailHeader>

      {action && (
        <NavigationRailActionArea>
          {action.href && (
            <Fab
              color="secondary"
              icon={action.icon}
              component={Link}
              to={action.href}
            />
          )}
          {action.onClick && (
            <Fab
              color="secondary"
              icon={action.icon}
              onClick={action.onClick}
              type="button"
            />
          )}
        </NavigationRailActionArea>
      )}
      <NavigationRailItems>
        {items.map((item, index) => {
          if (item.href) {
            return (
              <NavigationRailItem
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
              <NavigationRailItem
                key={index}
                icon={item.icon}
                labelText={item.labelText}
                onClick={item.onClick}
                active={item.active}
                component="button"
                type="button"
              />
            )
          } else if (item.externalHref) {
            return (
              <NavigationRailItem
                key={index}
                icon={item.icon}
                labelText={item.labelText}
                href={item.externalHref}
                active={item.active}
                component="a"
              />
            )
          } else {
            return <></>
          }
        })}
      </NavigationRailItems>
    </nav>
  )
}
