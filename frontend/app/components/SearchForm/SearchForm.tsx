import {
  SearchFieldDefault,
  useSearchFieldDefaultState
} from '@ayataka/tailwind-md3'
import { Form, useLocation } from '@remix-run/react'
import { useEffect, useRef } from 'react'

type Props = {
  className?: string
  name: string
  placeholder: string
  searchedValue: string
  historyKey: string
  onMenuClick: () => void
}

export const SearchForm = ({
  className,
  name,
  placeholder,
  searchedValue,
  historyKey,
  onMenuClick
}: Props) => {
  const { setIsViewOpen, ...state } = useSearchFieldDefaultState({
    historyKey: historyKey,
    searchedValue: searchedValue
  })
  const ref = useRef<HTMLFormElement>(null)
  useEffect(() => {
    const current = ref.current
    if (current === null) {
      return
    }

    const handleSubmit = (event: Event) => {
      setIsViewOpen(false)
    }
    current.addEventListener('submit', handleSubmit)
    return () => {
      current.removeEventListener('submit', handleSubmit)
    }
  }, [])
  const location = useLocation()
  return (
    <Form ref={ref} className={`${className}`} method="post">
      <input type="hidden" name="pathname" value={location.pathname} />
      <SearchFieldDefault
        name={name}
        placeholder={placeholder}
        bg="surface-container-lowest"
        docked="md"
        wrapperRef={state.wrapperRef}
        inputRef={state.inputRef}
        buttonRef={state.buttonRef}
        searchedValue={state.searchedValue}
        value={state.value}
        isViewOpen={state.isViewOpen}
        history={state.history}
        onMenuClick={onMenuClick}
        onClearClick={state.handleClearClick}
        onBackClick={state.handleBackClick}
        onInputValueItemClick={state.handleInputValueItemClick}
        onHistoryItemClick={state.handleHistoryItemClick}
        onFocus={state.handleFocus}
        onChange={state.handleChange}
      ></SearchFieldDefault>
    </Form>
  )
}
