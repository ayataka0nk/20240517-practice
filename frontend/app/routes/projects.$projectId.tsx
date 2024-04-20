import { Outlet } from '@remix-run/react'
import { NavigationTopAppBar } from '~/components/Navigation'
import { Logo } from '~/features/Navigations/Logo'

export default function ClientLayoutPage() {
  return (
    <div>
      <div className="md:hidden sticky top-0 left-0 z-[11]">
        <NavigationTopAppBar className="bg-surface-container" logo={<Logo />} />
      </div>
      <div className="md:py-2">
        <Outlet />
      </div>
    </div>
  )
}
