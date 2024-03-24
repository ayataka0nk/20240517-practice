'use client'

import { SearchForm } from '@/templates/SearchForm'

import { useState } from 'react'
import { useNavigationContext } from '@/templates/Navigation/NavigationContext'

type Props = {
  defaultValue: string
  className?: string
}
export const ClientSearchForm = ({ defaultValue, className }: Props) => {
  const [value, setValue] = useState(defaultValue)
  //   const pathname = usePathname()
  const { setIsDrawerModalOpen } = useNavigationContext()
  const handleChange = (value: string) => {
    setValue(value)
  }
  const handleSearchRequest = (value: string) => {
    // search({ text: value, currentPath: pathname })
  }
  const handleMenuIconClick = () => {
    setIsDrawerModalOpen(true)
  }

  return (
    <SearchForm
      bg="surface-container-lowest"
      className={className}
      onMenuIconClick={handleMenuIconClick}
      placeholder="search text"
      name="text"
      searchedValue={defaultValue}
      value={value}
      onChange={handleChange}
      onSearchRequest={handleSearchRequest}
      historyKey="clients"
    ></SearchForm>
  )
}
