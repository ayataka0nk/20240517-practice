import { FormEventHandler, useCallback } from 'react'

import { TextAreaProps } from './type'
import { IconType } from '../Icon'

export const FilledTextArea = ({
  id,
  label,
  icon,
  error,
  supportingText,
  className,
  ...props
}: TextAreaProps) => {
  const labelStyles = getLabelStyles(icon, error)
  const inputStyles = getInputStyles(icon, error, true)
  const supportingTextStyles = getSupportingTextStyles(error)
  const inputWrapper = getInputWrapperStyles()
  const autoresize: FormEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      const textarea = event.target as HTMLTextAreaElement
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    },
    []
  )

  return (
    <div className={`relative ${className}`}>
      <div className={inputWrapper}>
        <textarea
          id={id}
          className={inputStyles}
          placeholder=""
          rows={1}
          onInput={autoresize}
          {...props}
        />
        {label && (
          <label htmlFor={id} className={labelStyles}>
            {label}
          </label>
        )}
      </div>
      <p className={supportingTextStyles}>
        {supportingText && supportingText} {error && error}
      </p>
    </div>
  )
}

const getLabelStyles = (icon?: IconType, error?: string) => {
  let styles = [
    // 共通
    'absolute',
    'cursor-pointer',
    'pointer-events-none',
    // 入力値無し
    'peer-placeholder-shown:top-3.5',
    'peer-placeholder-shown:text-lg',
    // 入力値あり
    'top-2',
    'text-xs',
    // フォーカス
    'peer-focus:top-2',
    'peer-focus:text-xs'
  ]
  if (icon) {
    styles = [
      ...styles,
      // 入力値無し
      'peer-placeholder-shown:left-13',
      // 入力値あり
      'left-13'
    ]
  } else {
    styles = [
      ...styles,
      // 入力値無し
      'peer-placeholder-shown:left-4',
      // 入力値あり
      'left-4'
    ]
  }

  if (error) {
    styles = [
      ...styles,
      // 入力値無し
      'peer-placeholder-shown:text-error',
      // 入力値あり
      'text-error',
      // フォーカス
      'peer-focus:text-error'
    ]
  } else {
    styles = [
      ...styles,
      // 入力値無し
      'peer-placeholder-shown:text-on-surface-variant',
      // 入力値あり
      'text-on-surface-variant',
      // フォーカス
      'peer-focus:text-primary'
    ]
  }
  return styles.join(' ')
}

const getInputStyles = (
  icon?: IconType,
  error?: string,
  multiline?: boolean
) => {
  let styles = [
    // 共通
    'peer',
    'w-full',
    'block',
    'pr-4',
    'pt-6',
    'pb-2',
    'rounded-t',
    'bg-surface-container-highest',
    'outline-none',
    'placeholder-transparent',
    'shadow-underline-thin',
    'focus:shadow-underline-thick',
    'line-height-0',
    'cursor-pointer'
  ]
  if (error) {
    styles = [
      ...styles,
      // エラーあり
      'shadow-error',
      'focus:shadow-error'
    ]
  } else {
    styles = [
      ...styles,
      // エラーなし
      'shadow-primary',
      'focus:shadow-primary'
    ]
  }

  if (icon) {
    styles.push('pl-13')
  } else {
    styles.push('pl-4')
  }
  if (multiline) {
    styles.push('resize-none')
  }
  return styles.join(' ')
}

const getSupportingTextStyles = (error?: string) => {
  const styles = [
    // 共通
    'text-xs',
    'mt-1',
    'leading-none',
    'pl-4',
    'h-4'
  ]

  if (error) {
    styles.push('text-error')
  } else {
    styles.push('text-on-surface-variant')
  }
  return styles.join(' ')
}

const getInputWrapperStyles = () => {
  return 'hover:after:full-width relative hover:after:pointer-events-none hover:after:absolute hover:after:inset-0 hover:after:bg-on-surface hover:after:opacity-8'
}
