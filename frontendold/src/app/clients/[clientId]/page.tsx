import { Box } from '@/templates/Box'
import { Card } from '@/components/Card'
import { IconButton } from '@/components/IconButton'
import { Link } from 'react-router-dom'
import { clientLoader, useClientDetail } from '../loaders'

const ShowClientPage = () => {
  const client = useClientDetail()

  return (
    <Box className="h-full overflow-y-auto md:py-2">
      <Card bg="surface">
        <p>{client.name}</p>
        <IconButton
          className="absolute top-1 right-1"
          component={Link}
          icon="PencilSquare"
          to={`/user/clients/${client.id}/edit`}
        />
      </Card>
    </Box>
  )
}

export const showClientRoute = {
  path: ':clientId',
  Component: ShowClientPage,
  loader: clientLoader
}
