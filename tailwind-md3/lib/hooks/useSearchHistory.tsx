import { useLocalStorageState } from './useLocalStorageState'

export const useSearchHistory = ({ historyKey }: { historyKey: string }) => {
  const [history, setHistory] = useLocalStorageState<string[]>(historyKey, [])
  const addHistory = (value: string) => {
    setHistory((prev) => {
      if (value === '') {
        return prev
      }

      const newHistory = prev.filter((item) => item !== value).slice(0, 4)
      return [value, ...newHistory]
    })
  }
  return { history, addHistory }
}
