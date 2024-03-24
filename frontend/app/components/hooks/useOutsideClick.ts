import { useEffect, useRef } from 'react'

export const useOutsideClick = <T extends HTMLElement>({
  onOutsideClick
}: {
  onOutsideClick?: () => void
}) => {
  const ref = useRef<T>(null)
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current === null) {
        return
      }
      const current = ref.current
      if (
        !(current instanceof HTMLElement) ||
        !(event.target instanceof Node)
      ) {
        return
      }

      if (!current.contains(event.target)) {
        // 外側がクリックされた時
        onOutsideClick && onOutsideClick()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onOutsideClick])
  return [ref]
}
