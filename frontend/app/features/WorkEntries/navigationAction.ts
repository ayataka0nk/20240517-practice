import { NavigationActionType } from '~/components/Navigation'
import { getWorkEntryCreatePath } from './paths'
import { useSearchParams } from '@remix-run/react'

export const useWorkEntryNavigationAction = (): NavigationActionType => {
  const [urlSearchParams] = useSearchParams()
  return {
    icon: 'Pencil',
    labelText: '稼働記録を追加する',
    href: getWorkEntryCreatePath(urlSearchParams)
  }
}
