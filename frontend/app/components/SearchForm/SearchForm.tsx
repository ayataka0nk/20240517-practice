import {
  BackgroundColorToken,
  HistoryItem,
  InputValueItem,
  SearchField
} from '@ayataka/tailwind-md3'
import { FormEventHandler, useRef, useState } from 'react'
import { Breakpoint, useBreakpoint } from '~/hooks/useBreakpoint'
import { useLocalStorageState } from '~/hooks/useLocalStorageState'
import { useOutsideClick } from '~/hooks/useOutsideClick'

type Props = {
  className?: string
  name?: string
  placeholder?: string
  searchedValue?: string
  value: string
  onChange: (value: string) => void
  onSearchRequest: (value: string) => void
  historyKey: string
  onMenuIconClick: () => void
  bg?: BackgroundColorToken
}

const getIsSearchedOrFocused = ({
  isViewOpen,
  value,
  searchedValue
}: {
  isViewOpen: boolean
  value: string
  searchedValue?: string
}) => {
  return (
    value !== '' ||
    (typeof searchedValue !== 'undefined' && searchedValue !== '') ||
    isViewOpen
  )
}

const getLeadingIcon = (
  breakpoint: Breakpoint,
  isSearchedOrFocused: boolean
) => {
  if (breakpoint === 'sm') {
    return isSearchedOrFocused ? 'ArrowLeft' : 'Bars3'
  } else {
    return isSearchedOrFocused ? 'ArrowLeft' : 'MagnifyingGlass'
  }
}

export const SearchForm = ({
  className,
  name,
  placeholder,
  searchedValue,
  value,
  onChange,
  onSearchRequest,
  historyKey,
  onMenuIconClick,
  bg
}: Props) => {
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [history, setHistory] = useLocalStorageState<string[]>(historyKey, [])
  const inputRef = useRef<HTMLInputElement>(null)
  const [ref] = useOutsideClick<HTMLFormElement>({
    onOutsideClick: () => {
      setIsViewOpen(false)
      onChange(searchedValue || '')
    }
  })
  const breakpoint = useBreakpoint()
  const isSearchedOrFocused = getIsSearchedOrFocused({
    value,
    searchedValue,
    isViewOpen
  })
  const leadingIcon = getLeadingIcon(breakpoint, isSearchedOrFocused)
  const trailingIcon = value !== '' ? 'XMark' : undefined

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
    setIsViewOpen(true)
  }

  const handleTrailingXMarkClick = () => {
    onChange('')
    setIsViewOpen(true)
    inputRef.current?.focus()
  }

  const back = () => {
    onChange('')
    setIsViewOpen(false)
    onSearchRequest('')
  }

  const handleFocus = () => {
    setIsViewOpen(true)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    executeSearch(value)
  }

  const executeSearch = (value: string) => {
    onChange(value)
    setIsViewOpen(false)
    setHistory((prev) => {
      if (value === '') {
        return prev
      }
      // 最新の3件
      const newHistory = prev.filter((item) => item !== value).slice(0, 2)
      return [value, ...newHistory]
    })
    onSearchRequest(value)
  }
  const handleClick = () => {
    setIsViewOpen(true)
  }

  const handleLeadingIconClick = () => {
    if (leadingIcon === 'ArrowLeft') {
      back()
    } else if (leadingIcon === 'Bars3') {
      onMenuIconClick()
    }
  }
  const variant = breakpoint === 'sm' ? 'screen' : 'docked'

  return (
    <form ref={ref} className={`${className}`} onSubmit={handleSubmit}>
      <SearchField
        variant={variant}
        ref={inputRef}
        isViewOpen={isViewOpen}
        leadingIcon={leadingIcon}
        onLeadingIconClick={handleLeadingIconClick}
        trailingIcon={trailingIcon}
        onTrailingIconClick={handleTrailingXMarkClick}
        name={name}
        placeholder={placeholder}
        onClick={handleClick}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        bg={bg}
      >
        <InputValueItem value={value} onClick={executeSearch} />
        {history.map((item, index) => (
          <HistoryItem key={index} value={item} onClick={executeSearch} />
        ))}
      </SearchField>
    </form>
  )
}
