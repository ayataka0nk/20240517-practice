import { forwardRef } from 'react'
import { TimeInputPicker } from './TimeInputPicker'
import { TimePickerCommonProps } from './type'

export const TimePicker = forwardRef<HTMLDivElement, TimePickerCommonProps>(
  (props, ref) => {
    return <TimeInputPicker ref={ref} {...props} />
  }
)
