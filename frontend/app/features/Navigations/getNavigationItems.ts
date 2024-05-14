import { NavigationItemType } from '~/components/Navigation'

export type PageKey = 'dashboard' | 'clients' | 'projects' | 'workEntries'

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
      icon: 'ClipboardDocumentList',
      labelText: 'プロジェクト',
      href: '/projects',
      active: pageKey === 'projects'
    },
    {
      icon: 'ClipboardDocumentList',
      labelText: '稼働記録',
      href: '/work-entries',
      active: pageKey === 'workEntries'
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
