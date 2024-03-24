import { Box } from '@/templates/Box'
import { FABNavigation } from '@/templates/Navigation'
import { ClientSearchForm } from './ClientSearchForm'
import { navigationAction } from './navigationAction'
import { Card } from '@/components/Card'
import { Link } from 'react-router-dom'
import { useClientSummaries } from './loaders'

export const ClientsPanel = () => {
  const clients = useClientSummaries()
  return (
    <Box className="h-full py-2 overflow-y-auto">
      <FABNavigation className="z-[1] md:hidden" action={navigationAction} />
      <ClientSearchForm defaultValue={''} className="mb-4 z-[1] sticky top-0" />
      <div className="grid gap-2">
        {clients.map((client) => (
          <Card
            bg="surface-container-high"
            key={client.id}
            component={Link}
            to={`/clients/${client.id}`}
          >
            {client.name}
          </Card>
        ))}
      </div>
    </Box>
  )
}
