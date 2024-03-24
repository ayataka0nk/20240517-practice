import { TwoPaneLayout } from '@/templates/Layout'
import { UserNavigations } from '../UserNavigations'
import { FirstPane, SecondPane } from '@/templates/Layout/TwoPaneLayout'
import { navigationAction } from './navigationAction'
import { Outlet } from 'react-router-dom'
import { ClientsPanel } from './ClientsPanel'

export default function ClientsPage() {
  return (
    <div className="h-screen flex bg-surface-container">
      <UserNavigations pageKey="clients" navigationAction={navigationAction} />
      <TwoPaneLayout className="flex-1 xp:grid-cols-[384px_1fr]">
        <FirstPane className="bg-surface-container">
          <ClientsPanel></ClientsPanel>
        </FirstPane>
        <SecondPane className="bg-surface-container">
          <Outlet />
        </SecondPane>
      </TwoPaneLayout>
    </div>
  )
}
