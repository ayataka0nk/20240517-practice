import { forwardRef } from 'react'
import { Button } from '../Button'
import { IconButton } from '../IconButton'
import { TextField } from '../TextField'

type Props = {
  date: string
  onDateChange: (date: string) => void
  onCancelClick: () => void
  onAcceptClick: () => void
  errors: string[]
}
export const ModalDateInput = forwardRef<HTMLInputElement, Props>(
  (
    { date, onDateChange, onCancelClick, onAcceptClick, errors },
    forwardedRef
  ) => {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      onDateChange(e.target.value)
    }
    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (
      event
    ) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        onAcceptClick()
      }
    }

    const handleKeyDownStopEvent: React.KeyboardEventHandler<
      HTMLButtonElement
    > = (event) => {
      if (event.key === 'Enter') {
        event.stopPropagation()
      }
    }

    return (
      <div
        className="bg-surface-container-high py-4 rounded-[28px] w-[328px]"
        onKeyDown={handleKeyDown}
      >
        <p className="mb-9 px-6 text-on-surface-variant text-sm">Select date</p>
        <div className="px-6 pb-[5px] border-b border-outline-variant text-on-surface flex justify-between">
          <p className="text-[32px] leading-[40px]">Enter dates</p>
          <IconButton
            variant="standard"
            icon="Calendar"
            iconVariant="solid"
            className="w-6 h-6"
            type="button"
          />
        </div>

        <div className="pt-[5px] px-6">
          <TextField
            ref={forwardedRef}
            variant="outlined"
            label="Date"
            bg="surface-container-high"
            placeholder="yyyy/mm/dd"
            value={date}
            onChange={handleChange}
            error={errors.join('')}
          />
        </div>
        {/* <p className="h-[16px] text-xs text-error px-6">{errors.join('')}</p> */}
        <div className="flex justify-end items-center gap-4 px-6">
          <Button
            variant="text"
            type="button"
            onClick={onCancelClick}
            onKeyDown={handleKeyDownStopEvent}
          >
            Cancel
          </Button>
          <Button
            variant="text"
            type="button"
            onClick={onAcceptClick}
            onKeyDown={handleKeyDownStopEvent}
          >
            OK
          </Button>
        </div>
      </div>
    )
  }
)
