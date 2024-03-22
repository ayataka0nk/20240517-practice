import { ListItem } from '../List'

type Props = {
  className?: string
  value: string
  onClick: (value: string) => void
}
export const InputValueItem = ({ className, value, onClick }: Props) => {
  const handleClick = () => {
    onClick(value)
  }
  if (typeof value === 'undefined' || value === '') {
    return <ListItem className={className} headline={`キーワードを入力`} />
  } else {
    return (
      <ListItem
        className={className}
        component="button"
        icon="MagnifyingGlass"
        headline={value}
        onClick={handleClick}
        type="button"
      />
    )
  }
}
