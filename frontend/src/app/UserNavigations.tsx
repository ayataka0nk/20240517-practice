import { NavigationDrawerModal } from '@/templates/Navigation/NavigationDrawerModal'
import { NavigationRail } from '@/templates/Navigation/NavigationRail'
import { NavigationDrawerStandard } from '@/templates/Navigation/NavigationDrawerStandard'
import { NavigationActionType } from '@/templates/Navigation'
import { Logo } from './Logo'
import { PageKey, getNavigationItems } from './getNavigationItems'

type Props = {
  pageKey: PageKey
  navigationAction?: NavigationActionType
}
export const UserNavigations = ({ pageKey, navigationAction }: Props) => {
  const items = getNavigationItems({ pageKey: pageKey })
  return (
    <>
      <NavigationDrawerModal
        className="bg-surface-container-low"
        logo={<Logo />}
        items={items}
      />
      <NavigationRail
        className="hidden md:block lg:hidden h-full overflow-y-auto"
        logo={<Logo />}
        action={navigationAction}
        items={items}
      />
      <NavigationDrawerStandard
        className="hidden lg:block h-full overflow-y-auto"
        logo={<Logo />}
        action={navigationAction}
        items={items}
      />
    </>
  )
}
