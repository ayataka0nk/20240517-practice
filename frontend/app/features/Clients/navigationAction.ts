import { useSearchParams } from '@remix-run/react'
import { NavigationActionType } from '~/components/Navigation'
import { getClientCreatePath } from './paths'

export const useNavigationAction = (): NavigationActionType => {
  const [urlSearchParams] = useSearchParams()
  return {
    icon: 'Pencil',
    labelText: '取引先を追加する',
    href: getClientCreatePath(urlSearchParams)
  }
}
