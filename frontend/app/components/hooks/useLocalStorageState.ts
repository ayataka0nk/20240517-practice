import { useEffect, useState } from 'react'

export const useLocalStorageState = <T>(key: string, defaultState: T) => {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return defaultState
    }
    const storedValue = localStorage.getItem(key)
    if (storedValue !== null) {
      return JSON.parse(storedValue)
    }
    return defaultState
  })

  // コンポーネントのマウント後にローカルストレージからの読み込みを試みる
  useEffect(() => {
    const storedValue = localStorage.getItem(key)
    if (storedValue !== null) {
      setState(JSON.parse(storedValue))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ステートまたはキーが変更された時にローカルストレージを更新
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return [state, setState] as const
}
