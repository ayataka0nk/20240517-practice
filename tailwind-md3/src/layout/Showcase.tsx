type Props = {
  title: string
  children: React.ReactNode
  type?: 'inline' | 'block'
  className?: string
}
export const Showcase = ({
  title,
  children,
  type = 'inline',
  className
}: Props) => {
  const styles = getStyle(type)
  return (
    <div className={`${className} mb-4`}>
      <h2>{title}</h2>
      <div className={styles}>{children}</div>
    </div>
  )
}

const getStyle = (type: 'inline' | 'block') => {
  let styles: string[] = []
  if (type === 'inline') {
    styles = ['flex', 'gap-4']
  } else {
    styles = ['grid', 'gap-4']
  }
  return styles.join(' ')
}
