import { RouteObject } from 'react-router-dom'
import LoginPage from './page'
import { loginAction } from './actions'

export const loginRoute: RouteObject = {
  path: '/login',
  element: <LoginPage />,
  action: loginAction
}
