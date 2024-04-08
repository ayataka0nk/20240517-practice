import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { TextField } from '../TextField'
import { TimePicker } from './TimePicker'
import { Period } from './type'
import { useDialogState } from '../../hooks/useDIalogState'
import { TextFieldProps } from '../TextField/type'

/**
 * 時間、分、午前午後からISO-8601形式の時間文字列を計算する
 */
const calculateTimeString = (hour: string, minute: string, period: Period) => {
  if (hour === '' || minute === '') {
    return ''
  }
  let hourNumber = parseInt(hour)
  const minuteNumber = parseInt(minute)
  if (hourNumber === 12) {
    hourNumber = 0
  }
  if (period === 'PM') {
    hourNumber += 12
  }
  const hourString = hourNumber.toString().padStart(2, '0')
  const minuteString = minuteNumber.toString().padStart(2, '0')

  return `${hourString}:${minuteString}`
}

/**
 * ISO-8601形式の時間文字列を時間、分、午前午後にパースする
 */
const parseTime = (
  timeString: string
):
  | {
      hour: string
      minute: string
      period: Period
    }
  | undefined => {
  if (timeString === '') {
    return
  }
  const [hour, minute] = timeString.split(':').map(Number)
  const period = hour < 12 ? 'AM' : 'PM'
  // 12時間制に変換
  const hour12 = hour % 12 || 12 // 0時または12時の場合は12に変換
  const returnHour = hour12.toString().padStart(2, '0')
  const returnMinute = minute.toString().padStart(2, '0')

  return { hour: returnHour, minute: returnMinute, period }
}

/**
 * ISO-8601形式の時間文字列を表示用の時間文字列に変換する
 */
const parseTimeToDisplayTime = (timeString: string): string => {
  const parsed = parseTime(timeString)
  if (typeof parsed === 'undefined') {
    return ''
  }

  const displayHour = parsed.hour.toString().padStart(2, '0')
  const displayMinute = parsed.minute.toString().padStart(2, '0')
  return `${displayHour}:${displayMinute} ${parsed.period}`
}

const validate = (hour: string, minute: string) => {
  const errors: string[] = []
  if (hour !== '' && (isNaN(parseInt(hour)) || parseInt(hour) > 24)) {
    errors.push('Hourは0~23で入力してください。')
  }

  if (minute !== '' && (isNaN(parseInt(minute)) || parseInt(minute) > 59)) {
    errors.push('Minuteは0~59で入力してください。')
  }

  if (errors.length === 0) {
    if ((hour === '' && minute !== '') || (hour !== '' && minute === '')) {
      errors.push('HourとMinuteは両方入力してください。')
    }
  }

  return errors
}

export const TimeField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      name,
      label,
      defaultValue,
      value: parentValue,
      onChange,
      variant = 'outlined',
      ...props
    },
    forwardedRef
  ) => {
    // 制御と非制御どっちでも使えるようにするため
    const isControlled =
      typeof parentValue !== 'undefined' && typeof onChange !== 'undefined'
    const inputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(
      forwardedRef,
      () => inputRef.current as HTMLInputElement
    )
    const [hour, setHour] = useState('')
    const [minute, setMinute] = useState('')
    const [period, setPeriod] = useState<Period>('AM')
    const { ref: dialogRef, showModal, closeModal } = useDialogState()
    const [errors, setErrors] = useState<string[]>([])

    const [localValue, setLocalValue] = useState<string>(
      typeof defaultValue === 'string' ? defaultValue : ''
    )
    const value = isControlled ? String(parentValue) : localValue

    const changeValue = useCallback(
      (value: string) => {
        if (isControlled) {
          const newEvent = {
            ...new Event('change', { bubbles: true }),
            target: inputRef.current,
            currentTarget: inputRef.current
          } as unknown as React.ChangeEvent<HTMLInputElement>
          newEvent.target.value = value
          onChange(newEvent)
        }
        if (inputRef.current) {
          inputRef.current.value = value
        }

        setLocalValue(value)
      },
      [isControlled, onChange]
    )

    useEffect(() => {
      if (typeof parentValue === 'string') {
        changeValue(parentValue)
      }
    }, [parentValue, changeValue])

    const handleHourChange = (hour: string) => {
      if (hour === '' || !isNaN(parseInt(hour))) {
        setHour(hour)
        setErrors([])
      }
    }

    const handleMinuteChange = (minute: string) => {
      if (minute === '' || !isNaN(parseInt(minute))) {
        setMinute(minute)
        setErrors([])
      }
    }

    const handlePeriodChange = (period: Period) => {
      setPeriod(period)
      setErrors([])
    }
    const handleTextFieldClick = () => {
      // 開くタイミングで再初期化
      const parsed = parseTime(value)
      if (typeof parsed === 'undefined') {
        setHour('')
        setMinute('')
        setPeriod('AM')
      } else {
        setHour(parsed.hour.toString())
        setMinute(parsed.minute.toString())
        setPeriod(parsed.period)
      }
      showModal()
    }

    const handleAcceptClick = () => {
      const errors = validate(hour, minute)
      if (errors.length > 0) {
        setErrors(errors)
        return
      }
      const timeString = calculateTimeString(hour, minute, period)
      changeValue(timeString)
      closeModal()
    }
    const handleCancelClick = () => {
      closeModal()
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
      event
    ) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        handleTextFieldClick()
      }
    }

    return (
      <div>
        {/* 扱う値はISO-8601対応の24時間表記 */}
        <input ref={inputRef} type="hidden" name={name} />
        {/* 表示は hh:mm Period 表記*/}
        <TextField
          value={parseTimeToDisplayTime(localValue)}
          icon="Clock"
          label={label}
          onClick={handleTextFieldClick}
          onKeyDown={handleKeyDown}
          readOnly
          variant={variant}
          {...props}
        />
        <dialog ref={dialogRef} className="rounded-[28px] backdrop:bg-black/60">
          <TimePicker
            hour={hour}
            minute={minute}
            period={period}
            onHourChange={handleHourChange}
            onMinuteChange={handleMinuteChange}
            onPeriodChange={handlePeriodChange}
            onAcceptClick={handleAcceptClick}
            onCancelClick={handleCancelClick}
            errors={errors}
          />
        </dialog>
      </div>
    )
  }
)
