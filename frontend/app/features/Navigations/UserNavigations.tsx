import { NavigationActionType } from '~/components/Navigation'
import { PageKey, getNavigationItems } from './getNavigationItems'
import { NavigationDrawerModal } from '~/components/Navigation/NavigationDrawerModal'
import { Logo } from './Logo'
import { NavigationRail } from '~/components/Navigation/NavigationRail'
import { NavigationDrawerStandard } from '~/components/Navigation/NavigationDrawerStandard'

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
        className="hidden md:flex lg:hidden h-full overflow-y-auto"
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
