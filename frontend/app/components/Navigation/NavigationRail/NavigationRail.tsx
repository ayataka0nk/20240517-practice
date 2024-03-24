import { ComponentProps } from 'react'
import { NavigationRailContainer } from './NavigationRailContainer'
import { NavigationRailMenuIcon } from './NavigationRailMenuIcon'
import { NavigationRailItem } from './NavigationRailItem'
import { NavigationRailItems } from './NavigationRailItems'
import { NavigationRailHeader } from './NavigationRailHeader'
import { NavigationRailActionArea } from './NavigationRailActionArea'
import { Fab } from '@/components/Button'

type Props = ComponentProps<'nav'> & {
  menuIcon?: boolean
  onMenuIconClick?: () => void
}

export const NavigationRail = ({
  onMenuIconClick,
  className,
  ...props
}: Props) => {
  return (
    <NavigationRailContainer className={`${className}`} {...props}>
      <NavigationRailHeader>
        <NavigationRailMenuIcon onClick={onMenuIconClick} />
      </NavigationRailHeader>
      <NavigationRailActionArea>
        <Fab icon="Pencil" />
      </NavigationRailActionArea>
      <NavigationRailItems>
        <NavigationRailItem icon="Phone" labelText="hoge" />
        <NavigationRailItem icon="Phone" labelText="hura" active />
        <NavigationRailItem icon="Phone" active />
      </NavigationRailItems>
    </NavigationRailContainer>
  )
}
