import { Outlet, useLoaderData } from '@remix-run/react'
import { getClients } from 'services/clients/getClients'
import { TwoPaneLayout } from '~/components/Layout'
import { FirstPane, SecondPane } from '~/components/Layout/TwoPaneLayout'
import { NavigationActionType } from '~/components/Navigation'
import { ClientsPanel } from '~/features/Clients/ClientsPanel'
import { UserNavigations } from '~/features/Navigations/UserNavigations'

const navigationAction: NavigationActionType = {
  icon: 'Pencil',
  labelText: '取引先を追加する',
  href: '/user/clients/create'
}

export const clientLoader = async () => {
  const clients = await getClients()
  return { clients }
}

export default function ClientsPage() {
  const data = useLoaderData<typeof clientLoader>()
  return (
    <div className="h-screen flex bg-surface-container">
      <UserNavigations pageKey="clients" navigationAction={navigationAction} />
      <TwoPaneLayout className="flex-1 xp:grid-cols-[384px_1fr]">
        <FirstPane className="bg-surface-container">
          <ClientsPanel clients={data.clients} />
        </FirstPane>
        <SecondPane className="bg-surface-container">
          <Outlet />
        </SecondPane>
      </TwoPaneLayout>
    </div>
  )
}
