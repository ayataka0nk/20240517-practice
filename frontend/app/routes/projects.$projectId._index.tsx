import { Card, IconButton } from '@ayataka/tailwind-md3'
import {
  ClientLoaderFunctionArgs,
  Link,
  useLoaderData,
  useSearchParams
} from '@remix-run/react'
import { getProject } from 'services/projects'
import { getProjectEditPath } from '~/features/Projects/paths'

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
  const projectId = params.projectId as string
  const project = await getProject({ projectId: projectId })
  return { project }
}

export default function ClientDetailPage() {
  const [searchParams] = useSearchParams()
  const makeEditPath = (projectId: string) => {
    return getProjectEditPath(projectId, searchParams)
  }
  const { project } = useLoaderData<typeof clientLoader>()

  return (
    <div>
      <Card className="relative" bg="surface">
        <p>{project.name}</p>
        <p>{project.description}</p>
        <IconButton
          className="absolute top-1 right-1"
          component={Link}
          icon="PencilSquare"
          to={makeEditPath(project.projectId)}
        />
      </Card>
    </div>
  )
}
