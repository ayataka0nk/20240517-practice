import { NavigationItemType } from '@/templates/Navigation'

export type PageKey = 'dashboard' | 'clients'

export const getNavigationItems = ({ pageKey }: { pageKey: PageKey }) => {
  const items: NavigationItemType[] = [
    {
      icon: 'Home',
      labelText: 'ダッシュボード',
      href: '/user/dashboard',
      active: pageKey === 'dashboard'
    },
    {
      icon: 'BuildingOffice2',
      labelText: '取引先',
      href: '/user/clients',
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
