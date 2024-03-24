import { Transition } from '@headlessui/react'

type Props = {
  className?: string
  isDrawerModalOpen: boolean
  onClick: React.MouseEventHandler<HTMLDivElement>
}
export const NavigationDrawerModalScrim = ({
  className,
  isDrawerModalOpen,
  onClick
}: Props) => {
  return (
    <Transition
      className={`fixed top-0 z-[29] left-0 h-full w-full bg-black opacity-40 ${className}`}
      show={isDrawerModalOpen}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-40"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-40"
      leaveTo="opacity-0"
      onClick={onClick}
    ></Transition>
  )
}
