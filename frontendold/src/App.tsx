import { MyRouterProvider } from './app/Router'
import { UIContextProvider } from './components'
import { getTailwindConfig } from './components/TailwindConfig'
import { UITemplateContextProvider } from './templates/UITemplateContextProvider'

function App() {
  const tailwindConfig = getTailwindConfig()
  return (
    <UIContextProvider tailwindConfig={tailwindConfig}>
      <UITemplateContextProvider>
        <MyRouterProvider />
      </UITemplateContextProvider>
    </UIContextProvider>
  )
}
export default App
