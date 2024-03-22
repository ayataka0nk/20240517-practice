import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashBoardPage from './dashboard/page'
import ClientsPage from './clients/page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashBoardPage />
  },
  {
    path: '/clients',
    element: <ClientsPage />
  }
])

export const MyRouterProvider = () => {
  return <RouterProvider router={router} />
}
