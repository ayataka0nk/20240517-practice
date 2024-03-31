import {
  ComponentProps,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import {
  HistoryItem,
  InputValueItem,
  SearchField as BaseSearchField
} from '../../components/SearchV2'
import { BackgroundColorToken } from '../../main'
import { Breakpoint } from '../../type'
import { useOutsideClick } from '../../hooks/useOutsideClick'

type Props = {
  searchedValue: string
  docked: Breakpoint
  bg?: BackgroundColorToken
  onMenuClick: () => void
  history: string[]
  addHistory: (value: string) => void
} & ComponentProps<'input'>

export const SearchFieldDefault = forwardRef<HTMLInputElement, Props>(
  (
    {
      searchedValue,
      docked,
      bg,
      onMenuClick,
      history,
      addHistory,
      onFocus,
      onChange,
      ...props
    },
    forwardedRef
  ) => {
    //ref
    const ref = useRef<HTMLInputElement>(null)
    useImperativeHandle(forwardedRef, () => ref.current as HTMLInputElement)
    const [wrapperRef] = useOutsideClick<HTMLDivElement>({
      onOutsideClick: () => {
        if (ref.current) {
          ref.current.value = searchedValue
        }
        setIsViewOpen(false)
        setValue(searchedValue)
      }
    })

    const buttonRef = useRef<HTMLButtonElement>(null)

    const [isViewOpen, setIsViewOpen] = useState(false)

    const [value, setValue] = useState(searchedValue)

    useEffect(() => {
      setValue(searchedValue)
    }, [searchedValue])

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
      setIsViewOpen(true)
      onFocus && onFocus(e)
    }
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      setValue(e.target.value)
      onChange && onChange(e)
    }

    const handleClearClick = () => {
      setValue('')
      ref.current?.focus()
    }

    const handleInputValueItemClick = (value: string) => {
      setValue(value)
      if (ref.current) {
        ref.current.value = value
      }
      setIsViewOpen(false)
      addHistory(value)
      buttonRef.current?.click()
    }
    const handleBackClick = () => {
      if (ref.current) {
        ref.current.value = ''
        buttonRef.current?.click()
      }
    }

    return (
      <div ref={wrapperRef}>
        <BaseSearchField
          ref={ref}
          value={value}
          onChange={handleChange}
          searchedValue={searchedValue}
          isViewOpen={isViewOpen}
          docked={docked}
          bg={bg}
          onMenuClick={onMenuClick}
          onFocus={handleFocus}
          onClearClick={handleClearClick}
          onBackClick={handleBackClick}
          {...props}
        >
          <InputValueItem value={value} onClick={handleInputValueItemClick} />
          {history.map((item, index) => (
            <HistoryItem
              key={index}
              value={item}
              onClick={handleInputValueItemClick}
            />
          ))}
        </BaseSearchField>
        <button ref={buttonRef} className="hidden" type="submit"></button>
      </div>
    )
  }
)
