import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  Outlet,
  redirect,
  useLoaderData,
  useSearchParams
} from '@remix-run/react'
import { getProjects } from 'services/projects'
import { TwoPaneLayout } from '~/components/Layout'
import { FirstPane, SecondPane } from '~/components/Layout/TwoPaneLayout'
import { useNavigationAction } from '~/features/Clients/navigationAction'
import { getClientListPath } from '~/features/Clients/paths'
import { UserNavigations } from '~/features/Navigations/UserNavigations'
import { ProjectsPanel } from '~/features/Projects/ProjectsPanel'
import { useProjectNavigationAction } from '~/features/Projects/navigationAction'

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const body = await request.formData()
  const pathname = body.get('pathname') as string
  const searchParams = new URLSearchParams()
  const bodyKeyword = body.get('keyword')
  const keyword = bodyKeyword as string
  searchParams.append('keyword', keyword)
  return redirect(getClientListPath(searchParams, pathname))
}

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
  const url = new URL(request.url)
  const keyword = url.searchParams.get('keyword') ?? undefined
  const projects = await getProjects({ keyword: keyword })
  return { projects }
}

export default function ClientsPage() {
  const data = useLoaderData<typeof clientLoader>()
  const [searchParams] = useSearchParams()
  const searchedValue = searchParams.get('keyword') ?? ''
  const navigationAction = useProjectNavigationAction()

  return (
    <div className="h-screen flex bg-surface-container">
      <UserNavigations pageKey="projects" navigationAction={navigationAction} />
      <TwoPaneLayout className="flex-1 xp:grid-cols-[384px_1fr]">
        <FirstPane className="bg-surface-container">
          <ProjectsPanel
            projects={data.projects}
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
