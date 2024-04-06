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
import { DatePickers } from './pages/DatePickers'
import { TextFields } from './pages/TextFields'

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
          path: 'datepicker',
          element: <DatePickers />
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
        },
        {
          path: 'textfields',
          element: <TextFields />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
