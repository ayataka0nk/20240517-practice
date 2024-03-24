import { Fab } from '@ayataka/tailwind-md3'
import { NavigationActionType } from './type'
import { Link } from 'react-router-dom'

export const FABNavigation = ({
  action,
  className
}: {
  action: NavigationActionType
  className?: string
}) => {
  const style = getStyle()
  if (typeof action === 'undefined') {
    return <></>
  } else if (action.href) {
    return (
      <Fab
        className={`${style} ${className}`}
        size="large"
        color="primary"
        icon="Pencil"
        to={action.href}
        floating
        component={Link}
      />
    )
  } else if (action.onClick) {
    return (
      <Fab
        className={`${style} ${className}`}
        size="large"
        color="primary"
        icon="Pencil"
        floating
        type="button"
        onClick={action.onClick}
      />
    )
  } else {
    return <></>
  }
}
const getStyle = () => {
  const styles = ['fixed', 'bottom-4', 'right-4']
  return styles.join(' ')
}
