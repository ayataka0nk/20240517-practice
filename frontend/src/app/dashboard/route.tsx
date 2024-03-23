import { RouteObject } from 'react-router-dom'
import { DashBoardPage } from './page'
import { dashboardLoader } from './loaders'

export const dashboardRoute: RouteObject = {
  path: '/dashboard',
  element: <DashBoardPage />,
  loader: dashboardLoader
}
