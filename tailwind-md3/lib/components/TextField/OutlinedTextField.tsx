import { TextFieldProps } from './type'
import { Icon, IconType } from '../Icon'
import { forwardRef } from 'react'
import { getBackgroundStyle } from '../BackgroundColor'

export const OutlinedTextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id,
      label,
      icon,
      error,
      supportingText,
      className,
      bg = 'surface',
      ...props
    },
    ref
  ) => {
    const labelStyles = getLabelStyles(icon, error)
    const inputStyles = getInputStyles(icon, error, false)
    const iconStyle = getIconStyle(error)
    const supportingTextStyles = getSupportingTextStyles(error)
    const inputWrapper = getInputWrapperStyles()
    const bgStyle = getBackgroundStyle(bg)
    return (
      <div className={`relative ${className}`}>
        <div className={inputWrapper}>
          <input
            ref={ref}
            id={id}
            className={`${inputStyles} ${bgStyle}`}
            placeholder=""
            {...props}
          />
          {label && (
            <label htmlFor={id} className={`${labelStyles} ${bgStyle}`}>
              {label}
            </label>
          )}
          {icon && <Icon variant="outline" type={icon} className={iconStyle} />}
        </div>
        <p className={supportingTextStyles}>
          {supportingText && supportingText} {error && error}
        </p>
      </div>
    )
  }
)

const getLabelStyles = (icon?: IconType, error?: string) => {
  let styles = [
    // 共通
    'absolute',
    'cursor-pointer',
    'pointer-events-none',
    // 入力値無し
    'peer-placeholder-shown:top-3.5',
    'peer-placeholder-shown:text-lg',
    'peer-placeholder-shown:px-0',
    // 入力値あり
    '-top-2',
    'text-xs',
    'px-1',
    // フォーカス
    'peer-focus:-top-2',
    'peer-focus:left-4',
    'peer-focus:text-xs',
    'peer-focus:px-1'
  ]
  if (icon) {
    styles = [
      ...styles,
      // 入力値無し
      'peer-placeholder-shown:left-13',
      // 入力値あり
      'left-4'
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
      // ホバー
      'peer-hover:text-on-surface',
      // フォーカス
      'peer-focus:text-primary'
    ]
  }
  return styles.join(' ')
}

const getIconStyle = (error?: string) => {
  let styles = [
    'absolute',
    'left-4',
    'top-4',
    'w-6',
    'h-6',
    'z-[1]',
    'pointer-events-none'
  ]
  if (error) {
    styles = [...styles, 'text-error']
  } else {
    styles = [
      ...styles,
      'text-on-surface-variant',
      'peer-hover:text-on-surface',
      'peer-focus:text-on-surface-variant',
      'peer-focus:peer-hover:text-on-surface'
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
    'h-[56px]',
    'w-full',
    'block',
    'pr-4',
    'pt-2',
    'pb-2',
    'rounded',
    'bg-inherit',
    'outline-none',
    'placeholder-transparent',
    'shadow-[0_0_0_1px_black]',
    'focus:shadow-[0_0_0_2px_black]',
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
      'shadow-outline',
      'hover:shadow-on-surface',
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
  return 'relative mt-1'
}
