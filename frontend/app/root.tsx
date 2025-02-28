import { LinksFunction } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react'
import styles from './global.css?url'
import md3Styles from '@ayataka/tailwind-md3/dist/style.css?url'
import { UITemplateContextProvider } from './components/UITemplateContextProvider'
import { TailwindContextProvider } from './components/TailwindConfig/TailwindContext'
import { getTailwindConfig } from './components/TailwindConfig'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'stylesheet',
    href: md3Styles
  }
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="light">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const tailwindConfig = getTailwindConfig()
  return (
    <TailwindContextProvider tailwindConfig={tailwindConfig}>
      <UITemplateContextProvider>
        <Outlet />
      </UITemplateContextProvider>
    </TailwindContextProvider>
  )
}

export function HydrateFallback() {
  return <p>Loading...</p>
}
