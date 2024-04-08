import { MenuButton } from './MenuButton'
import { getMonthOption } from './options'

type Props = {
  selectedYear: number
  selectedMonth: number
}

export const MonthSelector = ({ selectedYear, selectedMonth }: Props) => {
  const style = getContainerStyle()
  const month = getMonthOption(selectedMonth)

  return (
    <div className={style}>
      <div className="h-[40px] border-b border-outline-variant">
        <MenuButton>{month.shortLabel}</MenuButton>
        <MenuButton disabled>{selectedYear}</MenuButton>
      </div>
      <div></div>
    </div>
  )
}

const getContainerStyle = () => {
  const styles = [
    'w-[360px]',
    'h-[456px]',
    'bg-surface-container-high',
    'rounded-[16px]'
  ]
  return styles.join(' ')
}
