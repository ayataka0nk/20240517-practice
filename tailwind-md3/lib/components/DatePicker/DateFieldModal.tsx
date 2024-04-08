import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { useDialogState } from '../../hooks/useDIalogState'
import { TextField } from '../TextField'
import { TextFieldProps } from '../TextField/type'
import { ModalDateInput } from './ModalDateInput'

/**
 *
 * @param date yyyy/mm/dd
 * @returns yyyy-mm-dd
 */
const parseISO8601String = (date: string) => {
  if (date === '') {
    return ''
  }
  const [year, month, day] = date.split('/').map(Number)
  const padYear = year.toString().padStart(4, '0')
  const padMonth = month.toString().padStart(2, '0')
  const padDay = day.toString().padStart(2, '0')
  return `${padYear}-${padMonth}-${padDay}`
}

/**
 *
 * @param valueISO8601 yyyy-mm-dd
 * @returns yyyy/mm/dd
 */
const parseDisplayValue = (valueISO8601: string) => {
  if (valueISO8601 === '') {
    return ''
  }
  const [year, month, day] = valueISO8601.split('-').map(Number)
  const padYear = year.toString().padStart(4, '0')
  const padMonth = month.toString().padStart(2, '0')
  const padDay = day.toString().padStart(2, '0')
  return `${padYear}/${padMonth}/${padDay}`
}

const isValidFormat = (value: string) => {
  const regex = /^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/
  return regex.test(value)
}

const isValidDate = (value: string) => {
  const [year, month, day] = value.split('/').map(Number)
  const date = new Date(year, month - 1, day)
  /**
   * JavaScriptのDateオブジェクトは、不正な日付が与えられた場合、自動的に日付を正しい範囲に修正します。
   * したがって、作成したDateオブジェクトから取り出した年月日が元の入力値と一致するかどうかをチェックすることで、
   * 入力された日付が実在するかどうかを確認できます。
   */
  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  )
}

const validate = (value: string): string[] => {
  const errors: string[] = []
  if (value === '') {
    return []
  }

  if (!isValidFormat(value)) {
    errors.push('日付はyyyy/mm/dd形式で入力してください。')
    return errors
  }

  if (!isValidDate(value)) {
    errors.push('存在する日付を入力してください。')
  }

  return errors
}

type Props = TextFieldProps

export const DateFieldModal = forwardRef<HTMLInputElement, Props>(
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
    const isControlled =
      typeof parentValue !== 'undefined' && typeof onChange !== 'undefined'
    const inputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(
      forwardedRef,
      () => inputRef.current as HTMLInputElement
    )
    const modalInputRef = useRef<HTMLInputElement>(null)
    const { ref: dialogRef, showModal, closeModal } = useDialogState()
    const [errors, setErrors] = useState<string[]>([])
    // yyyy-mm-dd
    const [localValue, setLocalValue] = useState<string>(
      typeof defaultValue === 'string' ? defaultValue : ''
    )
    // yyyy/mm/dd
    const [date, setDate] = useState('')
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

    const handleTextFieldClick = () => {
      // モーダルが開くタイミングでモーダルの表示を初期化
      setDate(parseDisplayValue(value))
      showModal()
      modalInputRef.current?.focus()
    }

    const handleAcceptClick = () => {
      //TODO validate
      const errors = validate(date)
      if (errors.length > 0) {
        setErrors(errors)
        return
      }
      changeValue(parseISO8601String(date))
      closeModal()
    }

    const handleCancelClick = () => {
      closeModal()
    }

    const handleDateChange = (date: string) => {
      setDate(date)
      setErrors([])
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
        <input ref={inputRef} type="hidden" name={name} />
        <TextField
          value={parseDisplayValue(localValue)}
          icon="Calendar"
          variant={variant}
          label={label}
          readOnly
          onClick={handleTextFieldClick}
          onKeyDown={handleKeyDown}
          {...props}
        />
        <dialog ref={dialogRef} className="rounded-[28px] backdrop:bg-black/60">
          <ModalDateInput
            ref={modalInputRef}
            date={date}
            onDateChange={handleDateChange}
            onCancelClick={handleCancelClick}
            onAcceptClick={handleAcceptClick}
            errors={errors}
          />
        </dialog>
      </div>
    )
  }
)
