import { TimePickerCommonProps } from './type'
import { TimePickerInputField } from './TimePickerInputField'
import { IconButton } from '../IconButton'
import { PeriodSelector } from './PeriodSelector'
import { Button } from '../Button'
import { forwardRef } from 'react'

export const TimeInputPicker = forwardRef<
  HTMLDivElement,
  TimePickerCommonProps
>(
  (
    {
      className,
      hour,
      minute,
      period,
      onHourChange,
      onMinuteChange,
      onPeriodChange,
      onAcceptClick,
      onCancelClick
    },
    ref
  ) => {
    const rootStyle = getRootStyle()

    const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onHourChange(e.target.value)
    }

    const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onMinuteChange(e.target.value)
    }

    return (
      <div
        className={`bg-surface-container-high ${rootStyle} ${className}`}
        ref={ref}
      >
        <p className="mb-[20px] text-on-surface-variant text-xs">Enter time</p>
        <div className="flex">
          <TimePickerInputField
            type="text"
            value={hour}
            onChange={handleHourChange}
          />
          <span className="inline-block text-[57px] leading-[64px] -tracking-[0.25] w-[24px] text-center">
            :
          </span>
          <TimePickerInputField
            type="text"
            value={minute}
            onChange={handleMinuteChange}
          />
          <PeriodSelector
            className="ml-[12px]"
            value={period}
            onChange={onPeriodChange}
          />
        </div>
        <div className="mb-[24px]">
          <label className="inline-block w-[96px] mr-[24px] text-on-surface-variant text-xs">
            Hour
          </label>
          <label className="inline-block w-[96px] text-on-surface-variant text-xs">
            Minute
          </label>
        </div>
        <div className="flex justify-between items-center">
          <IconButton icon="Clock" className="text-on-surface-variant" />
          <div className="flex items-center gap-2">
            <Button variant="text" type="button" onClick={onCancelClick}>
              Cancel
            </Button>
            <Button variant="text" type="button" onClick={onAcceptClick}>
              OK
            </Button>
          </div>
        </div>
      </div>
    )
  }
)

const getRootStyle = () => {
  const styles = ['p-[24px] rounded-[28px] w-fit']
  return styles.join(' ')
}
