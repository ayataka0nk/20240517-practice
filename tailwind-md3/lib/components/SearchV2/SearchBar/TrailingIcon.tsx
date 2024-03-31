import { Breakpoint } from '../../../type'
import { IconButton } from '../../IconButton'

type Props = {
  isViewOpen: boolean
  docked: Breakpoint
  handleClearClick: () => void
}

export const TrailingIcon = ({
  isViewOpen,
  docked,
  handleClearClick
}: Props) => {
  const style = getTrailingIconStyle()
  const xMarkIconStyle = getXMarkIconStyle({ isViewOpen, docked })
  return (
    <IconButton
      className={`${style} ${xMarkIconStyle}`}
      icon="XMark"
      variant="standard"
      type="button"
      noRipple
      onClick={handleClearClick}
    />
  )
}

const getTrailingIconStyle = () => {
  const styles = [
    'absolute',
    'w-6',
    'h-6',
    'right-1',
    'z-10',
    'text-on-surface'
  ]
  return styles.join(' ')
}

const getXMarkIconStyle = ({
  isViewOpen
}: Pick<Props, 'isViewOpen' | 'docked'>) => {
  if (isViewOpen) {
    // ビューを開いているときは、入力値があるときだけ表示
    return `peer-placeholder-shown:hidden`
  } else {
    // ビューを閉じているときは、入力値があるときだけ表示
    return `peer-placeholder-shown:hidden`
  }
}
