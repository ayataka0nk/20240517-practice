import { useSearchParams } from '@remix-run/react'
import { NavigationActionType } from '~/components/Navigation'
import { getProjectCreatePath } from './paths'

export const useProjectNavigationAction = (): NavigationActionType => {
  const [urlSearchParams] = useSearchParams()
  return {
    icon: 'Pencil',
    labelText: 'プロジェクトを追加する',
    href: getProjectCreatePath(urlSearchParams)
  }
}
