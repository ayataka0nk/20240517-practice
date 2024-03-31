import { useEffect, useRef } from 'react'
import { SearchFieldDefault } from '../../lib/templates/Search/SearchFieldDefault'
import { useSearchHistory } from '../../lib/hooks'

export const SearchFieldPage = () => {
  const handleMenuClick = () => {
    console.log('menu clicked')
  }

  const ref = useRef<HTMLFormElement>(null)
  const { history, addHistory } = useSearchHistory({ historyKey: 'sample' })

  useEffect(() => {
    const formdata = (e: FormDataEvent) => {
      console.log('formdata')
      const keyword = e.formData.get('keyword') as string
      console.log(keyword)
      addHistory(keyword)
    }
    const current = ref.current
    current?.addEventListener('formdata', formdata)
    return () => {
      current?.removeEventListener('formdata', formdata)
    }
  }, [addHistory])

  return (
    <div>
      <form ref={ref}>
        <SearchFieldDefault
          name="keyword"
          searchedValue="searched value"
          docked="md"
          placeholder="hoge"
          history={history}
          addHistory={addHistory}
          bg="surface-container-highest"
          onMenuClick={handleMenuClick}
        />
      </form>
    </div>
  )
}
