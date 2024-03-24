import { Transition } from '@headlessui/react'
import { ComponentProps } from 'react'

type Props = ComponentProps<'nav'> & {
  isOpen: boolean
}
export const NavigationDrawerModalContainer = ({
  className,
  children,
  isOpen,
  ...props
}: Props) => {
  const style = getStyle()
  return (
    <Transition
      className="fixed top-0 left-0 z-30"
      show={isOpen}
      enter="transition-transform duration-200"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition-transform duration-200"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
    >
      <nav className={`${className} ${style}`} {...props}>
        {children}
      </nav>
    </Transition>
  )
}

const getStyle = () => {
  const styles = [
    'drop-shadow-2xl',
    'w-side-nav',
    'h-screen',
    'top-0',
    'left-0'
  ]
  return styles.join(' ')
}
