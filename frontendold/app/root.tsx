import { Outlet, Scripts } from '@remix-run/react'
import React from 'react'
export default function App() {
  return (
    <>
      <h1>Hello world!</h1>
      <Outlet />

      <Scripts />
    </>
  )
}
