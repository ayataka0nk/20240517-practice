import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Buttons } from './pages/Buttons'
import './index.css'
import { Root } from './layout/Root'
import { AppBars } from './pages/AppBars'
import { Cards } from './pages/Cards'
import { SearchBarPage } from './pages/SearchBar'
import { SearchViewPage } from './pages/SearchView'
import { SearchFieldPage } from './pages/SearchField'
import { DialogPage } from './pages/Dialog'

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Root />,
      children: [
        {
          path: 'appbars',
          element: <AppBars />
        },
        {
          path: 'buttons',
          element: <Buttons />
        },
        {
          path: 'cards',
          element: <Cards />
        },
        {
          path: 'dialog',
          element: <DialogPage />
        },
        {
          path: 'searchbar',
          element: <SearchBarPage />
        },
        {
          path: 'searchview',
          element: <SearchViewPage />
        },
        {
          path: 'searchfield',
          element: <SearchFieldPage />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
