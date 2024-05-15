import { Link, useSearchParams } from '@remix-run/react'
import { WorkEntrySummary } from 'services/workEntries'
import { useNavigationContext } from '~/components/Navigation/NavigationContext'
import { useWorkEntryNavigationAction } from './navigationAction'
import { getWorkEntryDetailPath } from './paths'
import { FABNavigation } from '~/components/Navigation'
import { SearchForm } from '~/components/SearchForm'
import { Card } from '@ayataka/tailwind-md3'
import { formatMonthDateHourMinute } from '~/utils'

type Props = {
  workEntries: WorkEntrySummary[]
  searchedValue: string
  timeZone: string
}

export const WorkEntriesPanel = ({
  workEntries,
  searchedValue,
  timeZone
}: Props) => {
  const { setIsDrawerModalOpen } = useNavigationContext()
  const handleMenuClick = () => {
    setIsDrawerModalOpen(true)
  }
  const [searchParams] = useSearchParams()
  const navigationAction = useWorkEntryNavigationAction()

  return (
    <div className="py-2">
      <FABNavigation className="z-[1] md:hidden" action={navigationAction} />
      <SearchForm
        className="mb-4 z-[1] sticky top-2"
        onMenuClick={handleMenuClick}
        placeholder="search text"
        name="keyword"
        searchedValue={searchedValue}
        historyKey="workEntries"
      ></SearchForm>

      <div className="grid gap-2">
        {workEntries.map((workEntry) => (
          <Card
            bg="surface-container-high"
            key={workEntry.workEntryId}
            component={Link}
            to={getWorkEntryDetailPath(workEntry.workEntryId, searchParams)}
          >
            <p>{workEntry.project.name}</p>
            <p>
              <span>
                {formatMonthDateHourMinute(workEntry.startTime, timeZone)}
              </span>
              <span className="mr-1 ml-1">~</span>
              <span>
                {formatMonthDateHourMinute(workEntry.endTime, timeZone)}
              </span>
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}
