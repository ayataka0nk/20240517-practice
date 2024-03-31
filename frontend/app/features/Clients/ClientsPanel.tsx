import { ClientSearchForm } from './ClientSearchForm'

import { Link } from 'react-router-dom'
import { Card } from '@ayataka/tailwind-md3'
import { FABNavigation } from '~/components/Navigation'
import { navigationAction } from './navigationAction'
import { ClientSummary } from 'services/clients/getClients'

type Props = {
  clients: ClientSummary[]
  searchedValue?: string
}
export const ClientsPanel = ({ clients, searchedValue }: Props) => {
  return (
    <div className="py-2">
      <FABNavigation className="z-[1] md:hidden" action={navigationAction} />
      <ClientSearchForm
        defaultValue={searchedValue || ''}
        className="mb-4 z-[1] sticky top-2"
      />
      <div className="grid gap-2">
        {clients.map((client) => (
          <Card
            bg="surface-container-high"
            key={client.clientId}
            component={Link}
            to={`/clients/${client.clientId}`}
          >
            {client.name}
          </Card>
        ))}
      </div>
    </div>
  )
}
