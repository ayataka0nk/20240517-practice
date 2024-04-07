import { Period } from './type'

type Props = {
  className?: string
  value: Period
  onChange: (value: Period) => void
}
export const PeriodSelector = ({ className, value, onChange }: Props) => {
  const wrapperStyle = getWrapperStyle()
  const amButtonStyle = getButtonStyle({
    period: 'AM',
    selected: value === 'AM'
  })
  const pmButtonStyle = getButtonStyle({
    period: 'PM',
    selected: value === 'PM'
  })
  const onAMClick = () => {
    onChange('AM')
  }
  const onPMClick = () => {
    onChange('PM')
  }
  return (
    <div className={`${wrapperStyle} ${className}`}>
      <button
        className={`${amButtonStyle} border-b border-outline`}
        type="button"
        onClick={onAMClick}
      >
        AM
      </button>
      <button className={`${pmButtonStyle}`} type="button" onClick={onPMClick}>
        PM
      </button>
    </div>
  )
}

const getWrapperStyle = () => {
  const styles = [
    'flex',
    'flex-col',
    'overflow-hidden',
    'w-[52px]',
    'h-[72px]',
    'rounded-[8px]',
    'border',
    'border-outline'
  ]
  return styles.join(' ')
}

const getButtonStyle = ({
  period,
  selected
}: {
  period: Period
  selected: boolean
}) => {
  let styles = [
    'relative',
    'flex-1',
    'block',
    'bg-surface-container-high',
    'w-full',
    // hover
    'hover:after:absolute',
    'hover:after:inset-0',
    'hover:after:bg-on-surface',
    'hover:after:opacity-8',
    'hover:after:pointer-events-none',
    // ripple
    'before:absolute',
    'before:pointer-events-none',
    'before:inset-0',
    'before:bg-no-repeat',
    'before:bg-center',
    'before:opacity-0',
    'before:transform',
    'before:scale-10',
    'before:[transition:transform_.3s,opacity_2s]',
    'active:before:opacity-10',
    'active:before:scale-0',
    'active:before:opacity-10',
    'active:before:duration-0'
  ]
  if (selected) {
    styles = [
      ...styles,
      'bg-tertiary-container',
      'before:bg-on-tertiary-container'
    ]
  } else {
    styles = [...styles, 'bg-surface-container-high', 'before:bg-on-surface']
  }
  if (period === 'AM') {
    styles = [...styles, 'before:rounded-t-[8px]']
  } else {
    styles = [...styles, 'before:rounded-b-[8px]']
  }
  return styles.join(' ')
}
