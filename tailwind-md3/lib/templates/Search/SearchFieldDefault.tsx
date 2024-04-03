import React from 'react'
import {
  HistoryItem,
  InputValueItem,
  SearchField as BaseSearchField
} from '../../components/SearchV2'
import { BackgroundColorToken } from '../../main'
import { Breakpoint } from '../../type'

type Props = {
  wrapperRef: React.RefObject<HTMLDivElement>
  inputRef: React.RefObject<HTMLInputElement>
  buttonRef: React.RefObject<HTMLButtonElement>
  searchedValue: string
  value: string
  docked: Breakpoint
  isViewOpen: boolean
  history: string[]
  onMenuClick: () => void
  onClearClick: () => void
  onBackClick: () => void
  onInputValueItemClick: (value: string) => void
  onHistoryItemClick: (value: string) => void
  onFocus: React.FocusEventHandler<HTMLInputElement>
  onChange: React.ChangeEventHandler<HTMLInputElement>
  bg?: BackgroundColorToken
} & React.ComponentPropsWithoutRef<'input'>

export const SearchFieldDefault = ({
  wrapperRef,
  inputRef,
  buttonRef,
  searchedValue,
  value,
  docked,
  bg,
  isViewOpen,
  history,
  onMenuClick,
  onClearClick,
  onBackClick,
  onInputValueItemClick,
  onHistoryItemClick,
  onFocus,
  onChange,
  ...props
}: Props) => {
  return (
    <div ref={wrapperRef}>
      <BaseSearchField
        ref={inputRef}
        value={value}
        onChange={onChange}
        searchedValue={searchedValue}
        isViewOpen={isViewOpen}
        docked={docked}
        bg={bg}
        onMenuClick={onMenuClick}
        onFocus={onFocus}
        onClearClick={onClearClick}
        onBackClick={onBackClick}
        {...props}
      >
        <InputValueItem value={value} onClick={onInputValueItemClick} />
        {history.map((item, index) => (
          <HistoryItem key={index} value={item} onClick={onHistoryItemClick} />
        ))}
      </BaseSearchField>
      <button ref={buttonRef} className="hidden" type="submit"></button>
    </div>
  )
}
