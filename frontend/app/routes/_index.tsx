import type { MetaFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { Button } from '@ayataka/tailwind-md3'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix SPA' },
    { name: 'description', content: 'Welcome to Remix (SPA Mode)!' }
  ]
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Welcome to Remix (SPA Mode)</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/future/spa-mode"
            rel="noreferrer"
            className="text-red-500"
          >
            SPA Mode Guide
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/docs"
            rel="noreferrer"
            className="text-primary"
          >
            Remix Docs
          </a>
        </li>
      </ul>
      {/* <SampleComponent />
      <Button>aa</Button> */}
      <Button icon="AcademicCap">aa</Button>

      <div className="text-primary bg-surface">frontend</div>
      <Outlet />
    </div>
  )
}
