export type TimePickerCommonProps = {
  className?: string
  hour: string
  minute: string
  period: Period
  onHourChange: (hour: string) => void
  onMinuteChange: (minute: string) => void
  onPeriodChange: (period: Period) => void
  onAcceptClick: () => void
  onCancelClick: () => void
  errors: string[]
}

export type Period = 'AM' | 'PM'
