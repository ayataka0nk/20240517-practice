import { ListItem } from '../List'

type Props = {
  className?: string
  value: string
  onClick: (value: string) => void
}
export const HistoryItem = ({ className, value, onClick }: Props) => {
  const handleClick = () => {
    onClick(value)
  }
  return (
    <ListItem
      className={className}
      headline={value}
      icon="Clock"
      component="button"
      type="button"
      onClick={handleClick}
    />
  )
}
