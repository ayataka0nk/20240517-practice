import { Card, IconButton } from '@ayataka/tailwind-md3'
import { ClientLoaderFunction, Link, useLoaderData } from '@remix-run/react'
import { getClient } from 'services/clients/getClient'

export const clientLoader: ClientLoaderFunction = async ({ params }) => {
  const clientId = params.clientId as string
  const client = await getClient({ clientId: clientId })
  return { client }
}

export default function ClientDetailPage() {
  const { client } = useLoaderData<typeof clientLoader>()
  return (
    <div className="md:py-2">
      <Card className="relative" bg="surface">
        <p>{client.name}</p>
        <IconButton
          className="absolute top-1 right-1"
          component={Link}
          icon="PencilSquare"
          to={`/user/clients/${client.id}/edit`}
        />
      </Card>
    </div>
  )
}
