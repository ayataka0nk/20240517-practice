import { Link } from 'react-router-dom'
import {
  NavigationDrawerHeader,
  NavigationDrawerItems,
  NavigationDrawerItem
} from '../../lib/components/Navigation/NavigationDrawer'

type Props = {
  className?: string
}
export const NavigationDrawerStandard = ({ className }: Props) => {
  return (
    <nav className={`w-[360px] bg-surface ${className}`}>
      <NavigationDrawerHeader>tailwind-md3</NavigationDrawerHeader>
      <NavigationDrawerItems>
        <NavigationDrawerItem
          labelText="AppBar"
          to="/appbars"
          component={Link}
        />
        <NavigationDrawerItem
          labelText="Button"
          to="/buttons"
          component={Link}
        />
        <NavigationDrawerItem labelText="Card" to="/cards" component={Link} />
      </NavigationDrawerItems>
    </nav>
  )
}
