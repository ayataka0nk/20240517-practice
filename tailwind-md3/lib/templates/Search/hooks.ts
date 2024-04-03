import { useEffect, useRef, useState } from 'react'
import { useOutsideClick, useSearchHistory } from '../../main'

type Props = {
  historyKey: string
  searchedValue: string
}
export const useSearchFieldDefaultState = ({
  historyKey,
  searchedValue
}: Props) => {
  const ref = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [value, setValue] = useState(searchedValue)
  const [wrapperRef] = useOutsideClick<HTMLDivElement>({
    onOutsideClick: () => {
      if (ref.current) {
        ref.current.value = searchedValue
      }
      setIsViewOpen(false)
      setValue(searchedValue)
    }
  })
  const { history, addHistory } = useSearchHistory({ historyKey })
  useEffect(() => {
    setValue(searchedValue)
  }, [searchedValue])

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = () => {
    setIsViewOpen(true)
  }
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
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
  return {
    wrapperRef,
    inputRef: ref,
    buttonRef,
    searchedValue,
    value,
    isViewOpen,
    history,
    handleClearClick,
    handleBackClick,
    handleInputValueItemClick,
    handleHistoryItemClick: handleInputValueItemClick,
    handleFocus: handleFocus,
    handleChange: handleChange,
    setIsViewOpen
  }
}
