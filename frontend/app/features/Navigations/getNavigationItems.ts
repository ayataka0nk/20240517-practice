import { NavigationItemType } from '~/components/Navigation'

export type PageKey = 'dashboard' | 'clients'

export const getNavigationItems = ({ pageKey }: { pageKey: PageKey }) => {
  const items: NavigationItemType[] = [
    {
      icon: 'Home',
      labelText: 'ダッシュボード',
      href: '/dashboard',
      active: pageKey === 'dashboard'
    },
    {
      icon: 'BuildingOffice2',
      labelText: '取引先',
      href: '/clients',
      active: pageKey === 'clients'
    },
    {
      icon: 'ArrowLeftStartOnRectangle',
      labelText: 'ログアウト',
      onClick: () => {},
      active: false
    }
  ]
  return items
}
