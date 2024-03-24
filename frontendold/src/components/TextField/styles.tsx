import { IconType } from '../Icon'

export const getLabelStyles = (icon?: IconType, error?: string) => {
  const labelStyles = [
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
    // 入力値無し
    labelStyles.push('peer-placeholder-shown:left-13')
    // 入力値あり
    labelStyles.push('left-13')
  } else {
    // 入力値無し
    labelStyles.push('peer-placeholder-shown:left-4')
    // 入力値あり
    labelStyles.push('left-4')
  }

  if (error) {
    // 入力値無し
    labelStyles.push('peer-placeholder-shown:text-error')
    // 入力値あり
    labelStyles.push('text-error')
    // フォーカス
    labelStyles.push('peer-focus:text-error')
  } else {
    // 入力値無し
    labelStyles.push('peer-placeholder-shown:text-on-surface-variant')
    // 入力値あり
    labelStyles.push('text-on-surface-variant')
    // フォーカス
    labelStyles.push('peer-focus:text-primary')
  }
  return labelStyles.join(' ')
}

export const getInputStyles = (
  icon?: IconType,
  error?: string,
  multiline?: boolean
) => {
  const styles = [
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
    // エラーあり
    styles.push('shadow-error')
    styles.push('focus:shadow-error')
  } else {
    // エラーなし
    styles.push('shadow-primary')
    styles.push('focus:shadow-primary')
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

export const getSupportingTextStyles = (error?: string) => {
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

export const getInputWrapperStyles = () => {
  return 'hover:after:full-width relative hover:after:pointer-events-none hover:after:absolute hover:after:inset-0 hover:after:bg-on-surface hover:after:opacity-8'
}
