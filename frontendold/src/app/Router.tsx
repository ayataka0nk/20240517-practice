import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { dashboardRoute } from './dashboard/route'
import { loginRoute } from './login/route'
import { clientsRoute } from './clients/route'

const router = createBrowserRouter([loginRoute, dashboardRoute, clientsRoute])

export const MyRouterProvider = () => {
  return <RouterProvider router={router} />
}
