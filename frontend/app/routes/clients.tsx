import { Outlet } from '@remix-run/react'
import { TwoPaneLayout } from '~/components/Layout'
import { FirstPane, SecondPane } from '~/components/Layout/TwoPaneLayout'
import { NavigationActionType } from '~/components/Navigation'
import { UserNavigations } from '~/features/Navigations/UserNavigations'

const navigationAction: NavigationActionType = {
  icon: 'Pencil',
  labelText: '取引先を追加する',
  href: '/user/clients/create'
}

export default function ClientsPage() {
  return (
    <div className="h-screen flex bg-surface-container">
      <UserNavigations pageKey="clients" navigationAction={navigationAction} />
      <TwoPaneLayout className="flex-1 xp:grid-cols-[384px_1fr]">
        <FirstPane className="bg-surface-container">
          {/* <ClientsPanel></ClientsPanel> */}
          <div>clientspanel</div>
        </FirstPane>
        <SecondPane className="bg-surface-container">
          <Outlet />
        </SecondPane>
      </TwoPaneLayout>
    </div>
  )
}
