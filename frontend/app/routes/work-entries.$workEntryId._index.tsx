import { Card, IconButton } from '@ayataka/tailwind-md3'
import {
  ClientLoaderFunctionArgs,
  Link,
  useLoaderData,
  useSearchParams
} from '@remix-run/react'
import { getWorkEntry } from 'services/workEntries'
import { getWorkEntryEditPath } from '~/features/WorkEntries/paths'
import { formatYearMonthDateHourMinute, getTimeZone } from '~/utils'

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
  const workEntryId = params.workEntryId as string
  const workEntry = await getWorkEntry({ workEntryId: workEntryId })
  const timeZone = await getTimeZone()
  return { workEntry, timeZone }
}

export default function ClientDetailPage() {
  const { workEntry, timeZone } = useLoaderData<typeof clientLoader>()
  const [searchParams] = useSearchParams()

  return (
    <div>
      <Card className="relative" bg="surface">
        <p>{workEntry.description}</p>
        <p>{formatYearMonthDateHourMinute(workEntry.startTime, timeZone)}</p>
        <p>{formatYearMonthDateHourMinute(workEntry.endTime, timeZone)}</p>
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
