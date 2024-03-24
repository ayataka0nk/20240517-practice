import { Outlet } from 'react-router-dom'
import { NavigationDrawerStandard } from './Navigation'

export const Root = () => {
  return (
    <div className="flex">
      <NavigationDrawerStandard className="h-screen overflow-y-auto" />
      <div className="py-4 px-2 h-screen overflow-y-auto flex-1">
        <Outlet />
      </div>
    </div>
  )
}
