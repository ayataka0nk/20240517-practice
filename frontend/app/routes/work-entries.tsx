import {
  ClientLoaderFunctionArgs,
  Outlet,
  useLoaderData,
  useSearchParams
} from '@remix-run/react'
import { getWorkEntries } from 'services/workEntries'
import { TwoPaneLayout } from '~/components/Layout'
import { FirstPane, SecondPane } from '~/components/Layout/TwoPaneLayout'
import { UserNavigations } from '~/features/Navigations/UserNavigations'
import { useProjectNavigationAction } from '~/features/Projects/navigationAction'
import { WorkEntriesPanel } from '~/features/WorkEntries/WorkEntriesPanel'

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
  const url = new URL(request.url)
  const keyword = url.searchParams.get('keyword') ?? undefined
  const workEntries = await getWorkEntries()
  return { workEntries }
}
export default function WorkEntriesPage() {
  const data = useLoaderData<typeof clientLoader>()
  const [searchParams] = useSearchParams()
  const searchedValue = searchParams.get('keyword') ?? ''
  const navigationAction = useProjectNavigationAction()
  return (
    <div className="h-screen flex bg-surface-container">
      <UserNavigations
        pageKey="workEntries"
        navigationAction={navigationAction}
      />
      <TwoPaneLayout className="flex-1 xp:grid-cols-[384px_1fr]">
        <FirstPane className="bg-surface-container">
          <WorkEntriesPanel
            workEntries={data.workEntries}
            searchedValue={searchedValue}
          />
        </FirstPane>
        <SecondPane className="bg-surface-container">
          <Outlet />
        </SecondPane>
      </TwoPaneLayout>
    </div>
  )
}
