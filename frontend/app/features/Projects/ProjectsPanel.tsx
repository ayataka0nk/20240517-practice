import { Link } from 'react-router-dom'
import { Card } from '@ayataka/tailwind-md3'
import { FABNavigation } from '~/components/Navigation'
import { useNavigationContext } from '~/components/Navigation/NavigationContext'
import { SearchForm } from '~/components/SearchForm'
import { useProjectPath } from './paths'
import { useProjectNavigationAction } from './navigationAction'
import { ProjectSummary } from 'services/projects'

type Props = {
  projects: ProjectSummary[]
  searchedValue: string
}
export const ProjectsPanel = ({ projects, searchedValue }: Props) => {
  const { setIsDrawerModalOpen } = useNavigationContext()

  const handleMenuClick = () => {
    setIsDrawerModalOpen(true)
  }

  const { makeDetailPath } = useProjectPath()
  const navigationAction = useProjectNavigationAction()

  return (
    <div className="py-2">
      <FABNavigation className="z-[1] md:hidden" action={navigationAction} />
      <SearchForm
        className="mb-4 z-[1] sticky top-2"
        onMenuClick={handleMenuClick}
        placeholder="search text"
        name="keyword"
        searchedValue={searchedValue}
        historyKey="projects"
      ></SearchForm>

      <div className="grid gap-2">
        {projects.map((project) => (
          <Card
            bg="surface-container-high"
            key={project.projectId}
            component={Link}
            to={makeDetailPath(project.projectId)}
          >
            {project.name}
          </Card>
        ))}
      </div>
    </div>
  )
}
