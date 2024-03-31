import { Breakpoint } from '../../../type'
import { IconButton } from '../../IconButton'

type Props = {
  searchedValue: string
  isViewOpen: boolean
  docked: Breakpoint
  handleBackClick: () => void
  handleMenuClick: () => void
}
export const LeadingIcon = ({
  searchedValue,
  isViewOpen,
  docked,
  handleBackClick,
  handleMenuClick
}: Props) => {
  const style = getLeadingIconStyle()
  const magnifyingGlassIconStyle = getMagnifyingGlassIconStyle({
    isViewOpen,
    docked,
    searchedValue
  })
  const arrowLeftIconStyle = getArrowLeftIconStyle({
    isViewOpen,
    docked,
    searchedValue
  })
  const bar3IconStyle = getBar3IconStyle({ isViewOpen, docked, searchedValue })
  return (
    <>
      <IconButton
        className={`${style} ${magnifyingGlassIconStyle}`}
        icon="MagnifyingGlass"
        variant="standard"
        type="button"
        noRipple
      />
      <IconButton
        className={`${style} ${arrowLeftIconStyle}`}
        icon="ArrowLeft"
        variant="standard"
        type="button"
        noRipple
        onClick={handleBackClick}
      />
      <IconButton
        className={`${style} ${bar3IconStyle}`}
        icon="Bars3"
        variant="standard"
        type="button"
        noRipple
        onClick={handleMenuClick}
      />
    </>
  )
}

const getLeadingIconStyle = () => {
  const styles = ['absolute', 'left-1', 'z-10', 'text-on-surface']
  return styles.join(' ')
}

type StyleProps = Pick<Props, 'isViewOpen' | 'docked' | 'searchedValue'>

const getMagnifyingGlassIconStyle = ({
  isViewOpen,
  docked,
  searchedValue
}: StyleProps) => {
  if (isViewOpen || searchedValue !== '') {
    // ビューを開いているときと検索値があるときは常に非表示
    return `hidden`
  } else {
    // ドックされているときだけ表示
    return `hidden ${docked}:block`
  }
}

const getArrowLeftIconStyle = ({ isViewOpen, searchedValue }: StyleProps) => {
  if (isViewOpen || searchedValue !== '') {
    // ビューを開いているときは常に表示
    return `block`
  } else {
    // ビューを閉じているときは常に非表示
    return `hidden`
  }
}

const getBar3IconStyle = ({
  isViewOpen,
  docked,
  searchedValue
}: StyleProps) => {
  if (isViewOpen || searchedValue !== '') {
    // ビューを開いているときは常に非表示
    return `hidden`
  } else {
    // ビューを閉じているときはドックされていないときだけ表示
    return `block ${docked}:hidden`
  }
}
