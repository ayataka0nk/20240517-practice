import { Card, IconButton } from '@ayataka/tailwind-md3'
import {
  ClientLoaderFunctionArgs,
  Link,
  useLoaderData,
  useSearchParams
} from '@remix-run/react'
import { format } from 'date-fns'
import { getClient } from 'services/clients/getClient'
import { getWorkEntry } from 'services/workEntries'
import { useClientPath } from '~/features/Clients/paths'
import { getWorkEntryEditPath } from '~/features/WorkEntries/paths'
import { formatDateTime } from '~/utils'

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
  const workEntryId = params.workEntryId as string
  const workEntry = await getWorkEntry({ workEntryId: workEntryId })
  return { workEntry }
}

export default function ClientDetailPage() {
  const { workEntry } = useLoaderData<typeof clientLoader>()
  const [searchParams] = useSearchParams()

  return (
    <div>
      <Card className="relative" bg="surface">
        <p>{workEntry.description}</p>
        <p>{format(workEntry.startTime, 'yyyy/MM/dd HH:mm')}</p>
        <IconButton
          className="absolute top-1 right-1"
          component={Link}
          icon="PencilSquare"
          to={getWorkEntryEditPath(workEntry.workEntryId, searchParams)}
        />
      </Card>
    </div>
  )
}
