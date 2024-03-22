export type BackgroundColorToken =
  | 'surface'
  | 'surface-container-lowest'
  | 'surface-container-low'
  | 'surface-container'
  | 'surface-container-high'
  | 'surface-container-highest'

export const getBackgroundStyle = (background: BackgroundColorToken) => {
  if (background === 'surface') {
    return 'bg-surface'
  } else if (background === 'surface-container-lowest') {
    return 'bg-surface-container-lowest'
  } else if (background === 'surface-container-low') {
    return 'bg-surface-container-low'
  } else if (background === 'surface-container') {
    return 'bg-surface-container'
  } else if (background === 'surface-container-high') {
    return 'bg-surface-container-high'
  } else if (background === 'surface-container-highest') {
    return 'bg-surface-container-highest'
  } else {
    throw new Error(`Unknown background: ${background}`)
  }
}
