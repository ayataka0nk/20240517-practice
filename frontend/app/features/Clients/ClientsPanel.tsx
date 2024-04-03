import { Link } from 'react-router-dom'
import { Card } from '@ayataka/tailwind-md3'
import { FABNavigation } from '~/components/Navigation'
import { navigationAction } from './navigationAction'
import { ClientSummary } from 'services/clients/getClients'
import { useNavigationContext } from '~/components/Navigation/NavigationContext'
import { SearchForm } from '~/components/SearchForm'

type Props = {
  clients: ClientSummary[]
  searchedValue: string
}
export const ClientsPanel = ({ clients, searchedValue }: Props) => {
  const { setIsDrawerModalOpen } = useNavigationContext()

  const handleMenuClick = () => {
    setIsDrawerModalOpen(true)
  }
  return (
    <div className="py-2">
      <FABNavigation className="z-[1] md:hidden" action={navigationAction} />
      <SearchForm
        className="mb-4 z-[1] sticky top-2"
        onMenuClick={handleMenuClick}
        placeholder="search text"
        name="keyword"
        searchedValue={searchedValue}
        historyKey="clients"
      ></SearchForm>

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
