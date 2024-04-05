import { Card, IconButton } from '@ayataka/tailwind-md3'
import {
  ClientLoaderFunctionArgs,
  Link,
  useLoaderData,
  useSearchParams
} from '@remix-run/react'
import { getClient } from 'services/clients/getClient'
import { useClientPath } from '~/features/Clients/paths'

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
  const clientId = params.clientId as string
  const client = await getClient({ clientId: clientId })
  return { client }
}

export default function ClientDetailPage() {
  const { client } = useLoaderData<typeof clientLoader>()
  const { makeEditPath } = useClientPath()
  return (
    <div>
      <Card className="relative" bg="surface">
        <p>{client.name}</p>
        <IconButton
          className="absolute top-1 right-1"
          component={Link}
          icon="PencilSquare"
          to={makeEditPath(client.clientId)}
        />
      </Card>
    </div>
  )
}
