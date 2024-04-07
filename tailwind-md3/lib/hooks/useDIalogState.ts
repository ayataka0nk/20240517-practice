import { useCallback, useEffect, useRef } from 'react'

export const useDialogState = () => {
  const ref = useRef<HTMLDialogElement>(null)
  const showModal = useCallback(() => {
    if (ref.current) {
      ref.current.showModal()
    }
  }, [ref])

  const closeModal = useCallback(() => {
    if (ref.current) {
      ref.current.close()
    }
  }, [ref])
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current === null || event.target === null) {
        return
      }
      const target = event.target as HTMLElement

      const rect = target.getBoundingClientRect()
      if (
        rect.left > event.clientX ||
        rect.right < event.clientX ||
        rect.top > event.clientY ||
        rect.bottom < event.clientY
      ) {
        const target = event.currentTarget as HTMLDialogElement
        target.close()
      }
    }
    const current = ref.current
    current?.addEventListener('mousedown', handleClickOutside)
    return () => {
      current?.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return { ref, showModal, closeModal }
}
