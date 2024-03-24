import { RouteObject } from 'react-router-dom'
import ClientsPage from './page'
import { clientsLoader } from './loaders'
import { showClientRoute } from './[clientId]/page'

export const clientsRoute: RouteObject = {
  path: '/clients',
  Component: ClientsPage,
  loader: clientsLoader,
  children: [showClientRoute]
}
