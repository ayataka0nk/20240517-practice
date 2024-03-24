import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Buttons } from './pages/Buttons'
import './index.css'
import { Root } from './layout/Root'
import { AppBars } from './pages/AppBars'
import { Cards } from './pages/Cards'

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
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
