// import { NavigationDrawerModal } from './NavigationDrawerModal/NavigationDrawerModal'
// import { NavigationDrawerStandard } from './NavigationDrawerStandard/NavigationDrawerStandard'
// import { NavigationRail } from './NavigationRail/NavigationRail'
// import { NavigationConfig, NavigationProps } from './type'
// import { useBreakpoint } from '@/components/hooks/useBreakpoint'

// export const SideNavigation = ({ ...props }: NavigationProps) => {
//   const newProps: NavigationConfig = {
//     ...props,
//     items: props.items.map((item) => ({
//       ...item
//     }))
//   }
//   const breakpoint = useBreakpoint()
//   if (breakpoint === 'sm') {
//     return (
//       <>
//         {/* <NavigationFAB  /> */}
//         <NavigationDrawerModal
//           className="bg-surface-container-low"
//           {...newProps}
//         />
//       </>
//     )
//   } else if (breakpoint === 'md') {
//     return (
//       <>
//         <NavigationDrawerModal
//           className="bg-surface-container-low"
//           {...newProps}
//         />
//         <NavigationRail {...newProps} />
//       </>
//     )
//   } else if (breakpoint === 'xp') {
//     return (
//       <>
//         <NavigationRail {...newProps} />
//         <NavigationDrawerModal
//           className="bg-surface-container-low"
//           {...newProps}
//         />
//       </>
//     )
//   } else {
//     return (
//       <>
//         <NavigationDrawerStandard {...newProps} />
//       </>
//     )
//   }
// }

// const isActive = ({ href, pathname }: { href?: string; pathname: string }) => {
//   if (href) {
//     return pathname.startsWith(href)
//   } else {
//     return false
//   }
// }
