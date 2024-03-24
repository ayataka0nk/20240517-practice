const getBaseStyles = () => {
  return [
    // 共通
    'relative',
    'overflow-hidden',
    'block',
    'text-on-surface',
    'rounded-xl',
    'p-4'
  ]
}

const getActionStyles = (href?: string) => {
  if (href) {
    return [
      // クリックアクションがあるとき
      'cursor-pointer',
      // ホバー
      'hover:after:absolute',
      'hover:after:inset-0',
      'hover:after:w-full',
      'hover:after:h-full',
      'hover:after:bg-on-surface',
      'hover:after:bg-opacity-8',
      'hover:drop-shadow-md',
      // フォーカス
      'focus:outline-none',
      'focus:after:absolute',
      'focus:after:inset-0',
      'focus:after:w-full',
      'focus:after:h-full',
      'focus:after:bg-opacity-10',
      'focus:after:bg-on-surface'
    ]
  }
  return []
}

export const getCardStyle = (href?: string) => {
  const baseStyles = getBaseStyles()
  const actionStyles = getActionStyles(href)
  return [...baseStyles, ...actionStyles].join(' ')
}
