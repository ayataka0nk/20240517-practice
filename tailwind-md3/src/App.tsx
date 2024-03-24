import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Buttons } from './pages/Buttons'
import './index.css'
import { Root } from './layout/Root'

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Root />,
      children: [
        {
          path: 'buttons',
          element: <Buttons />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
