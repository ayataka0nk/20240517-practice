import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ClientsPage from './clients/page'
import { dashboardRoute } from './dashboard/route'
import { loginRoute } from './login/route'

const router = createBrowserRouter([
  loginRoute,
  dashboardRoute,
  {
    path: '/clients',
    element: <ClientsPage />
  }
])

export const MyRouterProvider = () => {
  return <RouterProvider router={router} />
}
