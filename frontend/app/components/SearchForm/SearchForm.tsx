import {
  BackgroundColorToken,
  SearchFieldDefault,
  useSearchHistory
} from '@ayataka/tailwind-md3'
import { Form, useSubmit } from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'
import { useLocalStorageState } from '~/hooks/useLocalStorageState'
import { useOutsideClick } from '~/hooks/useOutsideClick'

type Props = {
  className?: string
  name?: string
  placeholder?: string
  searchedValue?: string
  value: string
  onChange: (value: string) => void
  historyKey: string
  onMenuIconClick: () => void
  onInputValueItemClick: (value: string) => void
  onHistoryItemClick: (value: string) => void
  bg?: BackgroundColorToken
}

export const SearchForm = ({
  className,
  name,
  placeholder,
  searchedValue,
  value,
  onChange,
  historyKey,
  onMenuIconClick,
  bg
}: Props) => {
  const [isViewOpen, setIsViewOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const submit = useSubmit()

  // useEffect(() => {
  //   const handleFormData = (event: FormDataEvent) => {
  //     const formData = event.formData
  //     console.log(formData)
  //     const keyword = formData.get('keyword') as string
  //     console.log(keyword)
  //     onChange(keyword)
  //     setIsViewOpen(false)
  //   }
  //   ref.current?.addEventListener('formdata', handleFormData)
  //   return () => {
  //     ref.current?.removeEventListener('formdata', handleFormData)
  //   }
  // }, [])

  const handleMenuClick = () => {
    onMenuIconClick()
  }
  const { history, addHistory } = useSearchHistory({ historyKey: 'clients' })

  return (
    <Form className={`${className}`}>
      <SearchFieldDefault
        name="keyword"
        placeholder="search clients"
        searchedValue={searchedValue || ''}
        docked="md"
        bg="surface-container-lowest"
        onMenuClick={handleMenuClick}
        history={history}
        addHistory={addHistory}
      ></SearchFieldDefault>
    </Form>
  )
}
