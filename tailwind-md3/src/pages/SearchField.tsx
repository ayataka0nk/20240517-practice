import { useRef } from 'react'
import { SearchFieldDefault } from '../../lib/templates/Search/SearchFieldDefault'
import { useSearchFieldDefaultState } from '../../lib/templates/Search/hooks'

export const SearchFieldPage = () => {
  const handleMenuClick = () => {
    console.log('menu clicked')
  }

  const ref = useRef<HTMLFormElement>(null)
  const {
    wrapperRef,
    inputRef,
    buttonRef,
    searchedValue,
    value,
    isViewOpen,
    history,
    handleClearClick,
    handleBackClick,
    handleInputValueItemClick,
    handleHistoryItemClick,
    handleFocus,
    handleChange
  } = useSearchFieldDefaultState({
    historyKey: 'sample',
    searchedValue: 'searched value'
  })
  // const { history, addHistory } = useSearchHistory({ historyKey: 'sample' })

  // useEffect(() => {
  //   const formdata = (e: FormDataEvent) => {
  //     console.log('formdata')
  //     const keyword = e.formData.get('keyword') as string
  //     console.log(keyword)
  //     addHistory(keyword)
  //   }
  //   const current = ref.current
  //   current?.addEventListener('formdata', formdata)
  //   return () => {
  //     current?.removeEventListener('formdata', formdata)
  //   }
  // }, [addHistory])

  return (
    <div>
      <form ref={ref}>
        <SearchFieldDefault
          name="keyword"
          placeholder="hoge"
          bg="surface-container-highest"
          wrapperRef={wrapperRef}
          inputRef={inputRef}
          buttonRef={buttonRef}
          searchedValue={searchedValue}
          value={value}
          docked="md"
          isViewOpen={isViewOpen}
          history={history}
          onMenuClick={handleMenuClick}
          onClearClick={handleClearClick}
          onBackClick={handleBackClick}
          onInputValueItemClick={handleInputValueItemClick}
          onHistoryItemClick={handleHistoryItemClick}
          onFocus={handleFocus}
          onChange={handleChange}
        />
      </form>
    </div>
  )
}
