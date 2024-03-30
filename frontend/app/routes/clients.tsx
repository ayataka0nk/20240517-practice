import { Outlet, useLoaderData } from '@remix-run/react'
import { getClients } from 'services/clients/getClients'
import { TwoPaneLayout } from '~/components/Layout'
import { FirstPane, SecondPane } from '~/components/Layout/TwoPaneLayout'
import { ClientsPanel } from '~/features/Clients/ClientsPanel'
import { navigationAction } from '~/features/Clients/navigationAction'
import { UserNavigations } from '~/features/Navigations/UserNavigations'

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
